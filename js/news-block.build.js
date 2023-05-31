/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};
/*!**************************!*\
  !*** ./js/news-block.js ***!
  \**************************/


var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

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

var _wp = wp,
    ServerSideRender = _wp.serverSideRender; // 1.6.0 WordPress moved this component outside the wp.components into the parent wp.

var _wp$components = wp.components,
    TextControl = _wp$components.TextControl,
    SelectControl = _wp$components.SelectControl,
    Button = _wp$components.Button,
    PanelBody = _wp$components.PanelBody,
    PanelRow = _wp$components.PanelRow,
    ToggleControl = _wp$components.ToggleControl,
    URLInputButton = _wp$components.URLInputButton; //Block inspector wrapper

var _wp$data = wp.data,
    registerStore = _wp$data.registerStore,
    withSelect = _wp$data.withSelect; // used to run json requests for wordpress data (blogs, taxonomies)

var __ = wp.i18n.__;
var _wp2 = wp,
    apiFetch = _wp2.apiFetch;

var News_block_component_internal = function (_Component) {
    _inherits(News_block_component_internal, _Component);

    function News_block_component_internal() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, News_block_component_internal);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = News_block_component_internal.__proto__ || Object.getPrototypeOf(News_block_component_internal)).call.apply(_ref, [this].concat(args))), _this), _this.render = function () {
            return React.createElement(
                Fragment,
                null,
                React.createElement(SelectControl, {
                    value: _this.props.blog_id,
                    label: __('Select a site'),
                    options: _this.props.sites,
                    onChange: _this.props.updateSite
                }),
                _this.props.blog_id ? React.createElement(
                    Fragment,
                    null,
                    React.createElement(SelectControl, {
                        value: _this.props.post_type,
                        label: __('Select a post type'),
                        options: _this.props.post_types,
                        onChange: _this.props.updatePostType
                    }),
                    _this.props.post_type ? React.createElement(
                        Fragment,
                        null,
                        React.createElement(SelectControl, {
                            value: _this.props.taxonomy,
                            label: __('Select a taxonomy'),
                            options: _this.props.taxonomies,
                            onChange: _this.props.updateTaxonomy
                        }),
                        _this.props.taxonomy ? React.createElement(
                            Fragment,
                            null,
                            React.createElement(ToggleControl, {
                                label: _this.props.taxonomy_term_mode ? 'Term filter (blacklist)' : 'Term filter (whitelist)',
                                checked: _this.props.taxonomy_term_mode,
                                onChange: function onChange(value) {
                                    return _this.props.update_taxonomy_term_mode(value);
                                },
                                help: _this.props.taxonomy_term_mode ? 'Exclude posts containing any of the specified terms' : 'Only include posts containing any of the specified terms'
                            }),
                            React.createElement(SelectControl, {
                                value: _this.props.selected_term_list,
                                label: _this.props.taxonomy_term_mode ? __('Select terms to exclude') : __('Select terms to include'),
                                options: _this.props.terms,
                                onChange: _this.props.updateSelectedTerms,
                                multiple: true,
                                className: 'term-selector'
                            })
                        ) : []
                    ) : []
                ) : []
            );
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

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
        var _ref2;

        var _temp2, _this3, _ret2;

        _classCallCheck(this, News_block_component);

        for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            args[_key2] = arguments[_key2];
        }

        return _ret2 = (_temp2 = (_this3 = _possibleConstructorReturn(this, (_ref2 = News_block_component.__proto__ || Object.getPrototypeOf(News_block_component)).call.apply(_ref2, [this].concat(args))), _this3), _this3.autoOpen = function () {
            if (_this3.props.is_external == false && _this3.props.selected_term_list.length > 0) {
                // internal source that has already been configured. don't auto-open the properties
                return false;
            }
            if (_this3.props.is_external == true && _this3.props.rss_url.length > 0) {
                // external source that has already been configures. don't auto-open the properties
                return false;
            }
            // new or unconfigured source. auto-open the properties.
            return true;
        }, _temp2), _possibleConstructorReturn(_this3, _ret2);
    }

    _createClass(News_block_component, [{
        key: 'render',
        value: function render() {
            return React.createElement(
                PanelBody,
                {
                    title: this.props.title,
                    initialOpen: this.autoOpen()

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

        var _this4 = _possibleConstructorReturn(this, (news_block.__proto__ || Object.getPrototypeOf(news_block)).apply(this, arguments));

        _this4.insertIntoSourceArrayState = function () {
            var single_source = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

            var new_source_state = {
                sites: [{ value: 0, label: __('Loading sites...'), disabled: true }],
                post_types: [{ value: '', label: __('Loading post types...'), disabled: true }],
                taxonomies: [{ value: '', label: __('Loading taxonomies...'), disabled: true }],
                terms: [{ value: '', label: __('Loading terms...'), disabled: true }],
                source_enabled: true,
                is_external: false,
                rss_url: '',
                blog_id: 1,
                post_type: '',
                taxonomy: '',
                taxonomy_term_mode: false,
                selected_term_list: []

            };
            //console.log(single_source);
            new_source_state = _this4.constructor.attributesMerge(new_source_state, single_source);
            //console.log(new_source_state);
            _this4.setState(function (previousState) {
                var state_sources = void 0;
                state_sources = previousState.sources.slice(0); // clone the array to modify it, so we don't mess it up
                state_sources.push(new_source_state);
                return { sources: state_sources };
            }, function () {
                // after adding a blank source, get the network sites and populate the first dropdown for the new source
                _this4.getSites(_this4.state.sources.length - 1);
            });
        };

        _this4.insertSource = function () {
            var new_source_attributes = {
                source_enabled: true,
                is_external: false,
                rss_url: '',
                blog_id: 1,
                post_type: '',
                taxonomy: '',
                taxonomy_term_mode: false,
                selected_term_list: []
            };
            var attributes_sources = void 0;
            attributes_sources = JSON.parse(JSON.stringify(_this4.state.sources));
            attributes_sources.map(function (single_source, single_index) {
                delete single_source['sites'];
                delete single_source['post_types'];
                delete single_source['taxonomies'];
                delete single_source['terms'];
                return single_source;
            });
            attributes_sources.push(new_source_attributes);

            // have to add a new entry in both the attributes (for server-side values) and the state (for temporary client-side values, like the list of sites)
            _this4.props.setAttributes({ sources: attributes_sources });
            _this4.insertIntoSourceArrayState();
        };

        _this4.deleteSource = function (index) {
            _this4.setState(function (previousState) {
                var remaining_sources_state = void 0;
                remaining_sources_state = JSON.parse(JSON.stringify(previousState.sources));
                remaining_sources_state.splice(index, 1);
                return { sources: remaining_sources_state };
            }, function () {
                var remaining_sources = void 0;
                remaining_sources = JSON.parse(JSON.stringify(_this4.state.sources));
                _this4.props.setAttributes({ sources: remaining_sources });
            });
        };

        _this4.getSites = function (index) {
            _this4.setSourceArrayState(index, 'sites', [{ value: '', label: __('Loading sites...'), disabled: true }]);

            var promise_result = apiFetch({ path: 'schrauger/news-block/v1/get-sites/' }).then(function (sites) {
                // load sites into select list
                var options_site_list = [];
                if (sites.length > 0) {
                    options_site_list.push({ value: 0, label: __('Select a site'), disabled: false });
                    sites.forEach(function (site) {
                        options_site_list.push({ value: site.value, label: site.label });
                    });
                } else {
                    options_site_list.push({ value: 0, label: __('No valid sites'), disabled: true });
                }

                _this4.setSourceArrayState(index, 'sites', options_site_list);

                if (_this4.state.sources[index].blog_id) {
                    _this4.getPostTypes(index, _this4.state.sources[index].blog_id);
                }
            });

            return promise_result;
        };

        _this4.getPostTypes = function (index, site) {
            _this4.setSourceArrayState(index, 'post_types', [{ value: '', label: __('Loading post types...'), disabled: true }]);
            _this4.setSourceArrayState(index, 'taxonomies', []);
            _this4.setSourceArrayState(index, 'terms', []);

            var path = 'schrauger/news-block/v1/';
            if (site) {
                path = path + 'site/' + site + '/';
            }
            path = path + 'get-post-types';

            var promise_result = apiFetch({ path: path }).then(function (post_types) {

                // load post types into select list
                var options_post_type_list = [];
                if (post_types.length > 0) {
                    options_post_type_list.push({ value: '', label: __('Select a post type'), disabled: false });
                    // don't mark this as disabled. otherwise, if a new site is selected, the old post type selected
                    // might not exist in the new site, causing react to be unable to detect onchange with a single option.
                    // ex: site 1, post_type person. changed to site 2, which has no person posttype but has a single news type.
                    //     news is auto selected (as it's the only non-disabled option), but it doesn't trigger the onChange.
                    //     And onChange can't be triggered since it's the only option and thus won't change with a user input.
                    //     By leaving this empty "Select a ..." option as enabled, that instead becomes the autoselected one,
                    //     and the user can thus select the single other option in the list, triggering onChange events.

                    post_types.forEach(function (post_type) {
                        options_post_type_list.push({ value: post_type.value, label: post_type.label });
                    });
                } else {
                    options_post_type_list.push({ value: '', label: __('No valid post types'), disabled: true });
                }

                _this4.setSourceArrayState(index, 'post_types', options_post_type_list);

                if (_this4.state.sources[index].post_type) {
                    _this4.getTaxonomies(index, _this4.state.sources[index].post_type, site);
                }
            });

            return promise_result;
        };

        _this4.getTaxonomies = function (index, post_type, site) {
            _this4.setSourceArrayState(index, 'taxonomies', [{ value: '', label: __('Loading taxonomies...'), disabled: true }]);
            _this4.setSourceArrayState(index, 'terms', []);

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
                    options_taxonomy_list.push({ value: '', label: __('Select a taxonomy'), disabled: false }); // value must be empty string; if null, the value ends up being the label.

                    taxonomies.forEach(function (taxonomy) {
                        options_taxonomy_list.push({ value: taxonomy.value, label: taxonomy.label });
                    });
                } else {
                    options_taxonomy_list = [{ value: '', label: __('No valid taxonomies'), disabled: true }];
                }

                _this4.setSourceArrayState(index, 'taxonomies', options_taxonomy_list);

                if (_this4.state.sources[index].taxonomy) {
                    _this4.getTerms(index, _this4.state.sources[index].taxonomy, site);
                }
            });

            return promise_result;
        };

        _this4.getTerms = function (index, taxonomy, site) {
            _this4.setSourceArrayState(index, 'terms', [{ value: '', label: __('Loading terms...'), disabled: true }]);

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
                _this4.setSourceArrayState(index, 'terms', options_terms_list);
            });

            return promise_result;
        };

        _this4.setSourceArrayState = function (source_index, which_array, array_values) {
            _this4.setState(function (previousState) {
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

        _this4.updateAttributeSourceItem = function (index, dictionary) {
            var key = Object.keys(dictionary)[0];
            var value = Object.values(dictionary)[0];
            var sources = void 0;
            sources = _this4.state.sources.map(function (single_source, single_index) {
                if (index === single_index) {
                    single_source[key] = value;
                }
                return single_source;
            });

            _this4.setState({ sources: sources });
            //console.log(sources);
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
            _this4.props.setAttributes({ sources: sources_without_lists });
        };

        _this4.updateRSSUrl = function (index, rss_url) {
            _this4.updateAttributeSourceItem(index, { rss_url: rss_url });
        };

        _this4.updateSite = function (index, blog_id) {
            _this4.updateAttributeSourceItem(index, { blog_id: blog_id });
            _this4.getPostTypes(index, blog_id); // get new list of taxonomies after changing site
        };

        _this4.updatePostType = function (index, post_type) {
            _this4.updateAttributeSourceItem(index, { post_type: post_type });

            var blog_id = _this4.state.sources[index].blog_id;
            _this4.getTaxonomies(index, post_type, blog_id);
        };

        _this4.updateTaxonomy = function (index, taxonomy) {
            //        this.setState( { taxonomy: taxonomy });
            _this4.updateAttributeSourceItem(index, { taxonomy: taxonomy });

            // force reset of selected terms, and get new list of terms after changing taxonomy
            var blog_id = _this4.state.sources[index].blog_id;
            _this4.props.setAttributes({
                selected_term_list: []
            });
            _this4.getTerms(index, taxonomy, blog_id);
        };

        _this4.updateSelectedTerms = function (index, selected_term_list) {
            _this4.updateAttributeSourceItem(index, { selected_term_list: selected_term_list });
        };

        _this4.updateLatestDate = function (latest_date) {
            _this4.props.setAttributes({ latest_date: latest_date });
        };

        _this4.updateEarliestDate = function (earliest_date) {
            _this4.props.setAttributes({ earliest_date: earliest_date });
        };

        _this4.updateMaxNewsArticles = function (max_news_articles) {
            max_news_articles = parseInt(max_news_articles);
            _this4.props.setAttributes({ max_news_articles: max_news_articles });
        };

        _this4.updateMaxExcerptLength = function (max_excerpt_length) {
            max_excerpt_length = parseInt(max_excerpt_length);
            _this4.props.setAttributes({ max_excerpt_length: max_excerpt_length });
        };

        _this4.update_is_external = function (index, is_external) {
            _this4.updateAttributeSourceItem(index, { is_external: is_external });
        };

        _this4.update_taxonomy_term_mode = function (index, taxonomy_term_mode) {
            _this4.updateAttributeSourceItem(index, { taxonomy_term_mode: taxonomy_term_mode });
        };

        _this4.update_enabled_mode = function (index, source_enabled) {
            _this4.updateAttributeSourceItem(index, { source_enabled: source_enabled });
        };

        _this4.update_text_only_mode = function (text_only_mode) {
            _this4.props.setAttributes({ text_only_mode: text_only_mode });
        };

        _this4.update_date_restriction_mode = function (date_restriction_mode) {
            _this4.props.setAttributes({ date_restriction_mode: date_restriction_mode });
        };

        _this4.state = _this4.constructor.getInitialState();

        // Need to bind 'this' to all of the methods (functions) of the news_block class. Listing them all individually started
        // to get long, so instead we request all the methods on the 'this' object, and then bind 'this' to them if they're
        // one of our 'get' or 'update' methods

        return _this4;
    }

    _createClass(news_block, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this5 = this;

            //console.log(this.props.attributes.sources);
            // for each source in the database, create a corresponding blank entry in state to hold lists of sites, terms, etc. then load the sites.
            if (this.props.attributes.sources.length > 0) {
                this.props.attributes.sources.map(function (single_source, index) {
                    _this5.insertIntoSourceArrayState(single_source);
                    _this5.getSites(index);
                    _this5.getPostTypes(index);
                    _this5.getTaxonomies(index);
                    _this5.getTerms(index);
                });
            } else {
                this.insertSource();
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _this6 = this;

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
                        label: this.props.attributes.text_only_mode ? 'Text-only mode (enabled)' : 'Text-only mode (disabled)',
                        checked: this.props.attributes.text_only_mode,
                        onChange: this.update_text_only_mode,
                        help: this.props.attributes.text_only_mode ? 'Hide images from output' : 'Show images in output'
                    }),
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
                            return _this6.state.sources && _this6.state.sources[key] ? React.createElement(
                                Fragment,
                                { key: key },
                                React.createElement(
                                    PanelRow,
                                    { key: key },
                                    React.createElement(ToggleControl, {
                                        label: source.source_enabled ? 'Source #' + (key + 1) + ' Enabled' : 'Source ' + (key + 1) + ' Disabled',
                                        checked: source.source_enabled,
                                        onChange: function onChange(value) {
                                            _this6.update_enabled_mode(key, value);
                                        }
                                    })
                                ),
                                source.source_enabled ? [] : React.createElement(
                                    PanelRow,
                                    null,
                                    React.createElement(
                                        'a',
                                        { href: '#', onClick: function onClick(e) {
                                                e.preventDefault();
                                                e.stopPropagation();
                                                _this6.deleteSource(key);
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
                            'Add another source'
                        )
                    )
                ),
                this.props.attributes.sources.length > 0 ? React.createElement(
                    Fragment,
                    null,
                    this.state.sources.map(function (source, key) {
                        return [React.createElement(News_block_component, {
                            key: key,
                            map_key: key // react doesn't let child components see the special 'key' property, so we pass it a second time to a different prop they can use

                            , title: 'Source #' + (key + 1) + ' properties',

                            is_external: source.is_external,
                            update_is_external: function update_is_external(value) {
                                _this6.update_is_external(key, value);
                            },

                            blog_id: source.blog_id,
                            sites: _this6.state.sources[key].sites,
                            updateSite: function updateSite(value) {
                                _this6.updateSite(key, value);
                            },

                            post_type: source.post_type,
                            post_types: _this6.state.sources[key].post_types,
                            updatePostType: function updatePostType(value) {
                                _this6.updatePostType(key, value);
                            },

                            taxonomy: source.taxonomy,
                            taxonomies: _this6.state.sources[key].taxonomies,
                            updateTaxonomy: function updateTaxonomy(value) {
                                _this6.updateTaxonomy(key, value);
                            },

                            taxonomy_term_mode: source.taxonomy_term_mode,
                            update_taxonomy_term_mode: function update_taxonomy_term_mode(value) {
                                _this6.update_taxonomy_term_mode(key, value);
                            },

                            selected_term_list: source.selected_term_list,
                            terms: _this6.state.sources[key].terms,
                            updateSelectedTerms: function updateSelectedTerms(value) {
                                _this6.updateSelectedTerms(key, value);
                            },

                            rss_url: source.rss_url,
                            updateRSSUrl: function updateRSSUrl(value) {
                                _this6.updateRSSUrl(key, value);
                            }

                        })];
                    })
                ) : React.createElement(
                    'div',
                    null,
                    'No active sources'
                )
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
        key: 'attributesMerge',
        value: function attributesMerge(defaults, options) {
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = Object.entries(defaults)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var _ref3 = _step.value;

                    var _ref4 = _slicedToArray(_ref3, 2);

                    var key = _ref4[0];
                    var value = _ref4[1];

                    if (options[key] !== undefined && options[key] !== null) {
                        defaults[key] = options[key]; // if array passed in has a value set for one of our defaults, copy the value over. otherwise, ignore that extra key-value pair.
                    }
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }

            return defaults;
        }

        /**
         * Inserts a blank entry in the state for a single source. Use in combination with creating a new source, or when
         * loading the page (creating a blank entry for each source, then loading the data afterwards).
         */


        /**
         * When user clicks 'insert' button, this creates a new blank entry in the state and props.attributes for the dynamic and server data.
         * It then runs ajax to get the sites for the initial list of the blank entry.
         */


        /**
         * Loads a list of taxonomies for the specific source, optionally based on the post_type and site
         * @param index
         * @param post_type
         * @param site
         * @returns {*}
         */


        /**
         * Loads a list of terms for the specific source, optionally based on the taxonomy and site
         * @param index
         * @param taxonomy
         * @param site
         * @returns {*}
         */


        /**
         * Sets the react state for a specified array within the 'sources' array. Used to update the list of sites, post_types, taxonomies, and terms
         * @param source_index
         * @param which_array
         * @param array_values
         */


        /**
         * Updates an item within a specific source, stored in the attributes.
         * Specify the index of your source, and the {name:value} of the variable to save
         * @param index
         * @param dictionary key: value of the Item you want to update
         */


        /**
         * For external sources, the only thing we care about is the rss url
         * @param index
         * @param rss_url
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
    icon: 'welcome-widgets-menus',
    category: 'embed',
    attributes: {
        // need ability for two or more sources. probably repeating field.
        // one source option is local, and then you choose the blog (generally 1 ie main blog)
        // another source is local and must be an rss feed. use url parameters to filter external news
        sources: {
            type: 'array',
            default: [{
                source_enabled: true,
                is_external: true,
                rss_url: '',
                blog_id: 1,
                post_type: '',
                taxonomy: '',
                taxonomy_term_mode: false,
                selected_term_list: []
            }]
        },
        text_only_mode: { type: 'boolean', default: false },
        date_restriction_mode: { type: 'boolean', default: false },
        earliest_date: { type: 'date', default: null },
        latest_date: { type: 'date', default: null },
        max_news_articles: { type: 'number', default: 5 },
        max_excerpt_length: { type: 'number', default: 55 }
    },

    edit: news_block,

    save: function save(_ref5) {
        var props = _ref5.props,
            className = _ref5.className;


        // this can simply return 'null', which tells wordpress to just save the input attributes.
        // however, by actually saving the html, this saves the html in the database as well, which means
        // that our plugin can be disabled and the old pages will still have iframe html. however, if an unprivileged
        // user edits that page, the iframe code will be stripped out upon saving.
        // due to the html filtering, this return is not strictly used, as the server-side render method overwrites
        // this when printing onto the page (but that allows us to print out raw html without filtering, regardless of user).
        return null;
    }
});
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFQO0FBQ0g7QUEzQ21CLENBRDVCLEUiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9uZXdzLWJsb2NrLy4vanMvbmV3cy1ibG9jay5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCB7cmVnaXN0ZXJCbG9ja1R5cGV9ID0gd3AuYmxvY2tzOyAvL0Jsb2NrcyBBUElcbmNvbnN0IHtcbiAgICBjcmVhdGVFbGVtZW50LFxuICAgIENvbXBvbmVudCxcbiAgICBGcmFnbWVudFxufSA9IHdwLmVsZW1lbnQ7IC8vUmVhY3QuY3JlYXRlRWxlbWVudFxuY29uc3Qge0luc3BlY3RvckNvbnRyb2xzfSA9IHdwLmVkaXRvcjsgLy9CbG9jayBpbnNwZWN0b3Igd3JhcHBlclxuY29uc3QgeyBzZXJ2ZXJTaWRlUmVuZGVyOiBTZXJ2ZXJTaWRlUmVuZGVyIH0gPSB3cDsgLy8gMS42LjAgV29yZFByZXNzIG1vdmVkIHRoaXMgY29tcG9uZW50IG91dHNpZGUgdGhlIHdwLmNvbXBvbmVudHMgaW50byB0aGUgcGFyZW50IHdwLlxuY29uc3Qge1xuICAgIFRleHRDb250cm9sLFxuICAgIFNlbGVjdENvbnRyb2wsXG4gICAgQnV0dG9uLFxuICAgIFBhbmVsQm9keSxcbiAgICBQYW5lbFJvdyxcbiAgICBUb2dnbGVDb250cm9sLFxuICAgIFVSTElucHV0QnV0dG9uXG59ID0gd3AuY29tcG9uZW50czsgLy9CbG9jayBpbnNwZWN0b3Igd3JhcHBlclxuY29uc3Qge3JlZ2lzdGVyU3RvcmUsIHdpdGhTZWxlY3QsfSA9IHdwLmRhdGE7IC8vIHVzZWQgdG8gcnVuIGpzb24gcmVxdWVzdHMgZm9yIHdvcmRwcmVzcyBkYXRhIChibG9ncywgdGF4b25vbWllcylcbmNvbnN0IHtfX30gPSB3cC5pMThuO1xuY29uc3Qge2FwaUZldGNofSA9IHdwO1xuXG5jbGFzcyBOZXdzX2Jsb2NrX2NvbXBvbmVudF9pbnRlcm5hbCBleHRlbmRzIENvbXBvbmVudCB7XG5cbiAgICByZW5kZXIgPSAoKSA9PiAoXG4gICAgICAgIDxGcmFnbWVudD5cbiAgICAgICAgICAgIDxTZWxlY3RDb250cm9sXG4gICAgICAgICAgICAgICAgdmFsdWU9e3RoaXMucHJvcHMuYmxvZ19pZH1cbiAgICAgICAgICAgICAgICBsYWJlbD17X18oJ1NlbGVjdCBhIHNpdGUnKX1cbiAgICAgICAgICAgICAgICBvcHRpb25zPXt0aGlzLnByb3BzLnNpdGVzfVxuICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLnByb3BzLnVwZGF0ZVNpdGV9XG4gICAgICAgICAgICAvPlxuXG4gICAgICAgICAgICB7KHRoaXMucHJvcHMuYmxvZ19pZCkgP1xuICAgICAgICAgICAgICAgIDxGcmFnbWVudD5cbiAgICAgICAgICAgICAgICAgICAgPFNlbGVjdENvbnRyb2xcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlPXt0aGlzLnByb3BzLnBvc3RfdHlwZX1cbiAgICAgICAgICAgICAgICAgICAgICAgIGxhYmVsPXtfXygnU2VsZWN0IGEgcG9zdCB0eXBlJyl9XG4gICAgICAgICAgICAgICAgICAgICAgICBvcHRpb25zPXt0aGlzLnByb3BzLnBvc3RfdHlwZXN9XG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17dGhpcy5wcm9wcy51cGRhdGVQb3N0VHlwZX1cbiAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgeyh0aGlzLnByb3BzLnBvc3RfdHlwZSkgP1xuICAgICAgICAgICAgICAgICAgICAgICAgPEZyYWdtZW50PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxTZWxlY3RDb250cm9sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlPXt0aGlzLnByb3BzLnRheG9ub215fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYWJlbD17X18oJ1NlbGVjdCBhIHRheG9ub215Jyl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbnM9e3RoaXMucHJvcHMudGF4b25vbWllc31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9e3RoaXMucHJvcHMudXBkYXRlVGF4b25vbXl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7KHRoaXMucHJvcHMudGF4b25vbXkpID9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPEZyYWdtZW50PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPFRvZ2dsZUNvbnRyb2xcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYWJlbD17KHRoaXMucHJvcHMudGF4b25vbXlfdGVybV9tb2RlID8gJ1Rlcm0gZmlsdGVyIChibGFja2xpc3QpJyA6ICdUZXJtIGZpbHRlciAod2hpdGVsaXN0KScpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoZWNrZWQ9e3RoaXMucHJvcHMudGF4b25vbXlfdGVybV9tb2RlfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsodmFsdWUpID0+IHRoaXMucHJvcHMudXBkYXRlX3RheG9ub215X3Rlcm1fbW9kZSh2YWx1ZSl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVscD17dGhpcy5wcm9wcy50YXhvbm9teV90ZXJtX21vZGUgPyAnRXhjbHVkZSBwb3N0cyBjb250YWluaW5nIGFueSBvZiB0aGUgc3BlY2lmaWVkIHRlcm1zJyA6ICdPbmx5IGluY2x1ZGUgcG9zdHMgY29udGFpbmluZyBhbnkgb2YgdGhlIHNwZWNpZmllZCB0ZXJtcyd9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPFNlbGVjdENvbnRyb2xcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZT17dGhpcy5wcm9wcy5zZWxlY3RlZF90ZXJtX2xpc3R9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFiZWw9eyh0aGlzLnByb3BzLnRheG9ub215X3Rlcm1fbW9kZSA/IF9fKCdTZWxlY3QgdGVybXMgdG8gZXhjbHVkZScpIDogX18oJ1NlbGVjdCB0ZXJtcyB0byBpbmNsdWRlJykpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbnM9e3RoaXMucHJvcHMudGVybXN9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9e3RoaXMucHJvcHMudXBkYXRlU2VsZWN0ZWRUZXJtc31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtdWx0aXBsZT17dHJ1ZX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9J3Rlcm0tc2VsZWN0b3InXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0ZyYWdtZW50PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtdXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgPC9GcmFnbWVudD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDpcbiAgICAgICAgICAgICAgICAgICAgICAgIFtdXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICA8L0ZyYWdtZW50PlxuICAgICAgICAgICAgICAgIDpcbiAgICAgICAgICAgICAgICBbXVxuXG4gICAgICAgICAgICB9XG4gICAgICAgIDwvRnJhZ21lbnQ+XG4gICAgKTtcbn1cblxuY2xhc3MgTmV3c19ibG9ja19jb21wb25lbnRfZXh0ZXJuYWwgZXh0ZW5kcyBDb21wb25lbnQge1xuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxUZXh0Q29udHJvbFxuICAgICAgICAgICAgICAgIHR5cGU9eydzdHJpbmcnfVxuICAgICAgICAgICAgICAgIHZhbHVlPXt0aGlzLnByb3BzLnJzc191cmx9XG4gICAgICAgICAgICAgICAgbGFiZWw9eydSU1MgVXJsJ31cbiAgICAgICAgICAgICAgICBvbkNoYW5nZT17dGhpcy5wcm9wcy51cGRhdGVSU1NVcmx9XG4gICAgICAgICAgICAvPlxuICAgICAgICApXG4gICAgfVxufVxuXG5cbi8vIG5vdGU6IFJlYWN0IGNvbXBvbmVudHMgbXVzdCBzdGFydCB3aXRoIGEgQ2FwaXRhbCBsZXR0ZXJcbmNsYXNzIE5ld3NfYmxvY2tfY29tcG9uZW50IGV4dGVuZHMgQ29tcG9uZW50IHtcblxuICAgIGF1dG9PcGVuID0gKCkgPT4ge1xuICAgICAgICBpZiAoKHRoaXMucHJvcHMuaXNfZXh0ZXJuYWwgPT0gZmFsc2UpICYmICh0aGlzLnByb3BzLnNlbGVjdGVkX3Rlcm1fbGlzdC5sZW5ndGggPiAwKSkge1xuICAgICAgICAgICAgLy8gaW50ZXJuYWwgc291cmNlIHRoYXQgaGFzIGFscmVhZHkgYmVlbiBjb25maWd1cmVkLiBkb24ndCBhdXRvLW9wZW4gdGhlIHByb3BlcnRpZXNcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoKHRoaXMucHJvcHMuaXNfZXh0ZXJuYWwgPT0gdHJ1ZSkgJiYgKHRoaXMucHJvcHMucnNzX3VybC5sZW5ndGggPiAwKSkge1xuICAgICAgICAgICAgLy8gZXh0ZXJuYWwgc291cmNlIHRoYXQgaGFzIGFscmVhZHkgYmVlbiBjb25maWd1cmVzLiBkb24ndCBhdXRvLW9wZW4gdGhlIHByb3BlcnRpZXNcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICAvLyBuZXcgb3IgdW5jb25maWd1cmVkIHNvdXJjZS4gYXV0by1vcGVuIHRoZSBwcm9wZXJ0aWVzLlxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8UGFuZWxCb2R5XG4gICAgICAgICAgICAgICAgdGl0bGU9e3RoaXMucHJvcHMudGl0bGV9XG4gICAgICAgICAgICAgICAgaW5pdGlhbE9wZW49e3RoaXMuYXV0b09wZW4oKX1cblxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIDxUb2dnbGVDb250cm9sXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsPXsodGhpcy5wcm9wcy5pc19leHRlcm5hbCA/ICdTb3VyY2UgKGV4dGVybmFsKScgOiAnU291cmNlIChpbnRlcm5hbCknKX1cbiAgICAgICAgICAgICAgICAgICAgY2hlY2tlZD17dGhpcy5wcm9wcy5pc19leHRlcm5hbH1cbiAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9e3RoaXMucHJvcHMudXBkYXRlX2lzX2V4dGVybmFsfVxuICAgICAgICAgICAgICAgICAgICBoZWxwPXt0aGlzLnByb3BzLmlzX2V4dGVybmFsID8gJ0dldCBwb3N0cyBmcm9tIGFuIFJTUyBmZWVkJyA6ICdHZXQgcG9zdHMgZnJvbSBXb3JkUHJlc3MnfVxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgeyghdGhpcy5wcm9wcy5pc19leHRlcm5hbCkgP1xuXG4gICAgICAgICAgICAgICAgICAgIDxOZXdzX2Jsb2NrX2NvbXBvbmVudF9pbnRlcm5hbFxuICAgICAgICAgICAgICAgICAgICAgICAgey4uLnRoaXMucHJvcHN9XG4gICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgIDpcbiAgICAgICAgICAgICAgICAgICAgPE5ld3NfYmxvY2tfY29tcG9uZW50X2V4dGVybmFsXG4gICAgICAgICAgICAgICAgICAgICAgICB7Li4udGhpcy5wcm9wc31cbiAgICAgICAgICAgICAgICAgICAgLz5cblxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgPC9QYW5lbEJvZHkgPlxuXG4gICAgICAgIClcbiAgICB9XG59XG5cbmNsYXNzIG5ld3NfYmxvY2sgZXh0ZW5kcyBDb21wb25lbnQge1xuXG4gICAgLy8gc3RhdGUgaXMgdXNlZCB0byBzYXZlIHRlbXBvcmFyeSBkYXRhLCBsaWtlIHRoZSBsaXN0IG9mIHNpdGVzIG9yIHRheG9ub21pZXMuXG4gICAgLy8gd2UgZG9uJ3QgbmVlZCB0aGF0IHNhdmVkIGFuZCByZXRyaWV2ZWQgZnJvbSBkYXRhYmFzZSBmaWVsZHMuXG4gICAgLy8gZm9yIGRhdGEgd2Ugc2F2ZSBpbiBvcmRlciB0byByZW5kZXIsIHRoYXQgZ2V0cyBzZXQgaW4gdGhlIGF0dHJpYnV0ZXMuXG4gICAgc3RhdGljIGdldEluaXRpYWxTdGF0ZSgpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHNvdXJjZXM6IFtdXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyBhIGxpc3Qgb2YgYWxsIG1ldGhvZHMgKGZ1bmN0aW9ucykgZm9yIGEgZ2l2ZW4gb2JqZWN0LCBhbmQgb3B0aW9uYWxseSBvbmx5IHRob3NlIG1ldGhvZHMgd2hvc2UgbmFtZSBiZWdpbnMgd2l0aCBhIHNwZWNpZmljIHN0cmluZ1xuICAgICAqIEBwYXJhbSBvYmpcbiAgICAgKiBAcGFyYW0gcHJlZml4X2ZpbHRlciBGaWx0ZXIgbGlzdCBvZiBtZXRob2RzIHRvIG9ubHkgaW5jbHVkZSB0aG9zZSBzdGFydGluZyB3aXRoIHRoaXMgc3RyaW5nXG4gICAgICogQHJldHVybnMge3N0cmluZ1tdfSBBcnJheSBvZiBtZXRob2RzIGZyb20gb2JqZWN0XG4gICAgICovXG4gICAgc3RhdGljIGdldE1ldGhvZHMob2JqLCBwcmVmaXhfZmlsdGVyID0gJycpIHtcbiAgICAgICAgcmV0dXJuIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKG9iaikuZmlsdGVyKChpdGVtKSA9PiB7XG4gICAgICAgICAgICBpZiAocHJlZml4X2ZpbHRlcikge1xuICAgICAgICAgICAgICAgIHJldHVybiAoKHR5cGVvZiBvYmpbIGl0ZW0gXSA9PT0gJ2Z1bmN0aW9uJykgJiYgKGl0ZW0uc3RhcnRzV2l0aChwcmVmaXhfZmlsdGVyKSkpO1xuXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiAodHlwZW9mIG9ialsgaXRlbSBdID09PSAnZnVuY3Rpb24nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICB9O1xuXG4gICAgLy8gQ2FsbCBzdXBlcihwcm9wcykgYW5kIGJpbmQgZnVuY3Rpb25zXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKC4uLmFyZ3VtZW50cyk7XG4gICAgICAgIHRoaXMuc3RhdGUgPSB0aGlzLmNvbnN0cnVjdG9yLmdldEluaXRpYWxTdGF0ZSgpO1xuXG4gICAgICAgIC8vIE5lZWQgdG8gYmluZCAndGhpcycgdG8gYWxsIG9mIHRoZSBtZXRob2RzIChmdW5jdGlvbnMpIG9mIHRoZSBuZXdzX2Jsb2NrIGNsYXNzLiBMaXN0aW5nIHRoZW0gYWxsIGluZGl2aWR1YWxseSBzdGFydGVkXG4gICAgICAgIC8vIHRvIGdldCBsb25nLCBzbyBpbnN0ZWFkIHdlIHJlcXVlc3QgYWxsIHRoZSBtZXRob2RzIG9uIHRoZSAndGhpcycgb2JqZWN0LCBhbmQgdGhlbiBiaW5kICd0aGlzJyB0byB0aGVtIGlmIHRoZXkncmVcbiAgICAgICAgLy8gb25lIG9mIG91ciAnZ2V0JyBvciAndXBkYXRlJyBtZXRob2RzXG5cbiAgICB9XG5cblxuICAgIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgICAgICAvL2NvbnNvbGUubG9nKHRoaXMucHJvcHMuYXR0cmlidXRlcy5zb3VyY2VzKTtcbiAgICAgICAgLy8gZm9yIGVhY2ggc291cmNlIGluIHRoZSBkYXRhYmFzZSwgY3JlYXRlIGEgY29ycmVzcG9uZGluZyBibGFuayBlbnRyeSBpbiBzdGF0ZSB0byBob2xkIGxpc3RzIG9mIHNpdGVzLCB0ZXJtcywgZXRjLiB0aGVuIGxvYWQgdGhlIHNpdGVzLlxuICAgICAgICBpZiAodGhpcy5wcm9wcy5hdHRyaWJ1dGVzLnNvdXJjZXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgdGhpcy5wcm9wcy5hdHRyaWJ1dGVzLnNvdXJjZXMubWFwKChzaW5nbGVfc291cmNlLCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuaW5zZXJ0SW50b1NvdXJjZUFycmF5U3RhdGUoc2luZ2xlX3NvdXJjZSk7XG4gICAgICAgICAgICAgICAgdGhpcy5nZXRTaXRlcyhpbmRleCk7XG4gICAgICAgICAgICAgICAgdGhpcy5nZXRQb3N0VHlwZXMoaW5kZXgpO1xuICAgICAgICAgICAgICAgIHRoaXMuZ2V0VGF4b25vbWllcyhpbmRleCk7XG4gICAgICAgICAgICAgICAgdGhpcy5nZXRUZXJtcyhpbmRleCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuaW5zZXJ0U291cmNlKCk7XG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIHN0YXRpYyBhdHRyaWJ1dGVzTWVyZ2UoZGVmYXVsdHMsIG9wdGlvbnMpIHtcbiAgICAgICAgZm9yIChjb25zdCBbIGtleSwgdmFsdWUgXSBvZiBPYmplY3QuZW50cmllcyhkZWZhdWx0cykpIHtcbiAgICAgICAgICAgIGlmICgob3B0aW9uc1sga2V5IF0gIT09IHVuZGVmaW5lZCkgJiYgKG9wdGlvbnNbIGtleSBdICE9PSBudWxsKSkge1xuICAgICAgICAgICAgICAgIGRlZmF1bHRzWyBrZXkgXSA9IG9wdGlvbnNbIGtleSBdIC8vIGlmIGFycmF5IHBhc3NlZCBpbiBoYXMgYSB2YWx1ZSBzZXQgZm9yIG9uZSBvZiBvdXIgZGVmYXVsdHMsIGNvcHkgdGhlIHZhbHVlIG92ZXIuIG90aGVyd2lzZSwgaWdub3JlIHRoYXQgZXh0cmEga2V5LXZhbHVlIHBhaXIuXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGRlZmF1bHRzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEluc2VydHMgYSBibGFuayBlbnRyeSBpbiB0aGUgc3RhdGUgZm9yIGEgc2luZ2xlIHNvdXJjZS4gVXNlIGluIGNvbWJpbmF0aW9uIHdpdGggY3JlYXRpbmcgYSBuZXcgc291cmNlLCBvciB3aGVuXG4gICAgICogbG9hZGluZyB0aGUgcGFnZSAoY3JlYXRpbmcgYSBibGFuayBlbnRyeSBmb3IgZWFjaCBzb3VyY2UsIHRoZW4gbG9hZGluZyB0aGUgZGF0YSBhZnRlcndhcmRzKS5cbiAgICAgKi9cbiAgICBpbnNlcnRJbnRvU291cmNlQXJyYXlTdGF0ZSA9IChzaW5nbGVfc291cmNlID0gW10pID0+IHtcbiAgICAgICAgbGV0IG5ld19zb3VyY2Vfc3RhdGUgPSB7XG4gICAgICAgICAgICBzaXRlczogWyB7dmFsdWU6IDAsIGxhYmVsOiBfXygnTG9hZGluZyBzaXRlcy4uLicpLCBkaXNhYmxlZDogdHJ1ZSx9IF0sXG4gICAgICAgICAgICBwb3N0X3R5cGVzOiBbIHt2YWx1ZTogJycsIGxhYmVsOiBfXygnTG9hZGluZyBwb3N0IHR5cGVzLi4uJyksIGRpc2FibGVkOiB0cnVlLH0gXSxcbiAgICAgICAgICAgIHRheG9ub21pZXM6IFsge3ZhbHVlOiAnJywgbGFiZWw6IF9fKCdMb2FkaW5nIHRheG9ub21pZXMuLi4nKSwgZGlzYWJsZWQ6IHRydWUsfSBdLFxuICAgICAgICAgICAgdGVybXM6IFsge3ZhbHVlOiAnJywgbGFiZWw6IF9fKCdMb2FkaW5nIHRlcm1zLi4uJyksIGRpc2FibGVkOiB0cnVlLH0gXSxcbiAgICAgICAgICAgIHNvdXJjZV9lbmFibGVkOiB0cnVlLFxuICAgICAgICAgICAgaXNfZXh0ZXJuYWw6IGZhbHNlLFxuICAgICAgICAgICAgcnNzX3VybDogJycsXG4gICAgICAgICAgICBibG9nX2lkOiAxLFxuICAgICAgICAgICAgcG9zdF90eXBlOiAnJyxcbiAgICAgICAgICAgIHRheG9ub215OiAnJyxcbiAgICAgICAgICAgIHRheG9ub215X3Rlcm1fbW9kZTogZmFsc2UsXG4gICAgICAgICAgICBzZWxlY3RlZF90ZXJtX2xpc3Q6IFtdXG5cbiAgICAgICAgfTtcbiAgICAgICAgLy9jb25zb2xlLmxvZyhzaW5nbGVfc291cmNlKTtcbiAgICAgICAgbmV3X3NvdXJjZV9zdGF0ZSA9IHRoaXMuY29uc3RydWN0b3IuYXR0cmlidXRlc01lcmdlKG5ld19zb3VyY2Vfc3RhdGUsIHNpbmdsZV9zb3VyY2UpO1xuICAgICAgICAvL2NvbnNvbGUubG9nKG5ld19zb3VyY2Vfc3RhdGUpO1xuICAgICAgICB0aGlzLnNldFN0YXRlKChwcmV2aW91c1N0YXRlKSA9PiB7XG4gICAgICAgICAgICBsZXQgc3RhdGVfc291cmNlcztcbiAgICAgICAgICAgIHN0YXRlX3NvdXJjZXMgPSBwcmV2aW91c1N0YXRlLnNvdXJjZXMuc2xpY2UoMCk7IC8vIGNsb25lIHRoZSBhcnJheSB0byBtb2RpZnkgaXQsIHNvIHdlIGRvbid0IG1lc3MgaXQgdXBcbiAgICAgICAgICAgIHN0YXRlX3NvdXJjZXMucHVzaChuZXdfc291cmNlX3N0YXRlKTtcbiAgICAgICAgICAgIHJldHVybiB7c291cmNlczogc3RhdGVfc291cmNlc307XG4gICAgICAgIH0sICgpID0+IHtcbiAgICAgICAgICAgIC8vIGFmdGVyIGFkZGluZyBhIGJsYW5rIHNvdXJjZSwgZ2V0IHRoZSBuZXR3b3JrIHNpdGVzIGFuZCBwb3B1bGF0ZSB0aGUgZmlyc3QgZHJvcGRvd24gZm9yIHRoZSBuZXcgc291cmNlXG4gICAgICAgICAgICB0aGlzLmdldFNpdGVzKHRoaXMuc3RhdGUuc291cmNlcy5sZW5ndGggLSAxKTtcbiAgICAgICAgfSk7XG5cbiAgICB9O1xuXG5cbiAgICAvKipcbiAgICAgKiBXaGVuIHVzZXIgY2xpY2tzICdpbnNlcnQnIGJ1dHRvbiwgdGhpcyBjcmVhdGVzIGEgbmV3IGJsYW5rIGVudHJ5IGluIHRoZSBzdGF0ZSBhbmQgcHJvcHMuYXR0cmlidXRlcyBmb3IgdGhlIGR5bmFtaWMgYW5kIHNlcnZlciBkYXRhLlxuICAgICAqIEl0IHRoZW4gcnVucyBhamF4IHRvIGdldCB0aGUgc2l0ZXMgZm9yIHRoZSBpbml0aWFsIGxpc3Qgb2YgdGhlIGJsYW5rIGVudHJ5LlxuICAgICAqL1xuICAgIGluc2VydFNvdXJjZSA9ICgpID0+IHtcbiAgICAgICAgY29uc3QgbmV3X3NvdXJjZV9hdHRyaWJ1dGVzID0ge1xuICAgICAgICAgICAgc291cmNlX2VuYWJsZWQ6IHRydWUsXG4gICAgICAgICAgICBpc19leHRlcm5hbDogZmFsc2UsXG4gICAgICAgICAgICByc3NfdXJsOiAnJyxcbiAgICAgICAgICAgIGJsb2dfaWQ6IDEsXG4gICAgICAgICAgICBwb3N0X3R5cGU6ICcnLFxuICAgICAgICAgICAgdGF4b25vbXk6ICcnLFxuICAgICAgICAgICAgdGF4b25vbXlfdGVybV9tb2RlOiBmYWxzZSxcbiAgICAgICAgICAgIHNlbGVjdGVkX3Rlcm1fbGlzdDogW11cbiAgICAgICAgfTtcbiAgICAgICAgbGV0IGF0dHJpYnV0ZXNfc291cmNlcztcbiAgICAgICAgYXR0cmlidXRlc19zb3VyY2VzID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeSh0aGlzLnN0YXRlLnNvdXJjZXMpKTtcbiAgICAgICAgYXR0cmlidXRlc19zb3VyY2VzLm1hcCgoc2luZ2xlX3NvdXJjZSwgc2luZ2xlX2luZGV4KSA9PiB7XG4gICAgICAgICAgICBkZWxldGUgc2luZ2xlX3NvdXJjZVsgJ3NpdGVzJyBdO1xuICAgICAgICAgICAgZGVsZXRlIHNpbmdsZV9zb3VyY2VbICdwb3N0X3R5cGVzJyBdO1xuICAgICAgICAgICAgZGVsZXRlIHNpbmdsZV9zb3VyY2VbICd0YXhvbm9taWVzJyBdO1xuICAgICAgICAgICAgZGVsZXRlIHNpbmdsZV9zb3VyY2VbICd0ZXJtcycgXTtcbiAgICAgICAgICAgIHJldHVybiBzaW5nbGVfc291cmNlO1xuICAgICAgICB9KTtcbiAgICAgICAgYXR0cmlidXRlc19zb3VyY2VzLnB1c2gobmV3X3NvdXJjZV9hdHRyaWJ1dGVzKTtcblxuICAgICAgICAvLyBoYXZlIHRvIGFkZCBhIG5ldyBlbnRyeSBpbiBib3RoIHRoZSBhdHRyaWJ1dGVzIChmb3Igc2VydmVyLXNpZGUgdmFsdWVzKSBhbmQgdGhlIHN0YXRlIChmb3IgdGVtcG9yYXJ5IGNsaWVudC1zaWRlIHZhbHVlcywgbGlrZSB0aGUgbGlzdCBvZiBzaXRlcylcbiAgICAgICAgdGhpcy5wcm9wcy5zZXRBdHRyaWJ1dGVzKHtzb3VyY2VzOiAoYXR0cmlidXRlc19zb3VyY2VzKX0pO1xuICAgICAgICB0aGlzLmluc2VydEludG9Tb3VyY2VBcnJheVN0YXRlKCk7XG5cblxuICAgIH07XG5cbiAgICBkZWxldGVTb3VyY2UgPSAoaW5kZXgpID0+IHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSgocHJldmlvdXNTdGF0ZSkgPT4ge1xuICAgICAgICAgICAgbGV0IHJlbWFpbmluZ19zb3VyY2VzX3N0YXRlO1xuICAgICAgICAgICAgcmVtYWluaW5nX3NvdXJjZXNfc3RhdGUgPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KHByZXZpb3VzU3RhdGUuc291cmNlcykpO1xuICAgICAgICAgICAgcmVtYWluaW5nX3NvdXJjZXNfc3RhdGUuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgICAgIHJldHVybiB7c291cmNlczogcmVtYWluaW5nX3NvdXJjZXNfc3RhdGV9XG4gICAgICAgIH0sICgpID0+IHtcbiAgICAgICAgICAgIGxldCByZW1haW5pbmdfc291cmNlcztcbiAgICAgICAgICAgIHJlbWFpbmluZ19zb3VyY2VzID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeSh0aGlzLnN0YXRlLnNvdXJjZXMpKTtcbiAgICAgICAgICAgIHRoaXMucHJvcHMuc2V0QXR0cmlidXRlcyh7c291cmNlczogKHJlbWFpbmluZ19zb3VyY2VzKX0pXG4gICAgICAgIH0pO1xuXG5cbiAgICB9O1xuXG4gICAgZ2V0U2l0ZXMgPSAoaW5kZXgpID0+IHtcbiAgICAgICAgdGhpcy5zZXRTb3VyY2VBcnJheVN0YXRlKFxuICAgICAgICAgICAgaW5kZXgsXG4gICAgICAgICAgICAnc2l0ZXMnLFxuICAgICAgICAgICAgWyB7dmFsdWU6ICcnLCBsYWJlbDogX18oJ0xvYWRpbmcgc2l0ZXMuLi4nKSwgZGlzYWJsZWQ6IHRydWUsfSBdXG4gICAgICAgICk7XG5cbiAgICAgICAgbGV0IHByb21pc2VfcmVzdWx0ID0gKGFwaUZldGNoKHtwYXRoOiAnc2NocmF1Z2VyL25ld3MtYmxvY2svdjEvZ2V0LXNpdGVzLyd9KS50aGVuKChzaXRlcykgPT4ge1xuICAgICAgICAgICAgLy8gbG9hZCBzaXRlcyBpbnRvIHNlbGVjdCBsaXN0XG4gICAgICAgICAgICBsZXQgb3B0aW9uc19zaXRlX2xpc3QgPSBbXTtcbiAgICAgICAgICAgIGlmIChzaXRlcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgb3B0aW9uc19zaXRlX2xpc3QucHVzaCh7dmFsdWU6IDAsIGxhYmVsOiBfXygnU2VsZWN0IGEgc2l0ZScpLCBkaXNhYmxlZDogZmFsc2UsfSk7XG4gICAgICAgICAgICAgICAgc2l0ZXMuZm9yRWFjaCgoc2l0ZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBvcHRpb25zX3NpdGVfbGlzdC5wdXNoKHt2YWx1ZTogc2l0ZS52YWx1ZSwgbGFiZWw6IHNpdGUubGFiZWx9KVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIG9wdGlvbnNfc2l0ZV9saXN0LnB1c2goe3ZhbHVlOiAwLCBsYWJlbDogX18oJ05vIHZhbGlkIHNpdGVzJyksIGRpc2FibGVkOiB0cnVlLH0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLnNldFNvdXJjZUFycmF5U3RhdGUoaW5kZXgsICdzaXRlcycsIG9wdGlvbnNfc2l0ZV9saXN0KTtcblxuICAgICAgICAgICAgaWYgKHRoaXMuc3RhdGUuc291cmNlc1sgaW5kZXggXS5ibG9nX2lkICkge1xuICAgICAgICAgICAgICAgIHRoaXMuZ2V0UG9zdFR5cGVzKGluZGV4LCB0aGlzLnN0YXRlLnNvdXJjZXNbIGluZGV4IF0uYmxvZ19pZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pKTtcblxuICAgICAgICByZXR1cm4gcHJvbWlzZV9yZXN1bHQ7XG4gICAgfTtcblxuICAgIGdldFBvc3RUeXBlcyA9IChpbmRleCwgc2l0ZSkgPT4ge1xuICAgICAgICB0aGlzLnNldFNvdXJjZUFycmF5U3RhdGUoXG4gICAgICAgICAgICBpbmRleCxcbiAgICAgICAgICAgICdwb3N0X3R5cGVzJyxcbiAgICAgICAgICAgIFsge3ZhbHVlOiAnJywgbGFiZWw6IF9fKCdMb2FkaW5nIHBvc3QgdHlwZXMuLi4nKSwgZGlzYWJsZWQ6IHRydWUsfSBdXG4gICAgICAgICk7XG4gICAgICAgIHRoaXMuc2V0U291cmNlQXJyYXlTdGF0ZShcbiAgICAgICAgICAgIGluZGV4LFxuICAgICAgICAgICAgJ3RheG9ub21pZXMnLFxuICAgICAgICAgICAgW11cbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy5zZXRTb3VyY2VBcnJheVN0YXRlKFxuICAgICAgICAgICAgaW5kZXgsXG4gICAgICAgICAgICAndGVybXMnLFxuICAgICAgICAgICAgW11cbiAgICAgICAgKTtcblxuICAgICAgICBsZXQgcGF0aCA9ICdzY2hyYXVnZXIvbmV3cy1ibG9jay92MS8nO1xuICAgICAgICBpZiAoc2l0ZSkge1xuICAgICAgICAgICAgcGF0aCA9IHBhdGggKyAnc2l0ZS8nICsgc2l0ZSArICcvJztcbiAgICAgICAgfVxuICAgICAgICBwYXRoID0gcGF0aCArICdnZXQtcG9zdC10eXBlcyc7XG5cbiAgICAgICAgbGV0IHByb21pc2VfcmVzdWx0ID0gKGFwaUZldGNoKHtwYXRoOiBwYXRofSkudGhlbigocG9zdF90eXBlcykgPT4ge1xuXG4gICAgICAgICAgICAvLyBsb2FkIHBvc3QgdHlwZXMgaW50byBzZWxlY3QgbGlzdFxuICAgICAgICAgICAgbGV0IG9wdGlvbnNfcG9zdF90eXBlX2xpc3QgPSBbXTtcbiAgICAgICAgICAgIGlmIChwb3N0X3R5cGVzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICBvcHRpb25zX3Bvc3RfdHlwZV9saXN0LnB1c2goe3ZhbHVlOiAnJywgbGFiZWw6IF9fKCdTZWxlY3QgYSBwb3N0IHR5cGUnKSwgZGlzYWJsZWQ6IGZhbHNlLH0pO1xuICAgICAgICAgICAgICAgIC8vIGRvbid0IG1hcmsgdGhpcyBhcyBkaXNhYmxlZC4gb3RoZXJ3aXNlLCBpZiBhIG5ldyBzaXRlIGlzIHNlbGVjdGVkLCB0aGUgb2xkIHBvc3QgdHlwZSBzZWxlY3RlZFxuICAgICAgICAgICAgICAgIC8vIG1pZ2h0IG5vdCBleGlzdCBpbiB0aGUgbmV3IHNpdGUsIGNhdXNpbmcgcmVhY3QgdG8gYmUgdW5hYmxlIHRvIGRldGVjdCBvbmNoYW5nZSB3aXRoIGEgc2luZ2xlIG9wdGlvbi5cbiAgICAgICAgICAgICAgICAvLyBleDogc2l0ZSAxLCBwb3N0X3R5cGUgcGVyc29uLiBjaGFuZ2VkIHRvIHNpdGUgMiwgd2hpY2ggaGFzIG5vIHBlcnNvbiBwb3N0dHlwZSBidXQgaGFzIGEgc2luZ2xlIG5ld3MgdHlwZS5cbiAgICAgICAgICAgICAgICAvLyAgICAgbmV3cyBpcyBhdXRvIHNlbGVjdGVkIChhcyBpdCdzIHRoZSBvbmx5IG5vbi1kaXNhYmxlZCBvcHRpb24pLCBidXQgaXQgZG9lc24ndCB0cmlnZ2VyIHRoZSBvbkNoYW5nZS5cbiAgICAgICAgICAgICAgICAvLyAgICAgQW5kIG9uQ2hhbmdlIGNhbid0IGJlIHRyaWdnZXJlZCBzaW5jZSBpdCdzIHRoZSBvbmx5IG9wdGlvbiBhbmQgdGh1cyB3b24ndCBjaGFuZ2Ugd2l0aCBhIHVzZXIgaW5wdXQuXG4gICAgICAgICAgICAgICAgLy8gICAgIEJ5IGxlYXZpbmcgdGhpcyBlbXB0eSBcIlNlbGVjdCBhIC4uLlwiIG9wdGlvbiBhcyBlbmFibGVkLCB0aGF0IGluc3RlYWQgYmVjb21lcyB0aGUgYXV0b3NlbGVjdGVkIG9uZSxcbiAgICAgICAgICAgICAgICAvLyAgICAgYW5kIHRoZSB1c2VyIGNhbiB0aHVzIHNlbGVjdCB0aGUgc2luZ2xlIG90aGVyIG9wdGlvbiBpbiB0aGUgbGlzdCwgdHJpZ2dlcmluZyBvbkNoYW5nZSBldmVudHMuXG5cbiAgICAgICAgICAgICAgICBwb3N0X3R5cGVzLmZvckVhY2goKHBvc3RfdHlwZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBvcHRpb25zX3Bvc3RfdHlwZV9saXN0LnB1c2goe3ZhbHVlOiBwb3N0X3R5cGUudmFsdWUsIGxhYmVsOiBwb3N0X3R5cGUubGFiZWx9KVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIG9wdGlvbnNfcG9zdF90eXBlX2xpc3QucHVzaCh7dmFsdWU6ICcnLCBsYWJlbDogX18oJ05vIHZhbGlkIHBvc3QgdHlwZXMnKSwgZGlzYWJsZWQ6IHRydWUsfSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuc2V0U291cmNlQXJyYXlTdGF0ZShpbmRleCwgJ3Bvc3RfdHlwZXMnLCBvcHRpb25zX3Bvc3RfdHlwZV9saXN0KTtcblxuICAgICAgICAgICAgaWYgKHRoaXMuc3RhdGUuc291cmNlc1sgaW5kZXggXS5wb3N0X3R5cGUgKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5nZXRUYXhvbm9taWVzKGluZGV4LCB0aGlzLnN0YXRlLnNvdXJjZXNbIGluZGV4IF0ucG9zdF90eXBlLCBzaXRlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSkpO1xuXG4gICAgICAgIHJldHVybiBwcm9taXNlX3Jlc3VsdDtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogTG9hZHMgYSBsaXN0IG9mIHRheG9ub21pZXMgZm9yIHRoZSBzcGVjaWZpYyBzb3VyY2UsIG9wdGlvbmFsbHkgYmFzZWQgb24gdGhlIHBvc3RfdHlwZSBhbmQgc2l0ZVxuICAgICAqIEBwYXJhbSBpbmRleFxuICAgICAqIEBwYXJhbSBwb3N0X3R5cGVcbiAgICAgKiBAcGFyYW0gc2l0ZVxuICAgICAqIEByZXR1cm5zIHsqfVxuICAgICAqL1xuICAgIGdldFRheG9ub21pZXMgPSAoaW5kZXgsIHBvc3RfdHlwZSwgc2l0ZSkgPT4ge1xuICAgICAgICB0aGlzLnNldFNvdXJjZUFycmF5U3RhdGUoXG4gICAgICAgICAgICBpbmRleCxcbiAgICAgICAgICAgICd0YXhvbm9taWVzJyxcbiAgICAgICAgICAgIFsge3ZhbHVlOiAnJywgbGFiZWw6IF9fKCdMb2FkaW5nIHRheG9ub21pZXMuLi4nKSwgZGlzYWJsZWQ6IHRydWUsfSBdXG4gICAgICAgICk7XG4gICAgICAgIHRoaXMuc2V0U291cmNlQXJyYXlTdGF0ZShcbiAgICAgICAgICAgIGluZGV4LFxuICAgICAgICAgICAgJ3Rlcm1zJyxcbiAgICAgICAgICAgIFtdXG4gICAgICAgICk7XG5cbiAgICAgICAgbGV0IHBhdGggPSAnc2NocmF1Z2VyL25ld3MtYmxvY2svdjEvJztcbiAgICAgICAgaWYgKHNpdGUpIHtcbiAgICAgICAgICAgIHBhdGggPSBwYXRoICsgJ3NpdGUvJyArIHNpdGUgKyAnLyc7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHBvc3RfdHlwZSkge1xuICAgICAgICAgICAgcGF0aCA9IHBhdGggKyAncG9zdC10eXBlLycgKyBwb3N0X3R5cGUgKyAnLyc7XG4gICAgICAgIH1cbiAgICAgICAgcGF0aCA9IHBhdGggKyAnZ2V0LXRheG9ub21pZXMnO1xuXG4gICAgICAgIGxldCBwcm9taXNlX3Jlc3VsdCA9IChhcGlGZXRjaCh7cGF0aDogcGF0aH0pLnRoZW4oKHRheG9ub21pZXMpID0+IHtcblxuICAgICAgICAgICAgLy8gbG9hZCB0YXhvbm9taWVzIGludG8gc2VsZWN0IGxpc3RcbiAgICAgICAgICAgIGxldCBvcHRpb25zX3RheG9ub215X2xpc3QgPSBbXTtcbiAgICAgICAgICAgIGlmICh0YXhvbm9taWVzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICBvcHRpb25zX3RheG9ub215X2xpc3QucHVzaCh7dmFsdWU6ICcnLCBsYWJlbDogX18oJ1NlbGVjdCBhIHRheG9ub215JyksIGRpc2FibGVkOiBmYWxzZSx9KTsgLy8gdmFsdWUgbXVzdCBiZSBlbXB0eSBzdHJpbmc7IGlmIG51bGwsIHRoZSB2YWx1ZSBlbmRzIHVwIGJlaW5nIHRoZSBsYWJlbC5cblxuICAgICAgICAgICAgICAgIHRheG9ub21pZXMuZm9yRWFjaCgodGF4b25vbXkpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgb3B0aW9uc190YXhvbm9teV9saXN0LnB1c2goe3ZhbHVlOiB0YXhvbm9teS52YWx1ZSwgbGFiZWw6IHRheG9ub215LmxhYmVsfSlcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBvcHRpb25zX3RheG9ub215X2xpc3QgPSBbIHt2YWx1ZTogJycsIGxhYmVsOiBfXygnTm8gdmFsaWQgdGF4b25vbWllcycpLCBkaXNhYmxlZDogdHJ1ZSx9IF07XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuc2V0U291cmNlQXJyYXlTdGF0ZShpbmRleCwgJ3RheG9ub21pZXMnLCBvcHRpb25zX3RheG9ub215X2xpc3QpO1xuXG4gICAgICAgICAgICBpZiAodGhpcy5zdGF0ZS5zb3VyY2VzWyBpbmRleCBdLnRheG9ub215ICkge1xuICAgICAgICAgICAgICAgIHRoaXMuZ2V0VGVybXMoaW5kZXgsIHRoaXMuc3RhdGUuc291cmNlc1sgaW5kZXggXS50YXhvbm9teSwgc2l0ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pKTtcblxuICAgICAgICByZXR1cm4gcHJvbWlzZV9yZXN1bHQ7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIExvYWRzIGEgbGlzdCBvZiB0ZXJtcyBmb3IgdGhlIHNwZWNpZmljIHNvdXJjZSwgb3B0aW9uYWxseSBiYXNlZCBvbiB0aGUgdGF4b25vbXkgYW5kIHNpdGVcbiAgICAgKiBAcGFyYW0gaW5kZXhcbiAgICAgKiBAcGFyYW0gdGF4b25vbXlcbiAgICAgKiBAcGFyYW0gc2l0ZVxuICAgICAqIEByZXR1cm5zIHsqfVxuICAgICAqL1xuICAgIGdldFRlcm1zID0gKGluZGV4LCB0YXhvbm9teSwgc2l0ZSkgPT4ge1xuICAgICAgICB0aGlzLnNldFNvdXJjZUFycmF5U3RhdGUoXG4gICAgICAgICAgICBpbmRleCxcbiAgICAgICAgICAgICd0ZXJtcycsXG4gICAgICAgICAgICBbIHt2YWx1ZTogJycsIGxhYmVsOiBfXygnTG9hZGluZyB0ZXJtcy4uLicpLCBkaXNhYmxlZDogdHJ1ZSx9IF1cbiAgICAgICAgKTtcblxuICAgICAgICBsZXQgcGF0aCA9ICdzY2hyYXVnZXIvbmV3cy1ibG9jay92MS8nO1xuICAgICAgICBpZiAoc2l0ZSkge1xuICAgICAgICAgICAgcGF0aCA9IHBhdGggKyAnc2l0ZS8nICsgc2l0ZSArICcvJztcbiAgICAgICAgfVxuICAgICAgICBpZiAodGF4b25vbXkpIHtcbiAgICAgICAgICAgIHBhdGggPSBwYXRoICsgJ3RheG9ub215LycgKyB0YXhvbm9teSArICcvJztcbiAgICAgICAgfVxuICAgICAgICBwYXRoID0gcGF0aCArICdnZXQtdGVybXMnO1xuXG4gICAgICAgIGxldCBwcm9taXNlX3Jlc3VsdCA9IChhcGlGZXRjaCh7cGF0aDogcGF0aH0pLnRoZW4oKHRlcm1zKSA9PiB7XG4gICAgICAgICAgICAvLyBsb2FkIHRlcm1zIGludG8gbXVsdGktc2VsZWN0IGxpc3RcbiAgICAgICAgICAgIGxldCBvcHRpb25zX3Rlcm1zX2xpc3QgPSBbXTsvLyB7IHZhbHVlOiBudWxsLCBsYWJlbDogKHRoaXMucHJvcHMuYXR0cmlidXRlcy50YXhvbm9teV90ZXJtX21vZGUgPyBfXygnU2VsZWN0IHRlcm1zIHRvIGV4Y2x1ZGUnICkgOiBfXygnU2VsZWN0IHRlcm1zIHRvIGluY2x1ZGUnKSApLCBkaXNhYmxlZDogdHJ1ZSwgIH0gXTtcbiAgICAgICAgICAgIGlmICh0ZXJtcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgdGVybXMuZm9yRWFjaCgodGVybSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBvcHRpb25zX3Rlcm1zX2xpc3QucHVzaCh7dmFsdWU6IHRlcm0udmFsdWUsIGxhYmVsOiB0ZXJtLmxhYmVsfSlcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBvcHRpb25zX3Rlcm1zX2xpc3QucHVzaCh7dmFsdWU6ICcnLCBsYWJlbDogX18oJ05vIHZhbGlkIHRlcm1zJyksIGRpc2FibGVkOiB0cnVlLH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5zZXRTb3VyY2VBcnJheVN0YXRlKGluZGV4LCAndGVybXMnLCBvcHRpb25zX3Rlcm1zX2xpc3QpO1xuXG4gICAgICAgIH0pKTtcblxuICAgICAgICByZXR1cm4gcHJvbWlzZV9yZXN1bHQ7XG4gICAgfTtcblxuXG4gICAgLyoqXG4gICAgICogU2V0cyB0aGUgcmVhY3Qgc3RhdGUgZm9yIGEgc3BlY2lmaWVkIGFycmF5IHdpdGhpbiB0aGUgJ3NvdXJjZXMnIGFycmF5LiBVc2VkIHRvIHVwZGF0ZSB0aGUgbGlzdCBvZiBzaXRlcywgcG9zdF90eXBlcywgdGF4b25vbWllcywgYW5kIHRlcm1zXG4gICAgICogQHBhcmFtIHNvdXJjZV9pbmRleFxuICAgICAqIEBwYXJhbSB3aGljaF9hcnJheVxuICAgICAqIEBwYXJhbSBhcnJheV92YWx1ZXNcbiAgICAgKi9cbiAgICBzZXRTb3VyY2VBcnJheVN0YXRlID0gKHNvdXJjZV9pbmRleCwgd2hpY2hfYXJyYXksIGFycmF5X3ZhbHVlcykgPT4ge1xuICAgICAgICB0aGlzLnNldFN0YXRlKChwcmV2aW91c1N0YXRlKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBzb3VyY2VzID0gcHJldmlvdXNTdGF0ZS5zb3VyY2VzLm1hcCgoc2luZ2xlX3NvdXJjZSwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoc291cmNlX2luZGV4ID09PSBpbmRleCkge1xuICAgICAgICAgICAgICAgICAgICAvLyB0aGlzIGlzIHRoZSBzb3VyY2Ugd2Ugd2FudCB0byBjaGFuZ2UgZnJvbSB0aGUgYXJyYXkgb2Ygc291cmNlc1xuICAgICAgICAgICAgICAgICAgICBzaW5nbGVfc291cmNlWyB3aGljaF9hcnJheSBdID0gYXJyYXlfdmFsdWVzO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gc2luZ2xlX3NvdXJjZTtcblxuICAgICAgICAgICAgICAgIH0gZWxzZSB7IC8vIG5vdCBvdXIgc291cmNlLCBkb24ndCBjaGFuZ2UgaXRcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHNpbmdsZV9zb3VyY2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4ge3NvdXJjZXM6IHNvdXJjZXN9O1xuICAgICAgICB9KVxuXG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIFVwZGF0ZXMgYW4gaXRlbSB3aXRoaW4gYSBzcGVjaWZpYyBzb3VyY2UsIHN0b3JlZCBpbiB0aGUgYXR0cmlidXRlcy5cbiAgICAgKiBTcGVjaWZ5IHRoZSBpbmRleCBvZiB5b3VyIHNvdXJjZSwgYW5kIHRoZSB7bmFtZTp2YWx1ZX0gb2YgdGhlIHZhcmlhYmxlIHRvIHNhdmVcbiAgICAgKiBAcGFyYW0gaW5kZXhcbiAgICAgKiBAcGFyYW0gZGljdGlvbmFyeSBrZXk6IHZhbHVlIG9mIHRoZSBJdGVtIHlvdSB3YW50IHRvIHVwZGF0ZVxuICAgICAqL1xuICAgIHVwZGF0ZUF0dHJpYnV0ZVNvdXJjZUl0ZW0gPSAoaW5kZXgsIGRpY3Rpb25hcnkpID0+IHtcbiAgICAgICAgY29uc3Qga2V5ID0gT2JqZWN0LmtleXMoZGljdGlvbmFyeSlbIDAgXTtcbiAgICAgICAgY29uc3QgdmFsdWUgPSBPYmplY3QudmFsdWVzKGRpY3Rpb25hcnkpWyAwIF07XG4gICAgICAgIGxldCBzb3VyY2VzO1xuICAgICAgICBzb3VyY2VzID0gdGhpcy5zdGF0ZS5zb3VyY2VzLm1hcCgoc2luZ2xlX3NvdXJjZSwgc2luZ2xlX2luZGV4KSA9PiB7XG4gICAgICAgICAgICBpZiAoaW5kZXggPT09IHNpbmdsZV9pbmRleCkge1xuICAgICAgICAgICAgICAgIHNpbmdsZV9zb3VyY2VbIGtleSBdID0gdmFsdWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gc2luZ2xlX3NvdXJjZTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7c291cmNlc30pO1xuICAgICAgICAvL2NvbnNvbGUubG9nKHNvdXJjZXMpO1xuICAgICAgICAvLyBkb24ndCBwdXNoIHRoZSBkeW5hbWljIGxpc3RzIHRvIHRoZSBzZXJ2ZXIsIGFzIHRoZXkgZ2V0IHJlY29tcHV0ZWQgYW5kIGRvbid0IG5lZWQgdG8gYmUgc3RhdGljYWxseSBzYXZlZC5cbiAgICAgICAgbGV0IHNvdXJjZXNfd2l0aG91dF9saXN0cztcbiAgICAgICAgc291cmNlc193aXRob3V0X2xpc3RzID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShzb3VyY2VzKSk7IC8vIGZvcmNlIGEgY2xvbmUgc28gd2UgZG9uJ3QgY2xvYmJlciBzdGF0ZSB3aGVuIHNldHRpbmcgc2VydmVyIGF0dHJpYnV0ZXNcbiAgICAgICAgc291cmNlc193aXRob3V0X2xpc3RzLm1hcCgoc2luZ2xlX3NvdXJjZSwgc2luZ2xlX2luZGV4KSA9PiB7XG4gICAgICAgICAgICBkZWxldGUgc2luZ2xlX3NvdXJjZVsgJ3NpdGVzJyBdO1xuICAgICAgICAgICAgZGVsZXRlIHNpbmdsZV9zb3VyY2VbICdwb3N0X3R5cGVzJyBdO1xuICAgICAgICAgICAgZGVsZXRlIHNpbmdsZV9zb3VyY2VbICd0YXhvbm9taWVzJyBdO1xuICAgICAgICAgICAgZGVsZXRlIHNpbmdsZV9zb3VyY2VbICd0ZXJtcycgXTtcbiAgICAgICAgICAgIHJldHVybiBzaW5nbGVfc291cmNlO1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5wcm9wcy5zZXRBdHRyaWJ1dGVzKHtzb3VyY2VzOiAoc291cmNlc193aXRob3V0X2xpc3RzKX0pO1xuICAgIH07XG5cblxuICAgIC8qKlxuICAgICAqIEZvciBleHRlcm5hbCBzb3VyY2VzLCB0aGUgb25seSB0aGluZyB3ZSBjYXJlIGFib3V0IGlzIHRoZSByc3MgdXJsXG4gICAgICogQHBhcmFtIGluZGV4XG4gICAgICogQHBhcmFtIHJzc191cmxcbiAgICAgKi9cbiAgICB1cGRhdGVSU1NVcmwgPSAoaW5kZXgsIHJzc191cmwpID0+IHtcbiAgICAgICAgdGhpcy51cGRhdGVBdHRyaWJ1dGVTb3VyY2VJdGVtKGluZGV4LCB7cnNzX3VybH0pO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBVcGRhdGUgdGhlIHNpdGUgc2VsZWN0aW9uLCBhbmQgZ2V0IHBvc3QgdHlwZXMgZm9yIHRoYXQgc2l0ZVxuICAgICAqIEBwYXJhbSBpbmRleFxuICAgICAqIEBwYXJhbSBibG9nX2lkXG4gICAgICovXG4gICAgdXBkYXRlU2l0ZSA9IChpbmRleCwgYmxvZ19pZCkgPT4ge1xuICAgICAgICB0aGlzLnVwZGF0ZUF0dHJpYnV0ZVNvdXJjZUl0ZW0oaW5kZXgsIHtibG9nX2lkfSk7XG4gICAgICAgIHRoaXMuZ2V0UG9zdFR5cGVzKGluZGV4LCBibG9nX2lkKTsgLy8gZ2V0IG5ldyBsaXN0IG9mIHRheG9ub21pZXMgYWZ0ZXIgY2hhbmdpbmcgc2l0ZVxuXG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIFVwZGF0ZSB0aGUgcG9zdCB0eXBlIHNlbGVjdGlvbiwgYW5kIGdldCB0YXhvbm9taWVzIGZvciB0aGF0IHBvc3QgdHlwZVxuICAgICAqIEBwYXJhbSBpbmRleFxuICAgICAqIEBwYXJhbSBwb3N0X3R5cGVcbiAgICAgKi9cbiAgICB1cGRhdGVQb3N0VHlwZSA9IChpbmRleCwgcG9zdF90eXBlKSA9PiB7XG4gICAgICAgIHRoaXMudXBkYXRlQXR0cmlidXRlU291cmNlSXRlbShpbmRleCwge3Bvc3RfdHlwZX0pO1xuXG4gICAgICAgIGxldCBibG9nX2lkID0gdGhpcy5zdGF0ZS5zb3VyY2VzWyBpbmRleCBdLmJsb2dfaWQ7XG4gICAgICAgIHRoaXMuZ2V0VGF4b25vbWllcyhpbmRleCwgcG9zdF90eXBlLCBibG9nX2lkKTtcbiAgICB9O1xuXG4gICAgdXBkYXRlVGF4b25vbXkgPSAoaW5kZXgsIHRheG9ub215KSA9PiB7XG4gICAgICAgIC8vICAgICAgICB0aGlzLnNldFN0YXRlKCB7IHRheG9ub215OiB0YXhvbm9teSB9KTtcbiAgICAgICAgdGhpcy51cGRhdGVBdHRyaWJ1dGVTb3VyY2VJdGVtKGluZGV4LCB7dGF4b25vbXl9KTtcblxuXG4gICAgICAgIC8vIGZvcmNlIHJlc2V0IG9mIHNlbGVjdGVkIHRlcm1zLCBhbmQgZ2V0IG5ldyBsaXN0IG9mIHRlcm1zIGFmdGVyIGNoYW5naW5nIHRheG9ub215XG4gICAgICAgIGxldCBibG9nX2lkID0gdGhpcy5zdGF0ZS5zb3VyY2VzWyBpbmRleCBdLmJsb2dfaWQ7XG4gICAgICAgIHRoaXMucHJvcHMuc2V0QXR0cmlidXRlcyh7XG4gICAgICAgICAgICBzZWxlY3RlZF90ZXJtX2xpc3Q6IFtdXG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLmdldFRlcm1zKGluZGV4LCB0YXhvbm9teSwgYmxvZ19pZCk7XG4gICAgfTtcblxuICAgIHVwZGF0ZVNlbGVjdGVkVGVybXMgPSAoaW5kZXgsIHNlbGVjdGVkX3Rlcm1fbGlzdCkgPT4ge1xuICAgICAgICB0aGlzLnVwZGF0ZUF0dHJpYnV0ZVNvdXJjZUl0ZW0oaW5kZXgsIHtzZWxlY3RlZF90ZXJtX2xpc3R9KTtcbiAgICB9O1xuXG4gICAgdXBkYXRlTGF0ZXN0RGF0ZSA9IChsYXRlc3RfZGF0ZSkgPT4ge1xuICAgICAgICB0aGlzLnByb3BzLnNldEF0dHJpYnV0ZXMoe2xhdGVzdF9kYXRlfSk7XG4gICAgfTtcblxuICAgIHVwZGF0ZUVhcmxpZXN0RGF0ZSA9IChlYXJsaWVzdF9kYXRlKSA9PiB7XG4gICAgICAgIHRoaXMucHJvcHMuc2V0QXR0cmlidXRlcyh7ZWFybGllc3RfZGF0ZX0pO1xuICAgIH07XG5cbiAgICB1cGRhdGVNYXhOZXdzQXJ0aWNsZXMgPSAobWF4X25ld3NfYXJ0aWNsZXMpID0+IHtcbiAgICAgICAgbWF4X25ld3NfYXJ0aWNsZXMgPSBwYXJzZUludChtYXhfbmV3c19hcnRpY2xlcyk7XG4gICAgICAgIHRoaXMucHJvcHMuc2V0QXR0cmlidXRlcyh7bWF4X25ld3NfYXJ0aWNsZXN9KTtcbiAgICB9O1xuXG4gICAgdXBkYXRlTWF4RXhjZXJwdExlbmd0aCA9IChtYXhfZXhjZXJwdF9sZW5ndGgpID0+IHtcbiAgICAgICAgbWF4X2V4Y2VycHRfbGVuZ3RoID0gcGFyc2VJbnQobWF4X2V4Y2VycHRfbGVuZ3RoKTtcbiAgICAgICAgdGhpcy5wcm9wcy5zZXRBdHRyaWJ1dGVzKHttYXhfZXhjZXJwdF9sZW5ndGh9KTtcbiAgICB9O1xuXG4gICAgdXBkYXRlX2lzX2V4dGVybmFsID0gKGluZGV4LCBpc19leHRlcm5hbCkgPT4ge1xuICAgICAgICB0aGlzLnVwZGF0ZUF0dHJpYnV0ZVNvdXJjZUl0ZW0oaW5kZXgsIHtpc19leHRlcm5hbH0pO1xuICAgIH07XG5cbiAgICB1cGRhdGVfdGF4b25vbXlfdGVybV9tb2RlID0gKGluZGV4LCB0YXhvbm9teV90ZXJtX21vZGUpID0+IHtcbiAgICAgICAgdGhpcy51cGRhdGVBdHRyaWJ1dGVTb3VyY2VJdGVtKGluZGV4LCB7dGF4b25vbXlfdGVybV9tb2RlfSk7XG4gICAgfTtcblxuICAgIHVwZGF0ZV9lbmFibGVkX21vZGUgPSAoaW5kZXgsIHNvdXJjZV9lbmFibGVkKSA9PiB7XG4gICAgICAgIHRoaXMudXBkYXRlQXR0cmlidXRlU291cmNlSXRlbShpbmRleCwge3NvdXJjZV9lbmFibGVkfSlcbiAgICB9O1xuXG5cbiAgICB1cGRhdGVfdGV4dF9vbmx5X21vZGUgPSAodGV4dF9vbmx5X21vZGUpID0+IHtcbiAgICAgICAgdGhpcy5wcm9wcy5zZXRBdHRyaWJ1dGVzKHt0ZXh0X29ubHlfbW9kZX0pO1xuICAgIH07XG5cbiAgICB1cGRhdGVfZGF0ZV9yZXN0cmljdGlvbl9tb2RlID0gKGRhdGVfcmVzdHJpY3Rpb25fbW9kZSkgPT4ge1xuICAgICAgICB0aGlzLnByb3BzLnNldEF0dHJpYnV0ZXMoe2RhdGVfcmVzdHJpY3Rpb25fbW9kZX0pO1xuICAgIH07XG5cblxuICAgIC8qKlxuICAgICAqIFByZXZlbnRzIHVzZXJzIGZyb20gY2xpY2tpbmcgYXdheSBmcm9tIGVkaXRvciBieSBjbGlja2luZyBvbiBhIGxpbmsgaW4gdGhlIHNlcnZlciByZW5kZXJlZCBwb3N0IGxpc3QuXG4gICAgICogQHBhcmFtIGV2ZW50XG4gICAgICovXG4gICAgc3RhdGljIHByZXZlbnRMaW5rKGV2ZW50KSB7XG4gICAgICAgIGlmIChldmVudC5uYXRpdmVFdmVudCkge1xuICAgICAgICAgICAgZXZlbnQubmF0aXZlRXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIGV2ZW50Lm5hdGl2ZUV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICB9XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIFtcblxuICAgICAgICAgICAgPEluc3BlY3RvckNvbnRyb2xzIGtleT0naW5zcGVjdG9yJyA+XG4gICAgICAgICAgICAgICAgPFBhbmVsQm9keVxuICAgICAgICAgICAgICAgICAgICB0aXRsZT17J05ld3MgQmxvY2sgQ29udHJvbHMnfVxuICAgICAgICAgICAgICAgICAgICBpbml0aWFsT3Blbj17dHJ1ZX1cbiAgICAgICAgICAgICAgICA+XG5cbiAgICAgICAgICAgICAgICAgICAgPFRvZ2dsZUNvbnRyb2xcbiAgICAgICAgICAgICAgICAgICAgICAgIGxhYmVsPXsodGhpcy5wcm9wcy5hdHRyaWJ1dGVzLnRleHRfb25seV9tb2RlID8gJ1RleHQtb25seSBtb2RlIChlbmFibGVkKScgOiAnVGV4dC1vbmx5IG1vZGUgKGRpc2FibGVkKScpfVxuICAgICAgICAgICAgICAgICAgICAgICAgY2hlY2tlZD17dGhpcy5wcm9wcy5hdHRyaWJ1dGVzLnRleHRfb25seV9tb2RlfVxuICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9e3RoaXMudXBkYXRlX3RleHRfb25seV9tb2RlfVxuICAgICAgICAgICAgICAgICAgICAgICAgaGVscD17dGhpcy5wcm9wcy5hdHRyaWJ1dGVzLnRleHRfb25seV9tb2RlID8gJ0hpZGUgaW1hZ2VzIGZyb20gb3V0cHV0JyA6ICdTaG93IGltYWdlcyBpbiBvdXRwdXQnfVxuICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICA8VG9nZ2xlQ29udHJvbFxuICAgICAgICAgICAgICAgICAgICAgICAgbGFiZWw9eyh0aGlzLnByb3BzLmF0dHJpYnV0ZXMuZGF0ZV9yZXN0cmljdGlvbl9tb2RlID8gJ0RhdGUgZmlsdGVyIChlbmFibGVkKScgOiAnRGF0ZSBmaWx0ZXIgKGRpc2FibGVkKScpfVxuICAgICAgICAgICAgICAgICAgICAgICAgY2hlY2tlZD17dGhpcy5wcm9wcy5hdHRyaWJ1dGVzLmRhdGVfcmVzdHJpY3Rpb25fbW9kZX1cbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLnVwZGF0ZV9kYXRlX3Jlc3RyaWN0aW9uX21vZGV9XG4gICAgICAgICAgICAgICAgICAgICAgICBoZWxwPXt0aGlzLnByb3BzLmF0dHJpYnV0ZXMuZGF0ZV9yZXN0cmljdGlvbl9tb2RlID8gJ1Nob3cgcG9zdHMgZnJvbSBhIHNwZWNpZmljIGRhdGUgcmFuZ2UnIDogJ0N1cnJlbnRseSBzaG93aW5nIHRoZSBtb3N0IHJlY2VudCBwb3N0cyd9XG4gICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgIHsodGhpcy5wcm9wcy5hdHRyaWJ1dGVzLmRhdGVfcmVzdHJpY3Rpb25fbW9kZSkgP1xuICAgICAgICAgICAgICAgICAgICAgICAgPEZyYWdtZW50ID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8VGV4dENvbnRyb2xcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZT17J2RhdGUnfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZT17dGhpcy5wcm9wcy5hdHRyaWJ1dGVzLmVhcmxpZXN0X2RhdGV9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhYmVsPXsnRWFybGllc3QgRGF0ZSd9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLnVwZGF0ZUVhcmxpZXN0RGF0ZX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxUZXh0Q29udHJvbFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlPXsnZGF0ZSd9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlPXt0aGlzLnByb3BzLmF0dHJpYnV0ZXMubGF0ZXN0X2RhdGV9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhYmVsPXsnTGF0ZXN0IERhdGUnfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17dGhpcy51cGRhdGVMYXRlc3REYXRlfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L0ZyYWdtZW50ID5cbiAgICAgICAgICAgICAgICAgICAgICAgIDpcbiAgICAgICAgICAgICAgICAgICAgICAgIFtdXG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICA8VGV4dENvbnRyb2xcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU9eydudW1iZXInfVxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU9e3RoaXMucHJvcHMuYXR0cmlidXRlcy5tYXhfbmV3c19hcnRpY2xlc31cbiAgICAgICAgICAgICAgICAgICAgICAgIGxhYmVsPXsnTWF4IG5ld3MgYXJ0aWNsZXMnfVxuICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9e3RoaXMudXBkYXRlTWF4TmV3c0FydGljbGVzfVxuICAgICAgICAgICAgICAgICAgICAgICAgbWluPXsxfVxuICAgICAgICAgICAgICAgICAgICAgICAgbWF4PXsyMH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHN0ZXA9ezF9XG4gICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgIDxUZXh0Q29udHJvbFxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZT17J251bWJlcid9XG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZT17dGhpcy5wcm9wcy5hdHRyaWJ1dGVzLm1heF9leGNlcnB0X2xlbmd0aH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGxhYmVsPXsnTWF4IGV4Y2VycHQgd29yZCBjb3VudCd9XG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17dGhpcy51cGRhdGVNYXhFeGNlcnB0TGVuZ3RofVxuICAgICAgICAgICAgICAgICAgICAgICAgbWluPXswfVxuICAgICAgICAgICAgICAgICAgICAgICAgbWF4PXsxMDB9XG4gICAgICAgICAgICAgICAgICAgICAgICBzdGVwPXsxfVxuICAgICAgICAgICAgICAgICAgICAvPlxuXG4gICAgICAgICAgICAgICAgPC9QYW5lbEJvZHkgPlxuICAgICAgICAgICAgICAgIDxQYW5lbEJvZHlcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU9eydOZXdzIEJsb2NrIFNvdXJjZXMnfVxuICAgICAgICAgICAgICAgICAgICBpbml0aWFsT3Blbj17dHJ1ZX1cbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgIHsodGhpcy5wcm9wcy5hdHRyaWJ1dGVzLnNvdXJjZXMubGVuZ3RoID4gMClcbiAgICAgICAgICAgICAgICAgICAgICAgID9cbiAgICAgICAgICAgICAgICAgICAgICAgIDxGcmFnbWVudCA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge3RoaXMuc3RhdGUuc291cmNlcy5tYXAoKHNvdXJjZSwga2V5KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAodGhpcy5zdGF0ZS5zb3VyY2VzICYmIHRoaXMuc3RhdGUuc291cmNlc1sga2V5IF0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8RnJhZ21lbnQga2V5PXtrZXl9ID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8UGFuZWxSb3cga2V5PXtrZXl9ID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPFRvZ2dsZUNvbnRyb2xcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhYmVsPXsoc291cmNlLnNvdXJjZV9lbmFibGVkID8gJ1NvdXJjZSAjJyArIChrZXkgKyAxKSArICcgRW5hYmxlZCcgOiAnU291cmNlICcgKyAoa2V5ICsgMSkgKyAnIERpc2FibGVkJyl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGVja2VkPXtzb3VyY2Uuc291cmNlX2VuYWJsZWR9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17KHZhbHVlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy51cGRhdGVfZW5hYmxlZF9tb2RlKGtleSwgdmFsdWUpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvUGFuZWxSb3cgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsoc291cmNlLnNvdXJjZV9lbmFibGVkKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtdXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPFBhbmVsUm93ID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxhIGhyZWY9eycjJ30gb25DbGljaz17KGUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRlbGV0ZVNvdXJjZShrZXkpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9fSA+eydEZWxldGUgU291cmNlICcgKyAoa2V5ICsgMSl9PC9hID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9QYW5lbFJvdyA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9GcmFnbWVudCA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbXVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAgICAgICAgICA8L0ZyYWdtZW50ID5cbiAgICAgICAgICAgICAgICAgICAgICAgIDpcbiAgICAgICAgICAgICAgICAgICAgICAgIDxQYW5lbFJvdyA+QWRkIHNvdXJjZXM8L1BhbmVsUm93ID5cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICA8UGFuZWxSb3cgPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBvbkNsaWNrPXt0aGlzLmluc2VydFNvdXJjZX0gPkFkZCBhbm90aGVyIHNvdXJjZTwvYnV0dG9uID5cbiAgICAgICAgICAgICAgICAgICAgPC9QYW5lbFJvdyA+XG4gICAgICAgICAgICAgICAgPC9QYW5lbEJvZHkgPlxuICAgICAgICAgICAgICAgIHsodGhpcy5wcm9wcy5hdHRyaWJ1dGVzLnNvdXJjZXMubGVuZ3RoID4gMClcbiAgICAgICAgICAgICAgICAgICAgP1xuXG4gICAgICAgICAgICAgICAgICAgIDxGcmFnbWVudCA+XG4gICAgICAgICAgICAgICAgICAgICAgICB7dGhpcy5zdGF0ZS5zb3VyY2VzLm1hcCgoc291cmNlLCBrZXkpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8TmV3c19ibG9ja19jb21wb25lbnRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtleT17a2V5fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWFwX2tleT17a2V5fSAvLyByZWFjdCBkb2Vzbid0IGxldCBjaGlsZCBjb21wb25lbnRzIHNlZSB0aGUgc3BlY2lhbCAna2V5JyBwcm9wZXJ0eSwgc28gd2UgcGFzcyBpdCBhIHNlY29uZCB0aW1lIHRvIGEgZGlmZmVyZW50IHByb3AgdGhleSBjYW4gdXNlXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlPXsnU291cmNlICMnICsgKGtleSArIDEpICsgJyBwcm9wZXJ0aWVzJ31cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXNfZXh0ZXJuYWw9e3NvdXJjZS5pc19leHRlcm5hbH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVwZGF0ZV9pc19leHRlcm5hbD17KHZhbHVlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy51cGRhdGVfaXNfZXh0ZXJuYWwoa2V5LCB2YWx1ZSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH19XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJsb2dfaWQ9e3NvdXJjZS5ibG9nX2lkfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2l0ZXM9e3RoaXMuc3RhdGUuc291cmNlc1sga2V5IF0uc2l0ZXN9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1cGRhdGVTaXRlPXsodmFsdWUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZVNpdGUoa2V5LCB2YWx1ZSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH19XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBvc3RfdHlwZT17c291cmNlLnBvc3RfdHlwZX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBvc3RfdHlwZXM9e3RoaXMuc3RhdGUuc291cmNlc1sga2V5IF0ucG9zdF90eXBlc31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVwZGF0ZVBvc3RUeXBlPXsodmFsdWUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZVBvc3RUeXBlKGtleSwgdmFsdWUpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9fVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YXhvbm9teT17c291cmNlLnRheG9ub215fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGF4b25vbWllcz17dGhpcy5zdGF0ZS5zb3VyY2VzWyBrZXkgXS50YXhvbm9taWVzfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdXBkYXRlVGF4b25vbXk9eyh2YWx1ZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlVGF4b25vbXkoa2V5LCB2YWx1ZSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH19XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRheG9ub215X3Rlcm1fbW9kZT17c291cmNlLnRheG9ub215X3Rlcm1fbW9kZX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVwZGF0ZV90YXhvbm9teV90ZXJtX21vZGU9eyh2YWx1ZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlX3RheG9ub215X3Rlcm1fbW9kZShrZXksIHZhbHVlKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfX1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWRfdGVybV9saXN0PXtzb3VyY2Uuc2VsZWN0ZWRfdGVybV9saXN0fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGVybXM9e3RoaXMuc3RhdGUuc291cmNlc1sga2V5IF0udGVybXN9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1cGRhdGVTZWxlY3RlZFRlcm1zPXsodmFsdWUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZVNlbGVjdGVkVGVybXMoa2V5LCB2YWx1ZSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH19XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJzc191cmw9e3NvdXJjZS5yc3NfdXJsfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdXBkYXRlUlNTVXJsPXsodmFsdWUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZVJTU1VybChrZXksIHZhbHVlKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfX1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgICAgICA8L0ZyYWdtZW50ID5cbiAgICAgICAgICAgICAgICAgICAgOlxuICAgICAgICAgICAgICAgICAgICA8ZGl2ID5ObyBhY3RpdmUgc291cmNlczwvZGl2ID5cbiAgICAgICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgPC9JbnNwZWN0b3JDb250cm9scyA+XG5cbiAgICAgICAgICAgICxcbiAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJvdmVybGF5cGFnZVwiXG4gICAgICAgICAgICAgICAgb25DbGlja0NhcHR1cmU9e3RoaXMuY29uc3RydWN0b3IucHJldmVudExpbmt9ID5cbiAgICAgICAgICAgICAgICA8U2VydmVyU2lkZVJlbmRlclxuICAgICAgICAgICAgICAgICAgICBibG9jaz1cInNjaHJhdWdlci9uZXdzLWJsb2NrXCJcbiAgICAgICAgICAgICAgICAgICAgYXR0cmlidXRlcz17dGhpcy5wcm9wcy5hdHRyaWJ1dGVzfVxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8L2RpdiA+XG5cbiAgICAgICAgXTtcblxuICAgIH1cblxuXG59XG5cblxucmVnaXN0ZXJCbG9ja1R5cGUoXG4gICAgJ3NjaHJhdWdlci9uZXdzLWJsb2NrJywge1xuICAgICAgICB0aXRsZTogX18oJ05ld3MgQmxvY2snLCAnbmV3cy1ibG9jay1mb3ItZ3V0ZW5iZXJnJyksXG4gICAgICAgIGRlc2NyaXB0aW9uOiBfXygnTGlzdHMgdGhlIG1vc3QgcmVjZW50IHBvc3RzIGZyb20gbmV3ZXN0IHRvIG9sZGVzdCwgd2l0aCB0aGUgYWJpbGl0eSB0byBwdWxsIGluIGFuZCBzb3J0IGZyb20gbXVsdGlwbGUgaW50ZXJuYWwgYW5kIGV4dGVybmFsIHNvdXJjZXMuJywgJ25ld3MtYmxvY2stZm9yLWd1dGVuYmVyZycpLFxuICAgICAgICBpY29uOiAnd2VsY29tZS13aWRnZXRzLW1lbnVzJyxcbiAgICAgICAgY2F0ZWdvcnk6ICdlbWJlZCcsXG4gICAgICAgIGF0dHJpYnV0ZXM6IHtcbiAgICAgICAgICAgIC8vIG5lZWQgYWJpbGl0eSBmb3IgdHdvIG9yIG1vcmUgc291cmNlcy4gcHJvYmFibHkgcmVwZWF0aW5nIGZpZWxkLlxuICAgICAgICAgICAgLy8gb25lIHNvdXJjZSBvcHRpb24gaXMgbG9jYWwsIGFuZCB0aGVuIHlvdSBjaG9vc2UgdGhlIGJsb2cgKGdlbmVyYWxseSAxIGllIG1haW4gYmxvZylcbiAgICAgICAgICAgIC8vIGFub3RoZXIgc291cmNlIGlzIGxvY2FsIGFuZCBtdXN0IGJlIGFuIHJzcyBmZWVkLiB1c2UgdXJsIHBhcmFtZXRlcnMgdG8gZmlsdGVyIGV4dGVybmFsIG5ld3NcbiAgICAgICAgICAgIHNvdXJjZXM6IHtcbiAgICAgICAgICAgICAgICB0eXBlOiAnYXJyYXknLFxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6IFtcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgc291cmNlX2VuYWJsZWQ6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICBpc19leHRlcm5hbDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHJzc191cmw6ICcnLFxuICAgICAgICAgICAgICAgICAgICAgICAgYmxvZ19pZDogMSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHBvc3RfdHlwZTogJycsXG4gICAgICAgICAgICAgICAgICAgICAgICB0YXhvbm9teTogJycsXG4gICAgICAgICAgICAgICAgICAgICAgICB0YXhvbm9teV90ZXJtX21vZGU6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWRfdGVybV9saXN0OiBbXVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB0ZXh0X29ubHlfbW9kZToge3R5cGU6ICdib29sZWFuJywgZGVmYXVsdDogZmFsc2V9LFxuICAgICAgICAgICAgZGF0ZV9yZXN0cmljdGlvbl9tb2RlOiB7dHlwZTogJ2Jvb2xlYW4nLCBkZWZhdWx0OiBmYWxzZX0sXG4gICAgICAgICAgICBlYXJsaWVzdF9kYXRlOiB7dHlwZTogJ2RhdGUnLCBkZWZhdWx0OiBudWxsfSxcbiAgICAgICAgICAgIGxhdGVzdF9kYXRlOiB7dHlwZTogJ2RhdGUnLCBkZWZhdWx0OiBudWxsfSxcbiAgICAgICAgICAgIG1heF9uZXdzX2FydGljbGVzOiB7dHlwZTogJ251bWJlcicsIGRlZmF1bHQ6IDV9LFxuICAgICAgICAgICAgbWF4X2V4Y2VycHRfbGVuZ3RoOiB7dHlwZTogJ251bWJlcicsIGRlZmF1bHQ6IDU1fSxcbiAgICAgICAgfSxcblxuICAgICAgICBlZGl0OiBuZXdzX2Jsb2NrLFxuXG4gICAgICAgIHNhdmUoe3Byb3BzLCBjbGFzc05hbWV9KSB7XG5cbiAgICAgICAgICAgIC8vIHRoaXMgY2FuIHNpbXBseSByZXR1cm4gJ251bGwnLCB3aGljaCB0ZWxscyB3b3JkcHJlc3MgdG8ganVzdCBzYXZlIHRoZSBpbnB1dCBhdHRyaWJ1dGVzLlxuICAgICAgICAgICAgLy8gaG93ZXZlciwgYnkgYWN0dWFsbHkgc2F2aW5nIHRoZSBodG1sLCB0aGlzIHNhdmVzIHRoZSBodG1sIGluIHRoZSBkYXRhYmFzZSBhcyB3ZWxsLCB3aGljaCBtZWFuc1xuICAgICAgICAgICAgLy8gdGhhdCBvdXIgcGx1Z2luIGNhbiBiZSBkaXNhYmxlZCBhbmQgdGhlIG9sZCBwYWdlcyB3aWxsIHN0aWxsIGhhdmUgaWZyYW1lIGh0bWwuIGhvd2V2ZXIsIGlmIGFuIHVucHJpdmlsZWdlZFxuICAgICAgICAgICAgLy8gdXNlciBlZGl0cyB0aGF0IHBhZ2UsIHRoZSBpZnJhbWUgY29kZSB3aWxsIGJlIHN0cmlwcGVkIG91dCB1cG9uIHNhdmluZy5cbiAgICAgICAgICAgIC8vIGR1ZSB0byB0aGUgaHRtbCBmaWx0ZXJpbmcsIHRoaXMgcmV0dXJuIGlzIG5vdCBzdHJpY3RseSB1c2VkLCBhcyB0aGUgc2VydmVyLXNpZGUgcmVuZGVyIG1ldGhvZCBvdmVyd3JpdGVzXG4gICAgICAgICAgICAvLyB0aGlzIHdoZW4gcHJpbnRpbmcgb250byB0aGUgcGFnZSAoYnV0IHRoYXQgYWxsb3dzIHVzIHRvIHByaW50IG91dCByYXcgaHRtbCB3aXRob3V0IGZpbHRlcmluZywgcmVnYXJkbGVzcyBvZiB1c2VyKS5cbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG5cbiAgICB9KTtcbiJdLCJuYW1lcyI6WyJyZWdpc3RlckJsb2NrVHlwZSIsIndwIiwiYmxvY2tzIiwiZWxlbWVudCIsImNyZWF0ZUVsZW1lbnQiLCJDb21wb25lbnQiLCJGcmFnbWVudCIsIkluc3BlY3RvckNvbnRyb2xzIiwiZWRpdG9yIiwiU2VydmVyU2lkZVJlbmRlciIsInNlcnZlclNpZGVSZW5kZXIiLCJjb21wb25lbnRzIiwiVGV4dENvbnRyb2wiLCJTZWxlY3RDb250cm9sIiwiQnV0dG9uIiwiUGFuZWxCb2R5IiwiUGFuZWxSb3ciLCJUb2dnbGVDb250cm9sIiwiVVJMSW5wdXRCdXR0b24iLCJkYXRhIiwicmVnaXN0ZXJTdG9yZSIsIndpdGhTZWxlY3QiLCJfXyIsImkxOG4iLCJhcGlGZXRjaCIsIk5ld3NfYmxvY2tfY29tcG9uZW50X2ludGVybmFsIiwicmVuZGVyIiwicHJvcHMiLCJibG9nX2lkIiwic2l0ZXMiLCJ1cGRhdGVTaXRlIiwicG9zdF90eXBlIiwicG9zdF90eXBlcyIsInVwZGF0ZVBvc3RUeXBlIiwidGF4b25vbXkiLCJ0YXhvbm9taWVzIiwidXBkYXRlVGF4b25vbXkiLCJ0YXhvbm9teV90ZXJtX21vZGUiLCJ2YWx1ZSIsInVwZGF0ZV90YXhvbm9teV90ZXJtX21vZGUiLCJzZWxlY3RlZF90ZXJtX2xpc3QiLCJ0ZXJtcyIsInVwZGF0ZVNlbGVjdGVkVGVybXMiLCJOZXdzX2Jsb2NrX2NvbXBvbmVudF9leHRlcm5hbCIsInJzc191cmwiLCJ1cGRhdGVSU1NVcmwiLCJOZXdzX2Jsb2NrX2NvbXBvbmVudCIsImF1dG9PcGVuIiwiaXNfZXh0ZXJuYWwiLCJsZW5ndGgiLCJ0aXRsZSIsInVwZGF0ZV9pc19leHRlcm5hbCIsIm5ld3NfYmxvY2siLCJzb3VyY2VzIiwib2JqIiwicHJlZml4X2ZpbHRlciIsIk9iamVjdCIsImdldE93blByb3BlcnR5TmFtZXMiLCJmaWx0ZXIiLCJpdGVtIiwic3RhcnRzV2l0aCIsImFyZ3VtZW50cyIsImluc2VydEludG9Tb3VyY2VBcnJheVN0YXRlIiwic2luZ2xlX3NvdXJjZSIsIm5ld19zb3VyY2Vfc3RhdGUiLCJsYWJlbCIsImRpc2FibGVkIiwic291cmNlX2VuYWJsZWQiLCJjb25zdHJ1Y3RvciIsImF0dHJpYnV0ZXNNZXJnZSIsInNldFN0YXRlIiwicHJldmlvdXNTdGF0ZSIsInN0YXRlX3NvdXJjZXMiLCJzbGljZSIsInB1c2giLCJnZXRTaXRlcyIsInN0YXRlIiwiaW5zZXJ0U291cmNlIiwibmV3X3NvdXJjZV9hdHRyaWJ1dGVzIiwiYXR0cmlidXRlc19zb3VyY2VzIiwiSlNPTiIsInBhcnNlIiwic3RyaW5naWZ5IiwibWFwIiwic2luZ2xlX2luZGV4Iiwic2V0QXR0cmlidXRlcyIsImRlbGV0ZVNvdXJjZSIsImluZGV4IiwicmVtYWluaW5nX3NvdXJjZXNfc3RhdGUiLCJzcGxpY2UiLCJyZW1haW5pbmdfc291cmNlcyIsInNldFNvdXJjZUFycmF5U3RhdGUiLCJwcm9taXNlX3Jlc3VsdCIsInBhdGgiLCJ0aGVuIiwib3B0aW9uc19zaXRlX2xpc3QiLCJmb3JFYWNoIiwic2l0ZSIsImdldFBvc3RUeXBlcyIsIm9wdGlvbnNfcG9zdF90eXBlX2xpc3QiLCJnZXRUYXhvbm9taWVzIiwib3B0aW9uc190YXhvbm9teV9saXN0IiwiZ2V0VGVybXMiLCJvcHRpb25zX3Rlcm1zX2xpc3QiLCJ0ZXJtIiwic291cmNlX2luZGV4Iiwid2hpY2hfYXJyYXkiLCJhcnJheV92YWx1ZXMiLCJ1cGRhdGVBdHRyaWJ1dGVTb3VyY2VJdGVtIiwiZGljdGlvbmFyeSIsImtleSIsImtleXMiLCJ2YWx1ZXMiLCJzb3VyY2VzX3dpdGhvdXRfbGlzdHMiLCJ1cGRhdGVMYXRlc3REYXRlIiwibGF0ZXN0X2RhdGUiLCJ1cGRhdGVFYXJsaWVzdERhdGUiLCJlYXJsaWVzdF9kYXRlIiwidXBkYXRlTWF4TmV3c0FydGljbGVzIiwibWF4X25ld3NfYXJ0aWNsZXMiLCJwYXJzZUludCIsInVwZGF0ZU1heEV4Y2VycHRMZW5ndGgiLCJtYXhfZXhjZXJwdF9sZW5ndGgiLCJ1cGRhdGVfZW5hYmxlZF9tb2RlIiwidXBkYXRlX3RleHRfb25seV9tb2RlIiwidGV4dF9vbmx5X21vZGUiLCJ1cGRhdGVfZGF0ZV9yZXN0cmljdGlvbl9tb2RlIiwiZGF0ZV9yZXN0cmljdGlvbl9tb2RlIiwiZ2V0SW5pdGlhbFN0YXRlIiwiYXR0cmlidXRlcyIsInNvdXJjZSIsImUiLCJwcmV2ZW50RGVmYXVsdCIsInN0b3BQcm9wYWdhdGlvbiIsInByZXZlbnRMaW5rIiwiZGVmYXVsdHMiLCJvcHRpb25zIiwiZW50cmllcyIsInVuZGVmaW5lZCIsImV2ZW50IiwibmF0aXZlRXZlbnQiLCJkZXNjcmlwdGlvbiIsImljb24iLCJjYXRlZ29yeSIsInR5cGUiLCJkZWZhdWx0IiwiZWRpdCIsInNhdmUiLCJjbGFzc05hbWUiXSwic291cmNlUm9vdCI6IiJ9