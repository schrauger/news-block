const {registerBlockType} = wp.blocks; //Blocks API
const {createElement, Component, Fragment} = wp.element; //React.createElement
const {InspectorControls} = wp.editor; //Block inspector wrapper
const {
    TextControl,
    SelectControl,
    Button,
    ServerSideRender,
    PanelBody,
    PanelRow,
    ToggleControl,
    URLInputButton
} = wp.components; //Block inspector wrapper
const {registerStore, withSelect,} = wp.data; // used to run json requests for wordpress data (blogs, taxonomies)
const {__} = wp.i18n;
const {apiFetch} = wp;

class News_block_component_internal extends Component {

    render() {
        return (
            <Fragment >
                <SelectControl
                    value={this.props.blog_id}
                    label={__('Select a site')}
                    options={this.props.sites}
                    onChange={this.props.updateSite}
                />

                {(this.props.blog_id) ?
                    <Fragment >
                        <SelectControl
                            value={this.props.post_type}
                            label={__('Select a post type')}
                            options={this.props.post_types}
                            onChange={this.props.updatePostType}
                        />
                        {(this.props.post_type) ?
                            <Fragment >
                                <SelectControl
                                    valuez={this.props.taxonomy}
                                    value={this.props.taxonomy}
                                    label={__('Select a taxonomy')}
                                    options={this.props.taxonomies}
                                    onChange={this.props.updateTaxonomy}
                                />
                                {(this.props.taxonomy) ?
                                    <Fragment >
                                        <ToggleControl
                                            label={(this.props.taxonomy_term_mode ? 'Term filter (blacklist)' : 'Term filter (whitelist)')}
                                            checked={this.props.taxonomy_term_mode}
                                            onChange={(value) => this.props.update_taxonomy_term_mode(value)}
                                            help={this.props.taxonomy_term_mode ? 'Exclude posts containing any of the specified terms' : 'Only include posts containing any of the specified terms'}
                                        />
                                        <SelectControl
                                            value={this.props.selected_term_list}
                                            label={(this.props.taxonomy_term_mode ? __('Select terms to exclude') : __('Select terms to include'))}
                                            options={this.props.terms}
                                            onChange={this.props.updateSelectedTerms}
                                            multiple={true}
                                        />
                                    </Fragment >
                                    :
                                    []
                                }
                            </Fragment >
                            :
                            []
                        }
                    </Fragment >
                    :
                    []

                }
            </Fragment >
        )
    }
}

class News_block_component_external extends Component {
    render() {
        return (
            <TextControl
                type={'string'}
                value={this.props.rss_url}
                label={'RSS Url'}
                onChange={this.props.updateRSSUrl}
            />
        )
    }
}


// note: React components must start with a Capital letter
class News_block_component extends Component {

    autoOpen = () => {
        if ((this.props.is_external == false) && (this.props.selected_term_list.length > 0)) {
            // internal source that has already been configured. don't auto-open the properties
            return false;
        }
        if ((this.props.is_external == true) && (this.props.rss_url.length > 0)) {
            // external source that has already been configures. don't auto-open the properties
            return false;
        }
        // new or unconfigured source. auto-open the properties.
        return true;
    }

    render() {
        return (
            <PanelBody
                title={this.props.title}
                initialOpen={this.autoOpen()}

            >
                <ToggleControl
                    label={(this.props.is_external ? 'Source (external)' : 'Source (internal)')}
                    checked={this.props.is_external}
                    onChange={this.props.update_is_external}
                    help={this.props.is_external ? 'Get posts from an RSS feed' : 'Get posts from WordPress'}
                />
                {(!this.props.is_external) ?

                    <News_block_component_internal
                        {...this.props}
                    />
                    :
                    <News_block_component_external
                        {...this.props}
                    />

                }

            </PanelBody >

        )
    }
}

class news_block extends Component {

    // state is used to save temporary data, like the list of sites or taxonomies.
    // we don't need that saved and retrieved from database fields.
    // for data we save in order to render, that gets set in the attributes.
    static getInitialState() {
        return {
            sources: []
        };
    }

