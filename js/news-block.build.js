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
/***/ (function(module, exports, __webpack_require__) {

"use strict";


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
    Button = _wp$components.Button,
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
            var _this2 = this;

            return React.createElement(
                Fragment,
                null,
                React.createElement(SelectControl, {
                    value: this.props.blog_id,
                    label: __('Select a site'),
                    options: this.props.sites,
                    onChange: this.props.updateSite
                }),
                this.props.blog_id ? React.createElement(
                    Fragment,
                    null,
                    React.createElement(SelectControl, {
                        value: this.props.post_type,
                        label: __('Select a post type'),
                        options: this.props.post_types,
                        onChange: this.props.updatePostType
                    }),
                    this.props.post_type ? React.createElement(
                        Fragment,
                        null,
                        React.createElement(SelectControl, {
                            value: this.props.taxonomy,
                            label: __('Select a taxonomy'),
                            options: this.props.taxonomies,
                            onChange: this.props.updateTaxonomy
                        }),
                        this.props.taxonomy ? React.createElement(
                            Fragment,
                            null,
                            React.createElement(ToggleControl, {
                                label: this.props.taxonomy_term_mode ? 'Term filter (blacklist)' : 'Term filter (whitelist)',
                                checked: this.props.taxonomy_term_mode,
                                onChange: function onChange(value) {
                                    return _this2.props.update_taxonomy_term_mode(value);
                                },
                                help: this.props.taxonomy_term_mode ? 'Exclude posts containing any of the specified terms' : 'Only include posts containing any of the specified terms'
                            }),
                            React.createElement(SelectControl, {
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
            return React.createElement(TextControl, {
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
            return React.createElement(
                PanelBody,
                {
                    title: this.props.title,
                    initialOpen: true
                },
                React.createElement(ToggleControl, {
                    label: this.props.is_external ? 'Source (external)' : 'Source (internal)',
                    checked: this.props.is_external,
                    onChange: this.props.update_is_external,
                    help: this.props.is_external ? 'Get posts from an RSS feed' : 'Get posts from WordPress'
                }),
                !this.props.is_external ? React.createElement(News_block_component_internal, this.props) : React.createElement(News_block_component_external, this.props)
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
                sources: []
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

        var _this5 = _possibleConstructorReturn(this, (news_block.__proto__ || Object.getPrototypeOf(news_block)).apply(this, arguments));

        _this5.setSourceArrayState = function (source_index, which_array, array_values) {
            _this5.setState(function (previousState) {
                var sources = previousState.sources.map(function (single_source, index) {
                    if (source_index === index) {
                        // this is the source we want to change from the array of sources
                        single_source[which_array] = array_values;
                        return single_source;
                    } else {
                        // not our source, don't change it
                        return single_source;
                    }
                });
                return { sources: sources };
            });
        };

        _this5.insertIntoSourceArrayState = function () {
            var new_source_state = {
                sites: [{ value: 0, label: __('Loading sites...'), disabled: true }],
                post_types: [{ value: '', label: __('Loading post types...'), disabled: true }],
                taxonomies: [{ value: '', label: __('Loading taxonomies...'), disabled: true }],
                terms: [{ value: '', label: __('Loading terms...'), disabled: true }],

                enabled: true,
                is_external: false,
                rss_url: '',
                blog_id: 1,
                post_type: '',
                taxonomy: '',
                taxonomy_term_mode: false,
                selected_term_list: []

            };
            _this5.setState(function (previousState) {
                var state_sources = void 0;
                state_sources = previousState.sources.slice(0); // clone the array to modify it, so we don't mess it up
                state_sources.push(new_source_state);
                return { sources: state_sources };
            }, function () {
                // after adding a blank source, get the network sites and populate the first dropdown for the new source
                _this5.getSites(_this5.state.sources.length - 1);
            });
        };

        _this5.insertSource = function () {
            var new_source_attributes = {
                enabled: true,
                is_external: false,
                rss_url: '',
                blog_id: 1,
                post_type: '',
                taxonomy: '',
                taxonomy_term_mode: false,
                selected_term_list: []
            };
            var attributes_sources = void 0;
            attributes_sources = JSON.parse(JSON.stringify(_this5.state.sources));
            attributes_sources.push(new_source_attributes);

            // have to add a new entry in both the attributes (for server-side values) and the state (for temporary client-side values, like the list of sites)
            _this5.props.setAttributes({ sources: attributes_sources });
            _this5.insertIntoSourceArrayState();
        };

        _this5.deleteSource = function (index) {
            _this5.setState(function (previousState) {
                var remaining_sources_state = void 0;
                remaining_sources_state = previousState.sources.slice(0);
                remaining_sources_state.splice(index, 1);
                return { sources: remaining_sources_state };
            }), function () {
                var remaining_sources = void 0;
                remaining_sources = JSON.parse(JSON.stringify(_this5.state.sources));
                remaining_sources.splice(index, 1);
                _this5.props.setAttributes({ sources: remaining_sources });
            };
        };

        _this5.getSites = function (index) {
            _this5.setSourceArrayState(index, 'sites', [{ value: '', label: __('Loading sites...'), disabled: true }]);

            var promise_result = apiFetch({ path: 'schrauger/news-block/v1/get-sites/' }).then(function (sites) {
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

                _this5.setSourceArrayState(index, 'sites', options_site_list);

                if (_this5.state.sources[index].blog_id) {
                    _this5.getPostTypes(index, _this5.state.sources[index].blog_id);
                }
            });

            return promise_result;
        };

        _this5.getPostTypes = function (index, site) {

            _this5.setSourceArrayState(index, 'post_types', [{ value: '', label: __('Loading post types...'), disabled: true }]);
            _this5.setSourceArrayState(index, 'taxonomies', []);
            _this5.setSourceArrayState(index, 'terms', []);

            var path = 'schrauger/news-block/v1/';
            if (site) {
                path = path + 'site/' + site + '/';
            }
            path = path + 'get-post-types';

            var promise_result = apiFetch({ path: path }).then(function (post_types) {

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

                _this5.setSourceArrayState(index, 'post_types', options_post_type_list);

                if (_this5.state.sources[index].post_type) {
                    _this5.getTaxonomies(index, _this5.state.sources[index].post_type, site);
                }
            });

            return promise_result;
        };

        _this5.getTaxonomies = function (index, post_type, site) {

            _this5.setSourceArrayState(index, 'taxonomies', [{ value: '', label: __('Loading taxonomies...'), disabled: true }]);
            _this5.setSourceArrayState(index, 'terms', []);

            var path = 'schrauger/news-block/v1/';
            if (site) {
                path = path + 'site/' + site + '/';
            }
            if (post_type) {
                path = path + 'post-type/' + post_type + '/';
            }
            path = path + 'get-taxonomies';

            var promise_result = apiFetch({ path: path }).then(function (taxonomies) {

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

                _this5.setSourceArrayState(index, 'taxonomies', options_taxonomy_list);

                if (_this5.state.sources[index].taxonomy) {
                    _this5.getTerms(index, _this5.state.sources[index].taxonomy, site);
                }
            });

            return promise_result;
        };

        _this5.getTerms = function (index, taxonomy, site) {
            _this5.setSourceArrayState(index, 'terms', [{ value: '', label: __('Loading terms...'), disabled: true }]);

            var path = 'schrauger/news-block/v1/';
            if (site) {
                path = path + 'site/' + site + '/';
            }
            if (taxonomy) {
                path = path + 'taxonomy/' + taxonomy + '/';
            }
            path = path + 'get-terms';

            var promise_result = apiFetch({ path: path }).then(function (terms) {
                // load terms into multi-select list
                var options_terms_list = []; // { value: null, label: (this.props.attributes.taxonomy_term_mode ? __('Select terms to exclude' ) : __('Select terms to include') ), disabled: true,  } ];
                if (terms.length > 0) {
                    terms.forEach(function (term) {
                        options_terms_list.push({ value: term.value, label: term.label });
                    });
                } else {
                    options_terms_list.push({ value: '', label: __('No valid terms'), disabled: true });
                }
                _this5.setSourceArrayState(index, 'terms', options_terms_list);
            });

            return promise_result;
        };

        _this5.updateRSSUrl = function (rss_url) {
            _this5.props.setAttributes({ rss_url: rss_url });
        };

        _this5.updateAttributeSourceItem = function (index, dictionary) {
            var key = Object.keys(dictionary)[0];
            var value = Object.values(dictionary)[0];
            var sources = void 0;
            sources = _this5.state.sources.map(function (single_source, single_index) {
                if (index === single_index) {
                    single_source[key] = value;
                }
                return single_source;
            });
            //console.log(sources);
            //console.log(this.state);
            _this5.setState({ sources: sources });
            // don't push the dynamic lists to the server, as they get recomputed and don't need to be statically saved.
            var sources_without_lists = void 0;
            sources_without_lists = JSON.parse(JSON.stringify(sources)); // force a clone so we don't clobber state when setting server attributes
            sources_without_lists.map(function (single_source, single_index) {
                delete single_source['sites'];
                delete single_source['post_types'];
                delete single_source['taxonomies'];
                delete single_source['terms'];
                return single_source;
            });
            _this5.props.setAttributes({ sources: sources_without_lists });
        };

        _this5.updateSite = function (index, blog_id) {
            _this5.updateAttributeSourceItem(index, { blog_id: blog_id });
            _this5.getPostTypes(index, blog_id); // get new list of taxonomies after changing site
        };

        _this5.updatePostType = function (index, post_type) {
            _this5.updateAttributeSourceItem(index, { post_type: post_type });

            var blog_id = _this5.state.sources[index].blog_id;
            _this5.getTaxonomies(index, post_type, blog_id);
        };

        _this5.updateTaxonomy = function (index, taxonomy) {
            //        this.setState( { taxonomy: taxonomy });
            _this5.updateAttributeSourceItem(index, { taxonomy: taxonomy });

            // force reset of selected terms, and get new list of terms after changing taxonomy
            var blog_id = _this5.state.sources[index].blog_id;
            _this5.props.setAttributes({
                selected_term_list: []
            });
            _this5.getTerms(index, taxonomy, blog_id);
        };

        _this5.updateSelectedTerms = function (index, selected_term_list) {
            _this5.updateAttributeSourceItem(index, { selected_term_list: selected_term_list });
        };

        _this5.updateLatestDate = function (latest_date) {
            _this5.props.setAttributes({ latest_date: latest_date });
        };

        _this5.updateEarliestDate = function (earliest_date) {
            _this5.props.setAttributes({ earliest_date: earliest_date });
        };

        _this5.updateMaxNewsArticles = function (max_news_articles) {
            max_news_articles = parseInt(max_news_articles);
            _this5.props.setAttributes({ max_news_articles: max_news_articles });
        };

        _this5.updateMaxExcerptLength = function (max_excerpt_length) {
            max_excerpt_length = parseInt(max_excerpt_length);
            _this5.props.setAttributes({ max_excerpt_length: max_excerpt_length });
        };

        _this5.update_is_external = function (index, is_external) {
            _this5.updateAttributeSourceItem(index, { is_external: is_external });
        };

        _this5.update_taxonomy_term_mode = function (index, taxonomy_term_mode) {
            _this5.updateAttributeSourceItem(index, { taxonomy_term_mode: taxonomy_term_mode });
        };

        _this5.update_enabled_mode = function (index, enabled) {
            _this5.updateAttributeSourceItem(index, { enabled: enabled });
        };

        _this5.update_date_restriction_mode = function (date_restriction_mode) {
            _this5.props.setAttributes({ date_restriction_mode: date_restriction_mode });
        };

        _this5.state = _this5.constructor.getInitialState();

        // Need to bind 'this' to all of the methods (functions) of the news_block class. Listing them all individually started
        // to get long, so instead we request all the methods on the 'this' object, and then bind 'this' to them if they're
        // one of our 'get' or 'update' methods

        return _this5;
    }

    _createClass(news_block, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this6 = this;

            // for each source in the database, create a corresponding blank entry in state to hold lists of sites, terms, etc. then load the sites.
            if (this.state.sources.length > 0) {
                this.state.sources.map(function (single_source, index) {
                    _this6.insertIntoSourceArrayState();
                    _this6.getSites(index);
                    _this6.getPostTypes(index);
                    _this6.getTaxonomies(index);
                    _this6.getTerms(index);
                });
            } else {
                this.insertSource();
            }
        }

        /**
         * Sets the react state for a specified array within the 'sources' array
         * @param source_index
         * @param which_array
         * @param array_values
         */


        /**
         * Inserts a blank entry in the state for a single source. Use in combination with creating a new source, or when
         * loading the page (creating a blank entry for each source, then loading the data afterwards).
         */


        /**
         * When user clicks 'insert' button, this creates a new blank entry in the state and props.attributes for the dynamic and server data.
         * It then runs ajax to get the sites for the initial list of the blank entry.
         */


        /**
         * Updates an item within a specific source, stored in the attributes.
         * Specify the index of your source, and the {name:value} of the variable to save
         * @param index
         * @param dictionary key: value of the Item you want to update
         */


        /**
         * Update the site selection, and get post types for that site
         * @param index
         * @param blog_id
         */


        /**
         * Update the post type selection, and get taxonomies for that post type
         * @param index
         * @param post_type
         */

    }, {
        key: 'render',
        value: function render() {
            var _this7 = this;

            return [React.createElement(
                InspectorControls,
                { key: 'inspector' },
                React.createElement(
                    PanelBody,
                    {
                        title: 'News Block Controls',
                        initialOpen: true
                    },
                    React.createElement(ToggleControl, {
                        label: this.props.attributes.date_restriction_mode ? 'Date filter (enabled)' : 'Date filter (disabled)',
                        checked: this.props.attributes.date_restriction_mode,
                        onChange: this.update_date_restriction_mode,
                        help: this.props.attributes.date_restriction_mode ? 'Show posts from a specific date range' : 'Currently showing the most recent posts'
                    }),
                    this.props.attributes.date_restriction_mode ? React.createElement(
                        Fragment,
                        null,
                        React.createElement(TextControl, {
                            type: 'date',
                            value: this.props.attributes.earliest_date,
                            label: 'Earliest Date',
                            onChange: this.updateEarliestDate
                        }),
                        React.createElement(TextControl, {
                            type: 'date',
                            value: this.props.attributes.latest_date,
                            label: 'Latest Date',
                            onChange: this.updateLatestDate
                        })
                    ) : [],
                    React.createElement(TextControl, {
                        type: 'number',
                        value: this.props.attributes.max_news_articles,
                        label: 'Max news articles',
                        onChange: this.updateMaxNewsArticles,
                        min: 1,
                        max: 20,
                        step: 1
                    }),
                    React.createElement(TextControl, {
                        type: 'number',
                        value: this.props.attributes.max_excerpt_length,
                        label: 'Max excerpt word count',
                        onChange: this.updateMaxExcerptLength,
                        min: 0,
                        max: 100,
                        step: 1
                    })
                ),
                React.createElement(
                    PanelBody,
                    {
                        title: 'News Block Sources',
                        initialOpen: true
                    },
                    this.props.attributes.sources.length > 0 ? React.createElement(
                        Fragment,
                        null,
                        this.state.sources.map(function (source, key) {
                            return _this7.state.sources && _this7.state.sources[key] ? React.createElement(
                                Fragment,
                                { key: key },
                                React.createElement(
                                    PanelRow,
                                    { key: key },
                                    React.createElement(ToggleControl, {
                                        label: source.enabled ? 'Source ' + (key + 1) + ' Enabled' : 'Source ' + (key + 1) + ' Disabled',
                                        checked: source.enabled,
                                        onChange: function onChange(value) {
                                            _this7.update_enabled_mode(key, value);
                                        }
                                    })
                                ),
                                source.enabled ? [] : React.createElement(
                                    PanelRow,
                                    null,
                                    React.createElement(
                                        'a',
                                        { href: '#', onClick: function onClick(e) {
                                                e.preventDefault();
                                                e.stopPropagation();
                                                _this7.deleteSource(key);
                                            } },
                                        'Delete Source ' + (key + 1)
                                    )
                                )
                            ) : [];
                        })
                    ) : React.createElement(
                        PanelRow,
                        null,
                        'Add sources'
                    ),
                    React.createElement(
                        PanelRow,
                        null,
                        React.createElement(
                            'button',
                            { onClick: this.insertSource },
                            'Add new'
                        )
                    )
                ),
                this.props.attributes.sources.length > 0 ? React.createElement(
                    Fragment,
                    null,
                    this.state.sources.map(function (source, key) {
                        //console.log(source);
                        return _this7.state.sources && _this7.state.sources[key] && _this7.state.sources[key].sites && source.enabled ? React.createElement(News_block_component, {
                            key: key,
                            map_key: key // react doesn't let child components see the special 'key' property, so we pass it a second time to a different prop they can use

                            , title: 'Source #' + (key + 1) + ' properties',

                            is_external: source.is_external,
                            update_is_external: function update_is_external(value) {
                                _this7.update_is_external(key, value);
                            },

                            blog_id: source.blog_id,
                            sites: _this7.state.sources[key].sites,
                            updateSite: function updateSite(value) {
                                _this7.updateSite(key, value);
                            },

                            post_type: source.post_type,
                            post_types: _this7.state.sources[key].post_types,
                            updatePostType: function updatePostType(value) {
                                _this7.updatePostType(key, value);
                            },

                            taxonomy: source.taxonomy,
                            taxonomies: _this7.state.sources[key].taxonomies,
                            updateTaxonomy: function updateTaxonomy(value) {
                                _this7.updateTaxonomy(key, value);
                            },

                            taxonomy_term_mode: source.taxonomy_term_mode,
                            update_taxonomy_term_mode: function update_taxonomy_term_mode(value) {
                                _this7.update_taxonomy_term_mode(key, value);
                            },

                            selected_term_list: source.selected_term_list,
                            terms: _this7.state.sources[key].terms,
                            updateSelectedTerms: function updateSelectedTerms(value) {
                                _this7.updateSelectedTerms(key, value);
                            }

                            //                                rss_url={source.props.attributes.rss_url}
                            //                                updateRSSUrl={(value) => {
                            //                                    this.updateRSSUrl(value, key)
                            //                                }}

                        }) : React.createElement(
                            'div',
                            null,
                            'No active sources'
                        );
                    })
                ) : []
            ), React.createElement(
                'div',
                {
                    className: 'overlaypage',
                    onClickCapture: this.constructor.preventLink },
                React.createElement(ServerSideRender, {
                    block: 'schrauger/news-block',
                    attributes: this.props.attributes
                })
            )];
        }
    }], [{
        key: 'preventLink',


        /**
         * Prevents users from clicking away from editor by clicking on a link in the server rendered post list.
         * @param event
         */
        value: function preventLink(event) {
            if (event.nativeEvent) {
                event.nativeEvent.preventDefault();
                event.nativeEvent.stopPropagation();
            }
            event.preventDefault();
            event.stopPropagation();
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
        sources: {
            type: 'array',
            default: [{
                enabled: true,
                is_external: false,
                rss_url: '',
                blog_id: 1,
                post_type: '',
                taxonomy: '',
                taxonomy_term_mode: false,
                selected_term_list: []
            }]
        },
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