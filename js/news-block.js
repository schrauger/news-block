const {registerBlockType} = wp.blocks; //Blocks API
const {createElement, Component, Fragment} = wp.element; //React.createElement
const {InspectorControls} = wp.editor; //Block inspector wrapper
const {
    TextControl,
    SelectControl,
    ServerSideRender,
    PanelBody,
    PanelRow,
    ToggleControl,
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
                                            onChange={this.props.update_taxonomy_term_mode}
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
    render() {
        return (
            <PanelBody
                title={this.props.title}
                initialOpen={true}
            >
                <ToggleControl
                    label={(this.props.source_mode ? 'Source (external)' : 'Source (internal)')}
                    checked={this.props.source_mode}
                    onChange={this.props.update_source_mode}
                    help={this.props.source_mode ? 'Get posts from an RSS feed' : 'Get posts from WordPress'}
                />
                {(!this.props.source_mode) ?

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
            sites: [ {value: 0, label: __('Loading sites...'), disabled: true,} ],
            post_types: [ {value: '', label: __('Loading post types...'), disabled: true,} ],
            taxonomies: [ {value: '', label: __('Loading taxonomies...'), disabled: true,} ],
            terms: [ {value: '', label: __('Loading terms...'), disabled: true,} ],
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
        this.constructor.getMethods(Object.getPrototypeOf(this), 'get').forEach((func_name) => {
            this[ func_name ] = this[ func_name ].bind(this);
        });
        this.constructor.getMethods(Object.getPrototypeOf(this), 'update').forEach((func_name) => {
            this[ func_name ] = this[ func_name ].bind(this);
        });


    }

    // Request data from endpoint
    componentDidMount() {
        this.getSites();
    }

    getSites() {
        this.setState({sites: [ {value: '', label: __('Loading sites...'), disabled: true,} ]});
        return (apiFetch({path: 'schrauger/news-block/v1/get-sites/'}).then((sites) => {
            // load sites into select list
            let options_site_list = [];
            if (sites.length > 0) {
                options_site_list.push({value: 0, label: __('Select a site'), disabled: true,});
                sites.forEach((site) => {
                    options_site_list.push({value: site.value, label: site.label})
                })
            } else {
                options_site_list.push({value: 0, label: __('No valid sites'), disabled: true,});
            }

            this.setState({sites: options_site_list});

            if (this.props.attributes.blog_id) {
                this.getPostTypes(this.props.attributes.blog_id);
            }
        }));
    }

    getPostTypes(site) {
        let path = 'schrauger/news-block/v1/';
        if (site) {
            path = path + 'site/' + site + '/';
        }
        path = path + 'get-post-types';

        this.setState({post_types: [ {value: '', label: __('Loading post types...'), disabled: true,} ]});
        return (apiFetch({path: path}).then((post_types) => {

            // load post types into select list
            let options_post_type_list = [];
            if (post_types.length > 0) {
                options_post_type_list.push({value: '', label: __('Select a post type'), disabled: true,}); // value must be empty string; if null, the value ends up being the label.
                post_types.forEach((post_type) => {
                    options_post_type_list.push({value: post_type.value, label: post_type.label})
                })
            } else {
                options_post_type_list.push({value: '', label: __('No valid post types'), disabled: true,});
            }

            this.setState({post_types: options_post_type_list});

            if (this.props.attributes.post_type) {
                this.getTaxonomies(this.props.attributes.post_type, this.props.attributes.blog_id);
            }
        }));
    }

    getTaxonomies(post_type, site) {
        let path = 'schrauger/news-block/v1/';
        if (site) {
            path = path + 'site/' + site + '/';
        }
        if (post_type) {
            path = path + 'post-type/' + post_type + '/';
        }
        path = path + 'get-taxonomies';

        this.setState({taxonomies: [ {value: '', label: __('Loading taxonomies...'), disabled: true,} ]});
        return (apiFetch({path: path}).then((taxonomies) => {

            // load taxonomies into select list
            let options_taxonomy_list = [];
            if (taxonomies.length > 0) {
                options_taxonomy_list.push({value: '', label: __('Select a taxonomy'), disabled: true,}); // value must be empty string; if null, the value ends up being the label.

                taxonomies.forEach((taxonomy) => {
                    options_taxonomy_list.push({value: taxonomy.value, label: taxonomy.label})
                })
            } else {
                options_taxonomy_list = [ {value: '', label: __('No valid taxonomies'), disabled: true,} ];
            }

            this.setState({taxonomies: options_taxonomy_list});

            if (this.props.attributes.taxonomy) {
                this.getTerms(this.props.attributes.taxonomy, this.props.attributes.blog_id);
            }
        }));
    }

    getTerms(taxonomy, site) {
        let path = 'schrauger/news-block/v1/';
        if (site) {
            path = path + 'site/' + site + '/';
        }
        if (taxonomy) {
            path = path + 'taxonomy/' + taxonomy + '/';
        }
        path = path + 'get-terms';

        this.setState({terms: [ {value: '', label: __('Loading terms...'), disabled: true,} ]});
        return (apiFetch({path: path}).then((terms) => {
            // load terms into multi-select list
            let options_terms_list = [];// { value: null, label: (this.props.attributes.taxonomy_term_mode ? __('Select terms to exclude' ) : __('Select terms to include') ), disabled: true,  } ];
            if (terms.length > 0) {
                terms.forEach((term) => {
                    options_terms_list.push({value: term.value, label: term.label})
                })
            } else {
                options_terms_list.push({value: '', label: __('No valid terms'), disabled: true,});
            }

            this.setState({terms: options_terms_list});
        }));
    }

    updateRSSUrl(rss_url) {
        this.props.setAttributes({rss_url});
    }

    updateSite(blog_id) {
        this.props.setAttributes({
            blog_id: parseInt(blog_id)
        });
        this.getPostTypes(blog_id); // get new list of taxonomies after changing site

    }

    updatePostType(post_type) {
        this.props.setAttributes({post_type});

        // force reset of selected taxonomy, and get new list of taxonomies after changing post type
        let blog_id = this.props.attributes.blog_id;
        this.props.setAttributes({
            taxonomy: ''
        });
        this.getTaxonomies(post_type, blog_id);
    }

    updateTaxonomy(taxonomy) {
        //        this.setState( { taxonomy: taxonomy });
        this.props.setAttributes({taxonomy});

        // force reset of selected terms, and get new list of terms after changing taxonomy
        let blog_id = this.props.attributes.blog_id;
        this.props.setAttributes({
            selected_term_list: []
        });
        this.getTerms(taxonomy, blog_id);
    }

    updateSelectedTerms(selected_term_list) {
        this.props.setAttributes({selected_term_list});
    }

    updateLatestDate(latest_date) {
        this.props.setAttributes({latest_date});
    }

    updateEarliestDate(earliest_date) {
        this.props.setAttributes({earliest_date});
    }

    updateMaxNewsArticles(max_news_articles) {
        max_news_articles = parseInt(max_news_articles);
        this.props.setAttributes({max_news_articles});
    }

    updateMaxExcerptLength(max_excerpt_length) {
        max_excerpt_length = parseInt(max_excerpt_length);
        this.props.setAttributes({max_excerpt_length});
    }

    update_source_mode(source_mode) {
        this.props.setAttributes({source_mode});
    }

    update_taxonomy_term_mode(taxonomy_term_mode) {
        this.props.setAttributes({taxonomy_term_mode});
    }

    update_date_restriction_mode(date_restriction_mode) {
        this.props.setAttributes({date_restriction_mode});
    }

    /**
     * Prevents users from clicking away from editor by clicking on a link in the server rendered post list.
     * @param event
     */
    preventLink(event) {
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
                    title={'News Block Sources'}
                    initialOpen={false}
                >
                </PanelBody >
                <News_block_component
                    title={'Source #1 properties'}

                    source_mode={this.props.attributes.source_mode}
                    update_source_mode={this.update_source_mode}

                    blog_id={this.props.attributes.blog_id}
                    sites={this.state.sites}
                    updateSite={this.updateSite}

                    post_type={this.props.attributes.post_type}
                    post_types={this.state.post_types}
                    updatePostType={this.updatePostType}

                    taxonomy={this.props.attributes.taxonomy}
                    taxonomies={this.state.taxonomies}
                    updateTaxonomy={this.updateTaxonomy}
                    taxonomyTermMode={this.props.attributes.taxonomy_term_mode}
                    update_taxonomy_term_mode={this.update_taxonomy_term_mode}

                    selected_term_list={this.props.attributes.selected_term_list}
                    terms={this.state.terms}
                    updateSelectedTerms={this.updateSelectedTerms}

                    rss_url={this.props.attributes.rss_url}
                    updateRSSUrl={this.updateRSSUrl}

                />

                <PanelBody
                    title={'News Block Controls'}
                    initialOpen={true}
                >

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
            </InspectorControls >

            ,
            <div
                class="overlaypage"
                onClickCapture={this.preventLink} >
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
            source_mode: {type: 'boolean', default: false},
            rss_url: {type: 'string', default: ''},
            blog_id: {type: 'number', default: 1},
            post_type: {type: 'string', default: ''},
            taxonomy: {type: 'string', default: ''},
            taxonomy_term_mode: {type: 'boolean', default: false},
            selected_term_list: {type: 'array', default: []},
            date_restriction_mode: {type: 'boolean', default: false},
            earliest_date: {type: 'date', default: null},
            latest_date: {type: 'date', default: null},
            max_news_articles: {type: 'number', default: 6},
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