    /**
     * Returns a list of all methods (functions) for a given object, and optionally only those methods whose name begins with a specific string
     * @param obj
     * @param prefix_filter Filter list of methods to only include those starting with this string
     * @returns {string[]} Array of methods from object
     */
    static getMethods(obj, prefix_filter = '') {
        return Object.getOwnPropertyNames(obj).filter((item) => {
            if (prefix_filter) {
                return ((typeof obj[ item ] === 'function') && (item.startsWith(prefix_filter)));

            } else {
                return (typeof obj[ item ] === 'function');
            }
        })
    };

    // Call super(props) and bind functions
    constructor() {
        super(...arguments);
        this.state = this.constructor.getInitialState();

        // Need to bind 'this' to all of the methods (functions) of the news_block class. Listing them all individually started
        // to get long, so instead we request all the methods on the 'this' object, and then bind 'this' to them if they're
        // one of our 'get' or 'update' methods

    }


    componentDidMount() {
        console.log(this.props.attributes.sources);
        // for each source in the database, create a corresponding blank entry in state to hold lists of sites, terms, etc. then load the sites.
        if (this.props.attributes.sources.length > 0) {
            this.props.attributes.sources.map((single_source, index) => {
                this.insertIntoSourceArrayState(single_source);
                this.getSites(index);
                this.getPostTypes(index);
                this.getTaxonomies(index);
                this.getTerms(index);
            });
        } else {
            this.insertSource();
        }

    }

    static attributesMerge(defaults, options) {
        for (const [ key, value ] of Object.entries(defaults)) {
            if ((options[ key ] !== undefined) && (options[ key ] !== null)) {
                defaults[ key ] = options[ key ] // if array passed in has a value set for one of our defaults, copy the value over. otherwise, ignore that extra key-value pair.
            }
        }
        return defaults;
    }

    /**
     * Inserts a blank entry in the state for a single source. Use in combination with creating a new source, or when
     * loading the page (creating a blank entry for each source, then loading the data afterwards).
     */
    insertIntoSourceArrayState = (single_source = []) => {
        let new_source_state = {
            sites: [ {value: 0, label: __('Loading sites...'), disabled: true,} ],
            post_types: [ {value: '', label: __('Loading post types...'), disabled: true,} ],
            taxonomies: [ {value: '', label: __('Loading taxonomies...'), disabled: true,} ],
            terms: [ {value: '', label: __('Loading terms...'), disabled: true,} ],
            source_enabled: true,
            is_external: false,
            rss_url: '',
            blog_id: 1,
            post_type: '',
            taxonomy: '',
            taxonomy_term_mode: false,
            selected_term_list: []

        };
        console.log(single_source);
        new_source_state = this.constructor.attributesMerge(new_source_state, single_source);
        console.log(new_source_state);
        this.setState((previousState) => {
            let state_sources;
            state_sources = previousState.sources.slice(0); // clone the array to modify it, so we don't mess it up
            state_sources.push(new_source_state);
            return {sources: state_sources};
        }, () => {
            // after adding a blank source, get the network sites and populate the first dropdown for the new source
            this.getSites(this.state.sources.length - 1);
        });

    };


    /**
     * When user clicks 'insert' button, this creates a new blank entry in the state and props.attributes for the dynamic and server data.
     * It then runs ajax to get the sites for the initial list of the blank entry.
     */
    insertSource = () => {
        const new_source_attributes = {
            source_enabled: true,
            is_external: false,
            rss_url: '',
            blog_id: 1,
            post_type: '',
            taxonomy: '',
            taxonomy_term_mode: false,
            selected_term_list: []
        };
        let attributes_sources;
        attributes_sources = JSON.parse(JSON.stringify(this.state.sources));
        attributes_sources.map((single_source, single_index) => {
            delete single_source[ 'sites' ];
            delete single_source[ 'post_types' ];
            delete single_source[ 'taxonomies' ];
            delete single_source[ 'terms' ];
            return single_source;
        });
        attributes_sources.push(new_source_attributes);

        // have to add a new entry in both the attributes (for server-side values) and the state (for temporary client-side values, like the list of sites)
        this.props.setAttributes({sources: (attributes_sources)});
        this.insertIntoSourceArrayState();


    };

    deleteSource = (index) => {
        this.setState((previousState) => {
            let remaining_sources_state;
            remaining_sources_state = JSON.parse(JSON.stringify(previousState.sources));
            remaining_sources_state.splice(index, 1);
            return {sources: remaining_sources_state}
        }, () => {
            let remaining_sources;
            remaining_sources = JSON.parse(JSON.stringify(this.state.sources));
            this.props.setAttributes({sources: (remaining_sources)})
        });


    };

