/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var registerBlockType = wp.blocks.registerBlockType; //Blocks API

var _wp$element = wp.element,
    createElement = _wp$element.createElement,
    Component = _wp$element.Component,
    Fragment = _wp$element.Fragment; //React.createElement

var InspectorControls = wp.editor.InspectorControls; //Block inspector wrapper

var _wp$components = wp.components,
    TextControl = _wp$components.TextControl,
    SelectControl = _wp$components.SelectControl,
    ServerSideRender = _wp$components.ServerSideRender,
    PanelBody = _wp$components.PanelBody,
    PanelRow = _wp$components.PanelRow,
    ToggleControl = _wp$components.ToggleControl; //Block inspector wrapper

var _wp$data = wp.data,
    registerStore = _wp$data.registerStore,
    withSelect = _wp$data.withSelect; // used to run json requests for wordpress data (blogs, taxonomies)

var __ = wp.i18n.__;
var _wp = wp,
    apiFetch = _wp.apiFetch;

var News_block_component_internal = function (_Component) {
    _inherits(News_block_component_internal, _Component);

    function News_block_component_internal() {
        _classCallCheck(this, News_block_component_internal);

        return _possibleConstructorReturn(this, (News_block_component_internal.__proto__ || Object.getPrototypeOf(News_block_component_internal)).apply(this, arguments));
    }

    _createClass(News_block_component_internal, [{
        key: 'render',
        value: function render() {
            return wp.element.createElement(
                Fragment,
                null,
                wp.element.createElement(SelectControl, {
                    value: this.props.blog_id,
                    label: __('Select a site'),
                    options: this.props.sites,
                    onChange: this.props.updateSite
                }),
                this.props.blog_id ? wp.element.createElement(
                    Fragment,
                    null,
                    wp.element.createElement(SelectControl, {
                        value: this.props.post_type,
                        label: __('Select a post type'),
                        options: this.props.post_types,
                        onChange: this.props.updatePostType
                    }),
                    this.props.post_type ? wp.element.createElement(
                        Fragment,
                        null,
                        wp.element.createElement(SelectControl, {
                            value: this.props.taxonomy,
                            label: __('Select a taxonomy'),
                            options: this.props.taxonomies,
                            onChange: this.props.updateTaxonomy
                        }),
                        this.props.taxonomy ? wp.element.createElement(
                            Fragment,
                            null,
                            wp.element.createElement(ToggleControl, {
                                label: this.props.taxonomy_term_mode ? 'Term filter (blacklist)' : 'Term filter (whitelist)',
                                checked: this.props.taxonomy_term_mode,
                                onChange: this.props.update_taxonomy_term_mode,
                                help: this.props.taxonomy_term_mode ? 'Exclude posts containing any of the specified terms' : 'Only include posts containing any of the specified terms'
                            }),
                            wp.element.createElement(SelectControl, {
                                value: this.props.selected_term_list,
                                label: this.props.taxonomy_term_mode ? __('Select terms to exclude') : __('Select terms to include'),
                                options: this.props.terms,
                                onChange: this.props.updateSelectedTerms,
                                multiple: true
                            })
                        ) : []
                    ) : []
                ) : []
            );
        }
    }]);

    return News_block_component_internal;
}(Component);

var News_block_component_external = function (_Component2) {
    _inherits(News_block_component_external, _Component2);

    function News_block_component_external() {
        _classCallCheck(this, News_block_component_external);

        return _possibleConstructorReturn(this, (News_block_component_external.__proto__ || Object.getPrototypeOf(News_block_component_external)).apply(this, arguments));
    }

    _createClass(News_block_component_external, [{
        key: 'render',
        value: function render() {
            return wp.element.createElement(TextControl, {
                type: 'string',
                value: this.props.rss_url,
                label: 'RSS Url',
                onChange: this.props.updateRSSUrl
            });
        }
    }]);

    return News_block_component_external;
}(Component);

// note: React components must start with a Capital letter


