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
            blog_id: {type: 'number', default: 1},
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

class news_block extends Component {

    // state is used to save temporary data, like the list of sites or taxonomies.
    // we don't need that saved and retrieved from database fields.
    // for data we save in order to render, that gets set in the attributes.
    static getInitialState() {
        return {
            sites: [],
            post_types: [],
            taxonomies: [],
            terms: [],
        };
    }

    constructor() {
        super(...arguments);
        //console.log(this.props.attributes);
        this.state = this.constructor.getInitialState();

        this.getSites = this.getSites.bind(this);
        this.getTaxonomies = this.getTaxonomies.bind(this);
        this.getTerms = this.getTerms.bind(this);

        this.updateSite = this.updateSite.bind(this);
        this.updatePostType = this.updatePostType.bind(this);
        this.updateTaxonomy = this.updateTaxonomy.bind(this);
        this.updateSelectedTerms = this.updateSelectedTerms.bind(this);


        this.updateEarliestDate = this.updateEarliestDate.bind(this);
        this.updateLatestDate = this.updateLatestDate.bind(this);
        this.updateMaxNewsArticles = this.updateMaxNewsArticles.bind(this);
        this.updateMaxExcerptLength = this.updateMaxExcerptLength.bind(this);

        this.update_taxonomy_term_mode = this.update_taxonomy_term_mode.bind(this);
        this.update_date_restriction_mode = this.update_date_restriction_mode.bind(this);


        this.getSites();
    }

    getSites() {
        return (apiFetch({path: 'schrauger/news-block/v1/get-sites/'}).then((sites) => {
            this.setState({sites});

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

        return (apiFetch({path: path}).then((post_types) => {
            this.setState({post_types});

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

        return (apiFetch({path: path}).then((taxonomies) => {
            this.setState({taxonomies});

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

        return (apiFetch({path: path}).then((terms) => {
            this.setState({terms});
        }));
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
        let options_site_list = [ {value: 0, label: __('Select a site'), disabled: true,} ];
        if (this.state.sites.length > 0) {
            this.state.sites.forEach((site) => {
                options_site_list.push({value: site.value, label: site.label})
            })
        }

        let options_post_type_list = [ {value: '', label: __('Select a Post Type'), disabled: true,} ]; // value must be empty string; if null, the value ends up being the label.
        if (this.state.post_types.length > 0) {
            console.log(this.state.post_types);
            this.state.post_types.forEach((post_type) => {
                options_post_type_list.push({value: post_type.value, label: post_type.label})
            })
        }

        let options_taxonomy_list = [ {value: '', label: __('Select a taxonomy'), disabled: true,} ]; // value must be empty string; if null, the value ends up being the label.
        if (this.state.taxonomies.length > 0) {
            this.state.taxonomies.forEach((taxonomy) => {
                options_taxonomy_list.push({value: taxonomy.value, label: taxonomy.label})
            })
        }


        let options_terms_list = [];// { value: null, label: (this.props.attributes.taxonomy_term_mode ? __('Select terms to exclude' ) : __('Select terms to include') ), disabled: true,  } ];
        if (this.state.terms.length > 0) {
            this.state.terms.forEach((term) => {
                options_terms_list.push({value: term.value, label: term.label})
            })
        }
        return [

            <InspectorControls key='inspector' >
                <PanelBody
                    title={'News Block Controls'}
                    initialOpen={true}
                >
                    <PanelRow >
                        <SelectControl
                            value={this.props.attributes.blog_id}
                            label={__('Select a site')}
                            options={options_site_list}
                            onChange={this.updateSite}
                        />
                    </PanelRow >

                    {(this.props.attributes.blog_id) ?
                        <Fragment >
                            <SelectControl
                                value={this.props.attributes.post_type}
                                label={__('Select a post type')}
                                options={options_post_type_list}
                                onChange={this.updatePostType}
                            />
                            {(this.props.attributes.post_type) ?
                                <Fragment >
                                    <SelectControl
                                        value={this.props.attributes.taxonomy}
                                        label={__('Select a taxonomy')}
                                        options={options_taxonomy_list}
                                        onChange={this.updateTaxonomy}
                                    />
                                    {(this.props.attributes.taxonomy) ?
                                        <Fragment >
                                            <ToggleControl
                                                label={(this.props.attributes.taxonomy_term_mode ? 'Blacklist mode active' : 'Whitelist mode active')}
                                                checked={this.props.attributes.taxonomy_term_mode}
                                                onChange={this.update_taxonomy_term_mode}
                                                help={this.props.attributes.taxonomy_term_mode ? 'Exclude posts containing any of the specified terms' : 'Only include posts containing any of the specified terms'}
                                            />
                                            <SelectControl
                                                value={this.props.attributes.selected_term_list}
                                                label={(this.props.attributes.taxonomy_term_mode ? __('Select terms to exclude') : __('Select terms to include'))}
                                                options={options_terms_list}
                                                onChange={this.updateSelectedTerms}
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