    getSites = (index) => {
        this.setSourceArrayState(
            index,
            'sites',
            [ {value: '', label: __('Loading sites...'), disabled: true,} ]
        );

        let promise_result = (apiFetch({path: 'schrauger/news-block/v1/get-sites/'}).then((sites) => {
            // load sites into select list
            let options_site_list = [];
            if (sites.length > 0) {
                options_site_list.push({value: 0, label: __('Select a site'), disabled: false,});
                sites.forEach((site) => {
                    options_site_list.push({value: site.value, label: site.label})
                })
            } else {
                options_site_list.push({value: 0, label: __('No valid sites'), disabled: true,});
            }

            this.setSourceArrayState(index, 'sites', options_site_list);

            if (this.state.sources[ index ].blog_id >= 1) {
                this.getPostTypes(index, this.state.sources[ index ].blog_id);
            }
        }));

        return promise_result;
    };

    getPostTypes = (index, site) => {

        this.setSourceArrayState(
            index,
            'post_types',
            [ {value: '', label: __('Loading post types...'), disabled: true,} ]
        );
        this.setSourceArrayState(
            index,
            'taxonomies',
            []
        );
        this.setSourceArrayState(
            index,
            'terms',
            []
        );

        let path = 'schrauger/news-block/v1/';
        if (site) {
            path = path + 'site/' + site + '/';
        }
        path = path + 'get-post-types';

        let promise_result = (apiFetch({path: path}).then((post_types) => {

            // load post types into select list
            let options_post_type_list = [];
            if (post_types.length > 0) {
                options_post_type_list.push({value: '', label: __('Select a post type'), disabled: false,});
                // don't mark this as disabled. otherwise, if a new site is selected, the old post type selected
                // might not exist in the new site, causing react to be unable to detect onchange with a single option.
                // ex: site 1, post_type person. changed to site 2, which has no person posttype but has a single news type.
                //     news is auto selected (as it's the only non-disabled option), but it doesn't trigger the onChange.
                //     And onChange can't be triggered since it's the only option and thus won't change with a user input.
                //     By leaving this empty "Select a ..." option as enabled, that instead becomes the autoselected one,
                //     and the user can thus select the single other option in the list, triggering onChange events.

                post_types.forEach((post_type) => {
                    options_post_type_list.push({value: post_type.value, label: post_type.label})
                })
            } else {
                options_post_type_list.push({value: '', label: __('No valid post types'), disabled: true,});
            }

            this.setSourceArrayState(index, 'post_types', options_post_type_list);

            if (this.state.sources[ index ].post_type >= 1) {
                this.getTaxonomies(index, this.state.sources[ index ].post_type, site);
            }
        }));

        return promise_result;
    };

    /**
     * Loads a list of taxonomies for the specific source, optionally based on the post_type and site
     * @param index
     * @param post_type
     * @param site
     * @returns {*}
     */
    getTaxonomies = (index, post_type, site) => {

        this.setSourceArrayState(
            index,
            'taxonomies',
            [ {value: '', label: __('Loading taxonomies...'), disabled: true,} ]
        );
        this.setSourceArrayState(
            index,
            'terms',
            []
        );

        let path = 'schrauger/news-block/v1/';
        if (site) {
            path = path + 'site/' + site + '/';
        }
        if (post_type) {
            path = path + 'post-type/' + post_type + '/';
        }
        path = path + 'get-taxonomies';

        let promise_result = (apiFetch({path: path}).then((taxonomies) => {

            // load taxonomies into select list
            let options_taxonomy_list = [];
            if (taxonomies.length > 0) {
                options_taxonomy_list.push({value: '', label: __('Select a taxonomy'), disabled: false,}); // value must be empty string; if null, the value ends up being the label.

                taxonomies.forEach((taxonomy) => {
                    options_taxonomy_list.push({value: taxonomy.value, label: taxonomy.label})
                })
            } else {
                options_taxonomy_list = [ {value: '', label: __('No valid taxonomies'), disabled: true,} ];
            }

            this.setSourceArrayState(index, 'taxonomies', options_taxonomy_list);


            if (this.state.sources[ index ].taxonomy >= 1) {
                this.getTerms(index, this.state.sources[ index ].taxonomy, site);
            }
        }));

        return promise_result;
    };