var News_block_component = function (_Component3) {
    _inherits(News_block_component, _Component3);

    function News_block_component() {
        _classCallCheck(this, News_block_component);

        return _possibleConstructorReturn(this, (News_block_component.__proto__ || Object.getPrototypeOf(News_block_component)).apply(this, arguments));
    }

    _createClass(News_block_component, [{
        key: 'render',
        value: function render() {
            return wp.element.createElement(
                PanelBody,
                {
                    title: this.props.title,
                    initialOpen: true
                },
                wp.element.createElement(ToggleControl, {
                    label: this.props.source_mode ? 'Source (external)' : 'Source (internal)',
                    checked: this.props.source_mode,
                    onChange: this.props.update_source_mode,
                    help: this.props.source_mode ? 'Get posts from an RSS feed' : 'Get posts from WordPress'
                }),
                !this.props.source_mode ? wp.element.createElement(News_block_component_internal, this.props) : wp.element.createElement(News_block_component_external, this.props)
            );
        }
    }]);

    return News_block_component;
}(Component);

var news_block = function (_Component4) {
    _inherits(news_block, _Component4);

    _createClass(news_block, null, [{
        key: 'getInitialState',


        // state is used to save temporary data, like the list of sites or taxonomies.
        // we don't need that saved and retrieved from database fields.
        // for data we save in order to render, that gets set in the attributes.
        value: function getInitialState() {
            return {
                sites: [{ value: 0, label: __('Loading sites...'), disabled: true }],
                post_types: [{ value: '', label: __('Loading post types...'), disabled: true }],
                taxonomies: [{ value: '', label: __('Loading taxonomies...'), disabled: true }],
                terms: [{ value: '', label: __('Loading terms...'), disabled: true }]
            };
        }

        /**
         * Returns a list of all methods (functions) for a given object, and optionally only those methods whose name begins with a specific string
         * @param obj
         * @param prefix_filter Filter list of methods to only include those starting with this string
         * @returns {string[]} Array of methods from object
         */

    }, {
        key: 'getMethods',
        value: function getMethods(obj) {
            var prefix_filter = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

            return Object.getOwnPropertyNames(obj).filter(function (item) {
                if (prefix_filter) {
                    return typeof obj[item] === 'function' && item.startsWith(prefix_filter);
                } else {
                    return typeof obj[item] === 'function';
                }
            });
        }
    }]);

    // Call super(props) and bind functions
    function news_block() {
        _classCallCheck(this, news_block);

        var _this4 = _possibleConstructorReturn(this, (news_block.__proto__ || Object.getPrototypeOf(news_block)).apply(this, arguments));

        _this4.state = _this4.constructor.getInitialState();

        // Need to bind 'this' to all of the methods (functions) of the news_block class. Listing them all individually started
        // to get long, so instead we request all the methods on the 'this' object, and then bind 'this' to them if they're
        // one of our 'get' or 'update' methods
        _this4.constructor.getMethods(Object.getPrototypeOf(_this4), 'get').forEach(function (func_name) {
            _this4[func_name] = _this4[func_name].bind(_this4);
        });
        _this4.constructor.getMethods(Object.getPrototypeOf(_this4), 'update').forEach(function (func_name) {
            _this4[func_name] = _this4[func_name].bind(_this4);
        });

        return _this4;
    }

    // Request data from endpoint


    _createClass(news_block, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.getSites();
        }
    }, {
        key: 'getSites',
        value: function getSites() {
            var _this5 = this;

            this.setState({ sites: [{ value: '', label: __('Loading sites...'), disabled: true }] });
            return apiFetch({ path: 'schrauger/news-block/v1/get-sites/' }).then(function (sites) {
                // load sites into select list
                var options_site_list = [];
                if (sites.length > 0) {
                    options_site_list.push({ value: 0, label: __('Select a site'), disabled: true });
                    sites.forEach(function (site) {
                        options_site_list.push({ value: site.value, label: site.label });
                    });
                } else {
                    options_site_list.push({ value: 0, label: __('No valid sites'), disabled: true });
                }

                _this5.setState({ sites: options_site_list });

                if (_this5.props.attributes.blog_id) {
                    _this5.getPostTypes(_this5.props.attributes.blog_id);
                }
            });
        }
    }, {
        key: 'getPostTypes',
        value: function getPostTypes(site) {
            var _this6 = this;

            var path = 'schrauger/news-block/v1/';
            if (site) {
                path = path + 'site/' + site + '/';
            }
            path = path + 'get-post-types';

            this.setState({ post_types: [{ value: '', label: __('Loading post types...'), disabled: true }] });
            return apiFetch({ path: path }).then(function (post_types) {

                // load post types into select list
                var options_post_type_list = [];
                if (post_types.length > 0) {
                    options_post_type_list.push({ value: '', label: __('Select a post type'), disabled: true }); // value must be empty string; if null, the value ends up being the label.
                    post_types.forEach(function (post_type) {
                        options_post_type_list.push({ value: post_type.value, label: post_type.label });
                    });
                } else {
                    options_post_type_list.push({ value: '', label: __('No valid post types'), disabled: true });
                }

                _this6.setState({ post_types: options_post_type_list });

                if (_this6.props.attributes.post_type) {
                    _this6.getTaxonomies(_this6.props.attributes.post_type, _this6.props.attributes.blog_id);
                }
            });
        }
    }, {
        key: 'getTaxonomies',
        value: function getTaxonomies(post_type, site) {
            var _this7 = this;

            var path = 'schrauger/news-block/v1/';
            if (site) {
                path = path + 'site/' + site + '/';
            }
            if (post_type) {
                path = path + 'post-type/' + post_type + '/';
            }
            path = path + 'get-taxonomies';

            this.setState({ taxonomies: [{ value: '', label: __('Loading taxonomies...'), disabled: true }] });
            return apiFetch({ path: path }).then(function (taxonomies) {

                // load taxonomies into select list
                var options_taxonomy_list = [];
                if (taxonomies.length > 0) {
                    options_taxonomy_list.push({ value: '', label: __('Select a taxonomy'), disabled: true }); // value must be empty string; if null, the value ends up being the label.

                    taxonomies.forEach(function (taxonomy) {
                        options_taxonomy_list.push({ value: taxonomy.value, label: taxonomy.label });
                    });
                } else {
                    options_taxonomy_list = [{ value: '', label: __('No valid taxonomies'), disabled: true }];
                }

                _this7.setState({ taxonomies: options_taxonomy_list });

                if (_this7.props.attributes.taxonomy) {
                    _this7.getTerms(_this7.props.attributes.taxonomy, _this7.props.attributes.blog_id);
                }
            });
        }
    }, {
        key: 'getTerms',
        value: function getTerms(taxonomy, site) {
            var _this8 = this;

            var path = 'schrauger/news-block/v1/';
            if (site) {
                path = path + 'site/' + site + '/';
            }
            if (taxonomy) {
                path = path + 'taxonomy/' + taxonomy + '/';
            }
            path = path + 'get-terms';

            this.setState({ terms: [{ value: '', label: __('Loading terms...'), disabled: true }] });
            return apiFetch({ path: path }).then(function (terms) {
                // load terms into multi-select list
                var options_terms_list = []; // { value: null, label: (this.props.attributes.taxonomy_term_mode ? __('Select terms to exclude' ) : __('Select terms to include') ), disabled: true,  } ];
                if (terms.length > 0) {
                    terms.forEach(function (term) {
                        options_terms_list.push({ value: term.value, label: term.label });
                    });
                } else {
                    options_terms_list.push({ value: '', label: __('No valid terms'), disabled: true });
                }

                _this8.setState({ terms: options_terms_list });
            });
        }
    }, {
        key: 'updateRSSUrl',
        value: function updateRSSUrl(rss_url) {
            this.props.setAttributes({ rss_url: rss_url });
        }
    }, {
        key: 'updateSite',
        value: function updateSite(blog_id) {
            this.props.setAttributes({
                blog_id: parseInt(blog_id)
            });
            this.getPostTypes(blog_id); // get new list of taxonomies after changing site
        }
    }, {
        key: 'updatePostType',
        value: function updatePostType(post_type) {
            this.props.setAttributes({ post_type: post_type });

            // force reset of selected taxonomy, and get new list of taxonomies after changing post type
            var blog_id = this.props.attributes.blog_id;
            this.props.setAttributes({
                taxonomy: ''
            });
            this.getTaxonomies(post_type, blog_id);
        }
    }, {
        key: 'updateTaxonomy',
        value: function updateTaxonomy(taxonomy) {
            //        this.setState( { taxonomy: taxonomy });
            this.props.setAttributes({ taxonomy: taxonomy });

            // force reset of selected terms, and get new list of terms after changing taxonomy
            var blog_id = this.props.attributes.blog_id;
            this.props.setAttributes({
                selected_term_list: []
            });
            this.getTerms(taxonomy, blog_id);
        }
    }, {
        key: 'updateSelectedTerms',
        value: function updateSelectedTerms(selected_term_list) {
            this.props.setAttributes({ selected_term_list: selected_term_list });
        }
    }, {
        key: 'updateLatestDate',
        value: function updateLatestDate(latest_date) {
            this.props.setAttributes({ latest_date: latest_date });
        }
    }, {
        key: 'updateEarliestDate',
        value: function updateEarliestDate(earliest_date) {
            this.props.setAttributes({ earliest_date: earliest_date });
        }
    }, {
        key: 'updateMaxNewsArticles',
        value: function updateMaxNewsArticles(max_news_articles) {
            max_news_articles = parseInt(max_news_articles);
            this.props.setAttributes({ max_news_articles: max_news_articles });
        }
    }, {
        key: 'updateMaxExcerptLength',
        value: function updateMaxExcerptLength(max_excerpt_length) {
            max_excerpt_length = parseInt(max_excerpt_length);
            this.props.setAttributes({ max_excerpt_length: max_excerpt_length });
        }
    }, {
        key: 'update_source_mode',
        value: function update_source_mode(source_mode) {
            this.props.setAttributes({ source_mode: source_mode });
        }
    }, {
        key: 'update_taxonomy_term_mode',
        value: function update_taxonomy_term_mode(taxonomy_term_mode) {
            this.props.setAttributes({ taxonomy_term_mode: taxonomy_term_mode });
        }
    }, {
        key: 'update_date_restriction_mode',
        value: function update_date_restriction_mode(date_restriction_mode) {
            this.props.setAttributes({ date_restriction_mode: date_restriction_mode });
        }

        /**
         * Prevents users from clicking away from editor by clicking on a link in the server rendered post list.
         * @param event
         */

    }, {
        key: 'preventLink',
        value: function preventLink(event) {
            if (event.nativeEvent) {
                event.nativeEvent.preventDefault();
                event.nativeEvent.stopPropagation();
            }
            event.preventDefault();
            event.stopPropagation();
        }
    }, {
        key: 'render',
        value: function render() {

            return [wp.element.createElement(
                InspectorControls,
                { key: 'inspector' },
                wp.element.createElement(PanelBody, {
                    title: 'News Block Sources',
                    initialOpen: false
                }),
                wp.element.createElement(News_block_component, {
                    title: 'Source #1 properties',

                    source_mode: this.props.attributes.source_mode,
                    update_source_mode: this.update_source_mode,

                    blog_id: this.props.attributes.blog_id,
                    sites: this.state.sites,
                    updateSite: this.updateSite,

                    post_type: this.props.attributes.post_type,
                    post_types: this.state.post_types,
                    updatePostType: this.updatePostType,

                    taxonomy: this.props.attributes.taxonomy,
                    taxonomies: this.state.taxonomies,
                    updateTaxonomy: this.updateTaxonomy,
                    taxonomyTermMode: this.props.attributes.taxonomy_term_mode,
                    update_taxonomy_term_mode: this.update_taxonomy_term_mode,

                    selected_term_list: this.props.attributes.selected_term_list,
                    terms: this.state.terms,
                    updateSelectedTerms: this.updateSelectedTerms,

                    rss_url: this.props.attributes.rss_url,
                    updateRSSUrl: this.updateRSSUrl

                }),
                wp.element.createElement(
                    PanelBody,
                    {
                        title: 'News Block Controls',
                        initialOpen: true
                    },
                    wp.element.createElement(ToggleControl, {
                        label: this.props.attributes.date_restriction_mode ? 'Date filter (enabled)' : 'Date filter (disabled)',
                        checked: this.props.attributes.date_restriction_mode,
                        onChange: this.update_date_restriction_mode,
                        help: this.props.attributes.date_restriction_mode ? 'Show posts from a specific date range' : 'Currently showing the most recent posts'
                    }),
                    this.props.attributes.date_restriction_mode ? wp.element.createElement(
                        Fragment,
                        null,
                        wp.element.createElement(TextControl, {
                            type: 'date',
                            value: this.props.attributes.earliest_date,
                            label: 'Earliest Date',
                            onChange: this.updateEarliestDate
                        }),
                        wp.element.createElement(TextControl, {
                            type: 'date',
                            value: this.props.attributes.latest_date,
                            label: 'Latest Date',
                            onChange: this.updateLatestDate
                        })
                    ) : [],
                    wp.element.createElement(TextControl, {
                        type: 'number',
                        value: this.props.attributes.max_news_articles,
                        label: 'Max news articles',
                        onChange: this.updateMaxNewsArticles,
                        min: 1,
                        max: 20,
                        step: 1
                    }),
                    wp.element.createElement(TextControl, {
                        type: 'number',
                        value: this.props.attributes.max_excerpt_length,
                        label: 'Max excerpt word count',
                        onChange: this.updateMaxExcerptLength,
                        min: 0,
                        max: 100,
                        step: 1
                    })
                )
            ), wp.element.createElement(
                'div',
                {
                    'class': 'overlaypage',
                    onClickCapture: this.preventLink },
                wp.element.createElement(ServerSideRender, {
                    block: 'schrauger/news-block',
                    attributes: this.props.attributes
                })
            )];
        }
    }]);

    return news_block;
}(Component);

