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

var news_block = function (_Component) {
    _inherits(news_block, _Component);

    _createClass(news_block, null, [{
        key: 'getInitialState',
        value: function getInitialState(attributes) {
            return {
                sites: [],
                taxonomies: [],
                terms: [],
                blog_id: attributes.blog_id,
                taxonomy: attributes.taxonomy,
                selected_term_list: attributes.selected_term_list
            };
        }
    }]);

    function news_block() {
        _classCallCheck(this, news_block);

        //console.log(this.props.attributes);
        var _this = _possibleConstructorReturn(this, (news_block.__proto__ || Object.getPrototypeOf(news_block)).apply(this, arguments));

        _this.state = _this.constructor.getInitialState(_this.props.attributes);

        _this.getSites = _this.getSites.bind(_this);
        _this.getTaxonomies = _this.getTaxonomies.bind(_this);
        _this.getTerms = _this.getTerms.bind(_this);

        _this.updateSite = _this.updateSite.bind(_this);
        _this.updateTaxonomy = _this.updateTaxonomy.bind(_this);
        _this.updateSelectedTerms = _this.updateSelectedTerms.bind(_this);

        _this.updateEarliestDate = _this.updateEarliestDate.bind(_this);
        _this.updateLatestDate = _this.updateLatestDate.bind(_this);
        _this.updateMaxNewsArticles = _this.updateMaxNewsArticles.bind(_this);
        _this.updateMaxExcerptLength = _this.updateMaxExcerptLength.bind(_this);

        _this.update_taxonomy_term_mode = _this.update_taxonomy_term_mode.bind(_this);
        _this.update_date_restriction_mode = _this.update_date_restriction_mode.bind(_this);

        _this.getSites();
        return _this;
    }

    _createClass(news_block, [{
        key: 'getSites',
        value: function getSites() {
            var _this2 = this;

            return apiFetch({ path: 'schrauger/news-block/v1/get-sites/' }).then(function (sites) {
                _this2.setState({ sites: sites });

                if (_this2.state.blog_id) {
                    _this2.getTaxonomies(_this2.state.blog_id);
                }
            });
        }
    }, {
        key: 'getTaxonomies',
        value: function getTaxonomies(site) {
            var _this3 = this;

            var path = 'schrauger/news-block/v1/';
            if (site) {
                path = path + 'site/' + site + '/';
            }
            path = path + 'get-taxonomies';

            return apiFetch({ path: path }).then(function (taxonomies) {
                _this3.setState({ taxonomies: taxonomies });

                if (_this3.state.taxonomy) {
                    _this3.getTerms(_this3.state.taxonomy, _this3.state.blog_id);
                }
            });
        }
    }, {
        key: 'getTerms',
        value: function getTerms(taxonomy, site) {
            var _this4 = this;

            var path = 'schrauger/news-block/v1/';
            if (site) {
                path = path + 'site/' + site + '/';
            }
            if (taxonomy) {
                path = path + 'taxonomy/' + taxonomy + '/';
            }
            path = path + 'get-terms';

            return apiFetch({ path: path }).then(function (terms) {
                _this4.setState({ terms: terms });
            });
        }
    }, {
        key: 'updateSite',
        value: function updateSite(blog_id) {
            this.setState({ blog_id: parseInt(blog_id) });
            this.props.setAttributes({
                blog_id: parseInt(blog_id)
            });
            this.getTaxonomies(blog_id); // get new list of taxonomies after changing site
        }
    }, {
        key: 'updateTaxonomy',
        value: function updateTaxonomy(taxonomy) {
            this.setState({ taxonomy: taxonomy });
            this.props.setAttributes({
                taxonomy: taxonomy
            });
            var blog_id = this.state.blog_id;

            // force reset of selected terms, and get new list of terms after changing taxonomy
            this.setState({ selected_term_list: [] });
            this.props.setAttributes({
                selected_term_list: []
            });
            this.getTerms(taxonomy, blog_id);
        }
    }, {
        key: 'updateSelectedTerms',
        value: function updateSelectedTerms(selected_term_list) {
            this.setState({ selected_term_list: selected_term_list });
            this.props.setAttributes({
                selected_term_list: selected_term_list
            });
        }
    }, {
        key: 'updateLatestDate',
        value: function updateLatestDate(latest_date) {
            this.setState({ latest_date: latest_date });
            this.props.setAttributes({ latest_date: latest_date });
        }
    }, {
        key: 'updateEarliestDate',
        value: function updateEarliestDate(earliest_date) {
            this.setState({ earliest_date: earliest_date });
            this.props.setAttributes({ earliest_date: earliest_date });
        }
    }, {
        key: 'updateMaxNewsArticles',
        value: function updateMaxNewsArticles(max_news_articles) {
            max_news_articles = parseInt(max_news_articles);
            this.setState({ max_news_articles: max_news_articles });
            this.props.setAttributes({ max_news_articles: max_news_articles });
        }
    }, {
        key: 'updateMaxExcerptLength',
        value: function updateMaxExcerptLength(max_excerpt_length) {
            max_excerpt_length = parseInt(max_excerpt_length);
            this.setState({ max_excerpt_length: max_excerpt_length });
            this.props.setAttributes({ max_excerpt_length: max_excerpt_length });
        }
    }, {
        key: 'update_taxonomy_term_mode',
        value: function update_taxonomy_term_mode(taxonomy_term_mode) {
            this.setState({ taxonomy_term_mode: taxonomy_term_mode });
            this.props.setAttributes({ taxonomy_term_mode: taxonomy_term_mode });
        }
    }, {
        key: 'update_date_restriction_mode',
        value: function update_date_restriction_mode(date_restriction_mode) {
            this.setState({ date_restriction_mode: date_restriction_mode });
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
            var options_site_list = [{ value: 0, label: __('Select a site'), disabled: true }];
            if (this.state.sites.length > 0) {
                this.state.sites.forEach(function (site) {
                    options_site_list.push({ value: site.value, label: site.label });
                });
            }

            var options_taxonomy_list = [{ value: '', label: __('Select a taxonomy'), disabled: true }]; // value must be empty string; if null, the value ends up being the label.
            if (this.state.taxonomies.length > 0) {
                this.state.taxonomies.forEach(function (taxonomy) {
                    options_taxonomy_list.push({ value: taxonomy.value, label: taxonomy.label });
                });
            }

            var options_terms_list = []; // { value: null, label: (this.props.attributes.taxonomy_term_mode ? __('Select terms to exclude' ) : __('Select terms to include') ), disabled: true,  } ];
            if (this.state.terms.length > 0) {
                this.state.terms.forEach(function (term) {
                    options_terms_list.push({ value: term.value, label: term.label });
                });
            }
            return [wp.element.createElement(
                InspectorControls,
                { key: 'inspector' },
                wp.element.createElement(
                    PanelBody,
                    {
                        title: 'News Block Controls',
                        initialOpen: true
                    },
                    wp.element.createElement(
                        PanelRow,
                        null,
                        wp.element.createElement(SelectControl, {
                            value: this.props.attributes.blog_id,
                            label: __('Select a site'),
                            options: options_site_list,
                            onChange: this.updateSite
                        })
                    ),
                    this.props.attributes.blog_id ? wp.element.createElement(
                        Fragment,
                        null,
                        wp.element.createElement(SelectControl, {
                            value: this.props.attributes.taxonomy,
                            label: __('Select a taxonomy'),
                            options: options_taxonomy_list,
                            onChange: this.updateTaxonomy
                        }),
                        this.props.attributes.taxonomy ? wp.element.createElement(
                            Fragment,
                            null,
                            wp.element.createElement(ToggleControl, {
                                label: this.props.attributes.taxonomy_term_mode ? 'Blacklist mode active' : 'Whitelist mode active',
                                checked: this.props.attributes.taxonomy_term_mode,
                                onChange: this.update_taxonomy_term_mode,
                                help: this.props.attributes.taxonomy_term_mode ? 'Exclude posts containing any of the specified terms' : 'Only include posts containing any of the specified terms'
                            }),
                            wp.element.createElement(SelectControl, {
                                value: this.props.attributes.selected_term_list,
                                label: this.props.attributes.taxonomy_term_mode ? __('Select terms to exclude') : __('Select terms to include'),
                                options: options_terms_list,
                                onChange: this.updateSelectedTerms,
                                multiple: true
                            })
                        ) : []
                    ) : [],
                    wp.element.createElement(ToggleControl, {
                        label: this.props.attributes.date_restriction_mode ? 'Specific date range' : 'Latest news',
                        checked: this.props.attributes.date_restriction_mode,
                        onChange: this.update_date_restriction_mode,
                        help: this.props.attributes.date_restriction_mode ? 'Show posts from a specific date range' : 'Show the most recent posts'
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
        blog_id: { type: 'number', default: 1 },
        taxonomy: { type: 'string', default: '' },
        taxonomy_term_mode: { type: 'boolean', default: false },
        selected_term_list: { type: 'array', default: [] },

        date_restriction_mode: { type: 'boolean', default: false },
        earliest_date: { type: 'date', default: null }, //@TODO does nothing
        latest_date: { type: 'date', default: null }, //@TODO does nothing
        max_news_articles: { type: 'number', default: 6 },
        max_excerpt_length: { type: 'number', default: 55 }
        //site: {type: 'number', default: 1},

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