    /**
     * Loads a list of terms for the specific source, optionally based on the taxonomy and site
     * @param index
     * @param taxonomy
     * @param site
     * @returns {*}
     */
    getTerms = (index, taxonomy, site) => {
        this.setSourceArrayState(
            index,
            'terms',
            [ {value: '', label: __('Loading terms...'), disabled: true,} ]
        );

        let path = 'schrauger/news-block/v1/';
        if (site) {
            path = path + 'site/' + site + '/';
        }
        if (taxonomy) {
            path = path + 'taxonomy/' + taxonomy + '/';
        }
        path = path + 'get-terms';

        let promise_result = (apiFetch({path: path}).then((terms) => {
            // load terms into multi-select list
            let options_terms_list = [];// { value: null, label: (this.props.attributes.taxonomy_term_mode ? __('Select terms to exclude' ) : __('Select terms to include') ), disabled: true,  } ];
            if (terms.length > 0) {
                terms.forEach((term) => {
                    options_terms_list.push({value: term.value, label: term.label})
                })
            } else {
                options_terms_list.push({value: '', label: __('No valid terms'), disabled: true,});
            }
            this.setSourceArrayState(index, 'terms', options_terms_list);

        }));

        return promise_result;
    };


    /**
     * Sets the react state for a specified array within the 'sources' array. Used to update the list of sites, post_types, taxonomies, and terms
     * @param source_index
     * @param which_array
     * @param array_values
     */
    setSourceArrayState = (source_index, which_array, array_values) => {
        this.setState((previousState) => {
            const sources = previousState.sources.map((single_source, index) => {
                if (source_index === index) {
                    // this is the source we want to change from the array of sources
                    single_source[ which_array ] = array_values;
                    return single_source;

                } else { // not our source, don't change it
                    return single_source;
                }
            });
            return {sources: sources};
        })

    };

    /**
     * Updates an item within a specific source, stored in the attributes.
     * Specify the index of your source, and the {name:value} of the variable to save
     * @param index
     * @param dictionary key: value of the Item you want to update
     */
    updateAttributeSourceItem = (index, dictionary) => {
        const key = Object.keys(dictionary)[ 0 ];
        const value = Object.values(dictionary)[ 0 ];
        let sources;
        sources = this.state.sources.map((single_source, single_index) => {
            if (index === single_index) {
                single_source[ key ] = value;
            }
            return single_source;
        });

        this.setState({sources});
        console.log(sources);
        // don't push the dynamic lists to the server, as they get recomputed and don't need to be statically saved.
        let sources_without_lists;
        sources_without_lists = JSON.parse(JSON.stringify(sources)); // force a clone so we don't clobber state when setting server attributes
        sources_without_lists.map((single_source, single_index) => {
            delete single_source[ 'sites' ];
            delete single_source[ 'post_types' ];
            delete single_source[ 'taxonomies' ];
            delete single_source[ 'terms' ];
            return single_source;
        });
        this.props.setAttributes({sources: (sources_without_lists)});
    };


    /**
     * For external sources, the only thing we care about is the rss url
     * @param index
     * @param rss_url
     */
    updateRSSUrl = (index, rss_url) => {
        this.updateAttributeSourceItem(index, {rss_url});
    };

    /**
     * Update the site selection, and get post types for that site
     * @param index
     * @param blog_id
     */
    updateSite = (index, blog_id) => {
        this.updateAttributeSourceItem(index, {blog_id});
        this.getPostTypes(index, blog_id); // get new list of taxonomies after changing site

    };

    /**
     * Update the post type selection, and get taxonomies for that post type
     * @param index
     * @param post_type
     */
    updatePostType = (index, post_type) => {
        this.updateAttributeSourceItem(index, {post_type});

        let blog_id = this.state.sources[ index ].blog_id;
        this.getTaxonomies(index, post_type, blog_id);
    };

    updateTaxonomy = (index, taxonomy) => {
        //        this.setState( { taxonomy: taxonomy });
        this.updateAttributeSourceItem(index, {taxonomy});


        // force reset of selected terms, and get new list of terms after changing taxonomy
        let blog_id = this.state.sources[ index ].blog_id;
        this.props.setAttributes({
            selected_term_list: []
        });
        this.getTerms(index, taxonomy, blog_id);
    };