registerBlockType('schrauger/news-block', {
    title: __('News Block', 'news-block-for-gutenberg'),
    description: __('Lists the most recent posts from newest to oldest, with the ability to pull in and sort from multiple internal and external sources.', 'news-block-for-gutenberg'),
    icon: 'format-aside',
    category: 'embed',
    attributes: {
        // need ability for two or more sources. probably repeating field.
        // one source option is local, and then you choose the blog (generally 1 ie main blog)
        // another source is local and must be an rss feed. use url parameters to filter external news
        source_mode: { type: 'boolean', default: false },
        rss_url: { type: 'string', default: '' },
        blog_id: { type: 'number', default: 1 },
        post_type: { type: 'string', default: '' },
        taxonomy: { type: 'string', default: '' },
        taxonomy_term_mode: { type: 'boolean', default: false },
        selected_term_list: { type: 'array', default: [] },
        date_restriction_mode: { type: 'boolean', default: false },
        earliest_date: { type: 'date', default: null },
        latest_date: { type: 'date', default: null },
        max_news_articles: { type: 'number', default: 6 },
        max_excerpt_length: { type: 'number', default: 55 }
    },

    edit: news_block,

    save: function save(_ref) {
        var props = _ref.props,
            className = _ref.className;

        // this can simply return 'null', which tells wordpress to just save the input attributes.
        // however, by actually saving the html, this saves the html in the database as well, which means
        // that our plugin can be disabled and the old pages will still have iframe html. however, if an unprivileged
        // user edits that page, the iframe code will be stripped out upon saving.
        // due to the html filtering, this return is not strictly used, as the server-side render method overwrites
        // this when printing onto the page (but that allows us to print out raw html without filtering, regardless of user).
        return null;
    }
});

/***/ })
/******/ ]);