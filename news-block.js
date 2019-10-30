const {registerBlockType} = wp.blocks; //Blocks API
const {createElement} = wp.element; //React.createElement
const {InspectorControls} = wp.editor; //Block inspector wrapper
const {TextControl, SelectControl, ServerSideRender, PanelBody} = wp.components; //Block inspector wrapper


registerBlockType('news-module/news-block', {
    title: 'News Module',
    icon: 'format-aside',
    category: 'embed',
    attributes: {
        // need ability for two or more sources. probably repeating field.
        // one source option is local, and then you choose the blog (generally 1 ie main blog)
        // another source is local and must be an rss feed. use url parameters to filter external news
        title: {type: 'string', default: "Latest News", placeholder: "News header here"},
        blog_id: {type: 'number', default: 2},
        latest_date: {type: 'date', default: null}, //@TODO does nothing
        max_news_articles: {type: 'number', default: 6},
        max_excerpt_length: {type: 'number', default: 55}

    },
    edit: function (props) {
        const attributes = props.attributes;

        //console.log(attributes);

        /**
         * Save playlist id in state. Unset the submitted flag.
         * @param event
         */


        // the TextControl element only returns the value, not the entire event, so we can't create a generic
        // change handler unless we also write a new custom TextControl element that would pass the input key as well.
        // hence, a copy/paste update handler for each input element.
        function updateTitle(title) {
            props.setAttributes({title});
        }

        function updateBlogId(blog_id) {
            blog_id = parseInt(blog_id); // MUST parse integers, or else it will fail to load saved value on page load
            props.setAttributes({blog_id});
        }

        function updateLatestDate(latest_date) {
            props.setAttributes({latest_date});
        }

        function updateMaxNewsArticles(max_news_articles) {
            max_news_articles = parseInt(max_news_articles);
            props.setAttributes({max_news_articles});
        }

        function updateMaxExcerptLength(max_excerpt_length) {
            max_excerpt_length = parseInt(max_excerpt_length);
            props.setAttributes({max_excerpt_length});
        }

        return (
            // if user has not submitted the id (or id is null), render the form. else, render the iframe inside the block
            createElement('div', {}, [
                createElement(wp.editor.RichText, {
                    tagName: 'h3',
                    value: attributes.title,
                    onChange: updateTitle,
                    placeholder: attributes.title.placeholder,
                }),
                createElement(ServerSideRender, {
                    block: 'news-module/news-block',
                    attributes: props.attributes
                }),

                createElement(InspectorControls, {},
                    createElement(PanelBody, {
                            title: 'News Block Controls',
                            initialOpen: true
                        },
                        [
                            createElement(TextControl, {
                                type: 'text',
                                value: attributes.title,
                                label: 'Title',
                                onChange: updateTitle,
                                type: 'string',
                                placeholder: "News header here"
                            }),
                            createElement(TextControl, {
                                type: 'integer',
                                value: attributes.blog_id,
                                label: 'Blog ID',
                                onChange: updateBlogId,
                            }),
                            createElement(TextControl, {
                                type: 'date',
                                value: attributes.latest_date,
                                label: 'Latest Date',
                                onChange: updateLatestDate,
                            }),
                            createElement(TextControl, {
                                type: 'number',
                                value: attributes.max_news_articles,
                                label: 'Max news articles',
                                onChange: updateMaxNewsArticles,
                                min: 1,
                                max: 20,
                                step: 1
                            }),
                            createElement(TextControl, {
                                type: 'number',
                                value: attributes.max_excerpt_length,
                                label: 'Max excerpt word count',
                                onChange: updateMaxExcerptLength,
                                min: 0,
                                max: 100,
                                step: 1
                            })
                        ]
                    )
                )

            ])
        );
    },

    save: function (props) {
        // this can simply return 'null', which tells wordpress to just save the input attributes.
        // however, by actually saving the html, this saves the html in the database as well, which means
        // that our plugin can be disabled and the old pages will still have iframe html. however, if an unprivileged
        // user edits that page, the iframe code will be stripped out upon saving.
        // due to the html filtering, this return is not strictly used, as the server-side render method overwrites
        // this when printing onto the page (but that allows us to print out raw html without filtering, regardless of user).
        return null;
    }

});