    updateSelectedTerms = (index, selected_term_list) => {
        this.updateAttributeSourceItem(index, {selected_term_list});
    };

    updateLatestDate = (latest_date) => {
        this.props.setAttributes({latest_date});
    };

    updateEarliestDate = (earliest_date) => {
        this.props.setAttributes({earliest_date});
    };

    updateMaxNewsArticles = (max_news_articles) => {
        max_news_articles = parseInt(max_news_articles);
        this.props.setAttributes({max_news_articles});
    };

    updateMaxExcerptLength = (max_excerpt_length) => {
        max_excerpt_length = parseInt(max_excerpt_length);
        this.props.setAttributes({max_excerpt_length});
    };

    update_is_external = (index, is_external) => {
        this.updateAttributeSourceItem(index, {is_external});
    };

    update_taxonomy_term_mode = (index, taxonomy_term_mode) => {
        this.updateAttributeSourceItem(index, {taxonomy_term_mode});
    };

    update_enabled_mode = (index, source_enabled) => {
        this.updateAttributeSourceItem(index, {source_enabled})
    };


    update_text_only_mode = (text_only_mode) => {
        this.props.setAttributes({text_only_mode});
    };

    update_date_restriction_mode = (date_restriction_mode) => {
        this.props.setAttributes({date_restriction_mode});
    };


    /**
     * Prevents users from clicking away from editor by clicking on a link in the server rendered post list.
     * @param event
     */
    static preventLink(event) {
        if (event.nativeEvent) {
            event.nativeEvent.preventDefault();
            event.nativeEvent.stopPropagation();
        }
        event.preventDefault();
        event.stopPropagation();
    }

    render() {
        return [

            <InspectorControls key='inspector' >
                <PanelBody
                    title={'News Block Controls'}
                    initialOpen={true}
                >

                    <ToggleControl
                        label={(this.props.attributes.text_only_mode ? 'Text-only mode (enabled)' : 'Text-only mode (disabled)')}
                        checked={this.props.attributes.text_only_mode}
                        onChange={this.update_text_only_mode}
                        help={this.props.attributes.text_only_mode ? 'Hide images from output' : 'Show images in output'}
                    />
                    <ToggleControl
                        label={(this.props.attributes.date_restriction_mode ? 'Date filter (enabled)' : 'Date filter (disabled)')}
                        checked={this.props.attributes.date_restriction_mode}
                        onChange={this.update_date_restriction_mode}
                        help={this.props.attributes.date_restriction_mode ? 'Show posts from a specific date range' : 'Currently showing the most recent posts'}
                    />
                    {(this.props.attributes.date_restriction_mode) ?
                        <Fragment >
                            <TextControl
                                type={'date'}
                                value={this.props.attributes.earliest_date}
                                label={'Earliest Date'}
                                onChange={this.updateEarliestDate}
                            />
                            <TextControl
                                type={'date'}
                                value={this.props.attributes.latest_date}
                                label={'Latest Date'}
                                onChange={this.updateLatestDate}
                            />
                        </Fragment >
                        :
                        []
                    }

                    <TextControl
                        type={'number'}
                        value={this.props.attributes.max_news_articles}
                        label={'Max news articles'}
                        onChange={this.updateMaxNewsArticles}
                        min={1}
                        max={20}
                        step={1}
                    />
                    <TextControl
                        type={'number'}
                        value={this.props.attributes.max_excerpt_length}
                        label={'Max excerpt word count'}
                        onChange={this.updateMaxExcerptLength}
                        min={0}
                        max={100}
                        step={1}
                    />

                </PanelBody >
                <PanelBody
                    title={'News Block Sources'}
                    initialOpen={true}
                >
                    {(this.props.attributes.sources.length > 0)
                        ?
                        <Fragment >
                            {this.state.sources.map((source, key) => {
                                return (this.state.sources && this.state.sources[ key ])
                                    ?
                                    <Fragment key={key} >
                                        <PanelRow key={key} >
                                            <ToggleControl
                                                label={(source.source_enabled ? 'Source #' + (key + 1) + ' Enabled' : 'Source ' + (key + 1) + ' Disabled')}
                                                checked={source.source_enabled}
                                                onChange={(value) => {
                                                    this.update_enabled_mode(key, value)
                                                }}
                                            />
                                        </PanelRow >
                                        {(source.source_enabled)
                                            ?
                                            []
                                            :
                                            <PanelRow >
                                                <a href={'#'} onClick={(e) => {
                                                    e.preventDefault();
                                                    e.stopPropagation();
                                                    this.deleteSource(key)
                                                }} >{'Delete Source ' + (key + 1)}</a >
                                            </PanelRow >
                                        }
                                    </Fragment >
                                    :
                                    []

                            })}
                        </Fragment >
                        :
                        <PanelRow >Add sources</PanelRow >
                    }
                    <PanelRow >
                        <button onClick={this.insertSource} >Add another source</button >
                    </PanelRow >
                </PanelBody >
                {(this.props.attributes.sources.length > 0)
                    ?

                    <Fragment >
                        {this.state.sources.map((source, key) => {
                            return [
                                <News_block_component
                                    key={key}
                                    map_key={key} // react doesn't let child components see the special 'key' property, so we pass it a second time to a different prop they can use

                                    title={'Source #' + (key + 1) + ' properties'}

                                    is_external={source.is_external}
                                    update_is_external={(value) => {
                                        this.update_is_external(key, value)
                                    }}

                                    blog_id={source.blog_id}
                                    sites={this.state.sources[ key ].sites}
                                    updateSite={(value) => {
                                        this.updateSite(key, value)
                                    }}

                                    post_type={source.post_type}
                                    post_types={this.state.sources[ key ].post_types}
                                    updatePostType={(value) => {
                                        this.updatePostType(key, value)
                                    }}

                                    taxonomy={source.taxonomy}
                                    taxonomies={this.state.sources[ key ].taxonomies}
                                    updateTaxonomy={(value) => {
                                        this.updateTaxonomy(key, value)
                                    }}

                                    taxonomy_term_mode={source.taxonomy_term_mode}
                                    update_taxonomy_term_mode={(value) => {
                                        this.update_taxonomy_term_mode(key, value)
                                    }}

                                    selected_term_list={source.selected_term_list}
                                    terms={this.state.sources[ key ].terms}
                                    updateSelectedTerms={(value) => {
                                        this.updateSelectedTerms(key, value)
                                    }}

                                    rss_url={source.rss_url}
                                    updateRSSUrl={(value) => {
                                        this.updateRSSUrl(key, value)
                                    }}

                                />
                            ]
                        })}
                    </Fragment >
                    :
                    <div >No active sources</div >
                }


            </InspectorControls >

            ,
            <div
                className="overlaypage"
                onClickCapture={this.constructor.preventLink} >
                <ServerSideRender
                    block='schrauger/news-block'
                    attributes={this.props.attributes}
                />
            </div >

        ];

    }


}


registerBlockType(
    'schrauger/news-block', {
        title: __('News Block', 'news-block-for-gutenberg'),
        description: __('Lists the most recent posts from newest to oldest, with the ability to pull in and sort from multiple internal and external sources.', 'news-block-for-gutenberg'),
        icon: 'format-aside',
        category: 'embed',
        attributes: {
            // need ability for two or more sources. probably repeating field.
            // one source option is local, and then you choose the blog (generally 1 ie main blog)
            // another source is local and must be an rss feed. use url parameters to filter external news
            sources: {
                type: 'array',
                default: [
                    {
                        source_enabled: true,
                        is_external: false,
                        rss_url: '',
                        blog_id: 1,
                        post_type: '',
                        taxonomy: '',
                        taxonomy_term_mode: false,
                        selected_term_list: []
                    }
                ],
            },
            text_only_mode: {type: 'boolean', default: false},
            date_restriction_mode: {type: 'boolean', default: false},
            earliest_date: {type: 'date', default: null},
            latest_date: {type: 'date', default: null},
            max_news_articles: {type: 'number', default: 5},
            max_excerpt_length: {type: 'number', default: 55},
        },

        edit: news_block,

        save({props, className}) {

            // this can simply return 'null', which tells wordpress to just save the input attributes.
            // however, by actually saving the html, this saves the html in the database as well, which means
            // that our plugin can be disabled and the old pages will still have iframe html. however, if an unprivileged
            // user edits that page, the iframe code will be stripped out upon saving.
            // due to the html filtering, this return is not strictly used, as the server-side render method overwrites
            // this when printing onto the page (but that allows us to print out raw html without filtering, regardless of user).
            return null;
        }

    });
