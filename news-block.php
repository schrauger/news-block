<?php
/*
Plugin Name: News Block
Plugin URI: https://github.com/schrauger/news-block
Description: WordPress Block for embedding COM and UCF Health news articles.
Version: 1.5.1
Author: Stephen Schrauger
Author URI: https://github.com/schrauger/news-block
License: GPL2
*/

//locate_template( 'simple_html_dom.php', true, true );
require_once( 'news-block-excerpt.php' );
require_once( 'news-block-endpoint.php' );
require_once( 'simple_html_dom.php' );


class news_block {

	/**
	 * register the react script for a block, and also define
	 * the server side render callback to allow for raw html.
	 */
	public static function load_news_block() {

		wp_enqueue_style(
			'news-block-plugin-style',
			plugins_url( 'css/news-block.css', __FILE__ ), // this will load the current theme's style.css file, not necessarily the parent theme style.
			false,
			filemtime( plugin_dir_path( __FILE__ ) . 'css/news-block.css' ),
			false
		);

		wp_register_script(
			'news-block-js',
			plugins_url( 'js/news-block.build.js', __FILE__ ),
			[ 'wp-blocks', 'wp-editor', 'wp-data', 'wp-element', 'wp-i18n', 'wp-components' ],
			filemtime( plugin_dir_path( __FILE__ ) . 'js/news-block.build.js' )
		);

		register_block_type(
			'schrauger/news-block',
			[
				'editor_script'   => 'news-block-js',
				'render_callback' => [ 'news_block', 'render_news_callback' ],
				// attributes must be defined here as well as on the client-side js file
				'attributes'      => self::block_atts(),
				//'attributes'      => [ 'blog_id' => ['type' => 'integer', 'default' => 1], 'taxonomy' => ['type' => 'string'], 'taxonomy_term_mode'=> ['type' => 'string'], 'latest_date'=> ['type' => 'string'],'max_news_articles'=> ['type' => 'string'],'max_excerpt_length'=> ['type' => 'string'] ]// self::shortcode_atts()
			]
		);
	}

	/**
	 * Apply defaults to specified attributes if attribute is not defined by the user.
	 *
	 * @param array $attributes
	 *
	 * @return array
	 */
	public static function block_atts() {

		return [
			'sources'               => [
				'type'    => 'array',
				'default' => '',
				'query'   => [
					'source_enabled'     => [
						'type'    => 'boolean',
						'default' => true
					],
					'is_external'        => [
						'type'    => 'boolean',
						'default' => false
						// when false, use internal query. when true, use external rss
					],
					'blog_id'            => [
						'type'    => 'integer',
						'default' => 1 //get_current_blog_id()
					],
					'post_type'          => [
						'type'    => 'string',
						'default' => 'news'
					],
					'taxonomy'           => [
						'type'    => 'string',
						'default' => 'news_category'
					],
					'taxonomy_term_mode' => [
						'type'    => 'boolean',
						'default' => false
						// when false, use blacklist (any taxonomies listed will NOT show up). when true, use whitelist (only taxonomies listed will show up)
					],
					'selected_term_list' => [
						'type'    => 'array',
						'default' => [],
						'items'   => [
							'type' => 'string'
						]
					],
					'rss_url'            => [
						'type'    => 'string',
						'default' => ''
					]
				]

			],
			'text_only_mode'        => [
				'type'    => 'boolean',
				'default' => false
				// when true, add a class to inhibit pictures
			],
			'date_restriction_mode' => [
				'type'    => 'boolean',
				'default' => false
				// when false, use blacklist (any taxonomies listed will NOT show up). when true, use whitelist (only taxonomies listed will show up)
			],
			'earliest_date'         => [
				'type'    => 'date',
				'default' => null
			],
			'latest_date'           => [
				'type'    => 'date',
				'default' => null
			],
			'max_news_articles'     => [
				'type'    => 'integer',
				'default' => 5
			],
			'max_excerpt_length'    => [
				'type'    => 'integer',
				'default' => 55
			],
			'className'             => [
				// this is the attribute created if the user chooses 'additional css class' for the block
				'type'    => 'string',
				'default' => ''
			]
		];

		//return shortcode_atts( $defaults, $attributes );
	}

	/** Prepends the $content with the current post thumbnail if exists - <p>{thumbnail}</p>$content
	 *
	 * @param $content
	 *
	 * @return string
	 */
	public static function wcs_post_thumbnails_in_feeds( $content ) {
		global $post;
		if ( has_post_thumbnail( $post->ID ) ) {
			$content = '<p>' . get_the_post_thumbnail( $post->ID ) . '</p>' . $content;
		}

		return $content;
	}

	// Custom excerpt word count length for copy, with the 'more' elipsis counting as one of the words
	public static function excerpt_length( $length = 8) {
		return 8;
	}

	// Custom excerpt ellipses
	public static function excerpt_more( $more_string = '...') {
		return '...';
	}


	/**
	 * Overwrites the client side 'save' method with our own data. This allows us to print out raw html without
	 * filtering it based on user permissions, so we can embed an iframe.
	 *
	 * @param $attributes // input elements from the client
	 * @param $content    // post-filtered html from the client-side 'save' method. we don't use it here, instead we
	 *                    create our own html.
	 *
	 * @return string // like shortcode callbacks, this is the html that we render in place of the block.
	 */
	public static function render_news_callback( $attributes, $content ) {

		$return_rendered_html = "";

		// if text-only, set a class that css will use to hide images.
		$classes   = [ 'news' ];
		$text_only = false;
		if ( ( $attributes[ 'text_only_mode' ] === true ) || ( $attributes[ 'text_only_mode' ] === 'true' ) ) {
			$classes[] = 'text-only';
			$text_only = true;
		} else {
			$classes[] = 'images';
		}
		// adds support for 'additional css class' in the advanced section of any block
		if ( $attributes[ 'className' ] ) {
			$classes[] = $attributes[ 'className' ];
		}

		$classes_string       = implode( ' ', $classes );
		$return_rendered_html .= "<section class='{$classes_string}'>";


		$attributes[ 'sources' ] = $attributes[ 'sources' ];
		// loop through all our sources and build an array with all the posts
		$news_posts = [];
		foreach ( $attributes[ 'sources' ] as $source ) {
			//print_r( $source );
			if ( ( $source[ 'source_enabled' ] === true ) || ( $source[ 'source_enabled' ] === 'true' ) ) {
				if ( ( $source[ 'is_external' ] === false ) || ( $source[ 'is_external' ] === 'false' ) ) { //
					// internal source
					$internal_posts = self::internal_site_query( $attributes, $source );
					if ( count( $internal_posts ) > 0 ) {
						$news_posts = array_merge( $news_posts, $internal_posts );
					}
				} else {
					// external source
					$external_posts = self::external_site_query( $attributes, $source );
					if ( count( $external_posts ) > 0 ) {
						$news_posts = array_merge( $news_posts, $external_posts );
					}
				}
			} else {
				//disabled source. do nothing.
			}
		}

		// sort all the posts by date
		usort( $news_posts, function ( $a, $b ) {
			return strtotime( $a[ 'datesort' ] ) < strtotime( $b[ 'datesort' ] );
		} );

		// trim down our array based on the max number we want to display
		$news_posts = array_slice( $news_posts, 0, $attributes[ 'max_news_articles' ] );
		// finally, print out all the posts
		if ( is_array($news_posts) && sizeof( $news_posts ) > 0 ) {
			foreach ( $news_posts as $post ) {

				$youtube_html = "";
				if ( $post[ 'youtube_video_id' ] ) {
					$youtube_html = "
                        <aside class='go-to' >
                            <a href='{$post[ 'permalink' ]}' >Go to Article</a >
                        </aside >
                    ";
				}

				$notification_html = "";
				if ( $post[ 'notification_type' ] ) {
					$notification_html = "
                        <span class='notification' >{$post[ 'notification_type' ]}</span>
                    ";
				}

				$image_html = "";
				if ( ! $text_only ) {
					$image_html = "
					<a 
                            target='{$post['target']}' 
                            class='photo-prev' 
                            href='{$post['permalink']}'
                            style='background: url(\"{$post[ 'image' ]}\") no-repeat center center; background-size: cover;'>
                        {$post['title']}
                    </a>
                    ";
				}

				$return_rendered_html .= "
                    <article>
                        {$image_html}
                        {$youtube_html}
                        <a 
                                href='{$post['permalink']}' 
                                alt='${post['title']}'
                                title='${post['title']}'>
                            ${post['title']}
                        </a>
                        <small>
                            {$notification_html}
                            {$post['date']}
                        </small>
                        <p>{$post['piece']}</p>
                    </article>
                        
                
                ";
			}

			$return_rendered_html .= "</section>";

			return $return_rendered_html;
		} else {
			return "No posts found"; //@TODO style
		}
	}


	/**
	 * Runs a query on the internal site, based on the taxonomy terms specified
	 *
	 * @param $attributes attributes shared by all sources, such as max_articles, excerpt_length, and date restrictions
	 * @param $source     specifics about the internal source, such as the blog_id, selected_terms, post_type, and
	 *                    others
	 *
	 * @return WP_Query
	 */
	public static function internal_site_query( $attributes, $source ) {
		$return_news_posts = [];

		$switched_blog = false;
		if (is_multisite()) {
			if ( get_current_blog_id() != $source[ 'blog_id' ] ) {
				switch_to_blog( $source[ 'blog_id' ] );
				$switched_blog = true;
			}
		}
		$tax_query = self::tax_query( $source );

		$query_args = [];
		$query_args = array_merge( $query_args, [
			'post_type'      => $source[ 'post_type' ],
			'posts_per_page' => $attributes[ 'max_news_articles' ],
		] );

		// restrict to selected terms from taxonomy
		if ( is_array($tax_query) && sizeof( $tax_query ) > 0 ) {
			$query_args = array_merge( $query_args, [
				'tax_query' => [ $tax_query ], // must be inside an array
			] );
		}


		// restrict to articles posted within date range
		if ( $attributes[ 'date_restriction_mode' ] ) {
			$query_args = array_merge( $query_args, [
				'date_query' => [
					[
						'before'    => $attributes[ 'latest_date' ],
						'after'     => $attributes[ 'earliest_date' ],
						'inclusive' => true
					]
				]
			] );
		}

		// For some reason, going directly to the endpoint in a browser tab results in no news posts. A filter
		// is adding 'AND 1=2' to our query. To view the posts directly from json (ie when debugging), you need to suppress filters.
		// Inside a normal page when using the block, it doesn't matter.
		//		$query_args = array_merge($query_args, [
		//			'suppress_filters' => false,
		//		]);

		$the_query = new WP_Query( $query_args );

		new news_block_excerpt( $attributes[ 'max_excerpt_length' ] );

		while ( $the_query->have_posts() ) {
			$the_query->the_post();

			$news_image_array = wp_get_attachment_image_src( get_post_thumbnail_id(), 'large' );

			$news_image = $news_image_array[ 0 ];
			if (!$news_image){
				$news_image = plugins_url("images/default.jpg", __FILE__);
			}

			// add all (5) COM articles to array
			array_push( $return_news_posts, [
				'image'     => $news_image,
				'permalink' => get_the_permalink(),
				'title'     => get_the_title(),
				'piece'     => get_the_excerpt(),
				'datesort'  => get_the_date( 'Y-m-d H:i:s T' ),
				'date'      => get_the_date(),
				'class'     => get_post_class( 'news-preview-image' ),
				'target'    => ''
			] );
		}


		wp_reset_postdata();

		if ( $switched_blog ) {
			restore_current_blog();
		}

		return $return_news_posts;
	}

	/**
	 * Returns a transient lifetime of 10 minutes
	 * @return int
	 */
	public static function external_site_transient_lifetime() {
		return 600;
	}

	/**
	 * Disables the filter that prevents unsafe urls from loading.
	 *
	 * @param $args
	 *
	 * @return mixed
	 */
	public static function disable_safety_filter( $args ) {
		$args[ 'reject_unsafe_urls' ] = false;

		return $args;
	}

	/**
	 * Gets the feed from a url. If that url resolves to an internally routable ip address in a specified list of
	 * domains, it disables 'reject_unsafe_urls' to allow the request to continue.
	 *
	 * @param $url
	 *
	 * @return mixed
	 */
	public static function external_site_query_feed( $url ) {
		$url_array = parse_url( $url );
		$host      = $url_array[ 'host' ];

		//@TODO hardcoded value; perhaps make this into an admin-accessible option
		$allowed_unsafe_domains = [
			'ucfhealth.com',
			'med.ucf.edu'
		];

		$safety_disabled = false;
		if ( array_search( $host, $allowed_unsafe_domains ) !== false ) {
			$safety_disabled = true;
			add_filter( 'http_request_args', array( __CLASS__, 'disable_safety_filter' ) );
		}

		add_filter( 'wp_feed_cache_transient_lifetime', array(
			__CLASS__,
			'external_site_transient_lifetime'
		) ); // refresh every 10 minutes
		$feed = fetch_feed( $url );
		remove_filter( 'wp_feed_cache_transient_lifetime', array( __CLASS__, 'external_site_transient_lifetime' ) );

		// restore filter after making our request
		if ( $safety_disabled ) {
			remove_filter( 'http_request_args', array( __CLASS__, 'disable_safety_filter' ) );
		}

		return $feed;
	}


	public static function external_site_query( $attributes, $source ) {
		$news_posts = [];
		$feed       = self::external_site_query_feed( $source[ 'rss_url' ] );
		if ( ! is_wp_error( $feed ) ) {
			$max_items  = $feed->get_item_quantity( $attributes[ 'max_news_articles' ] );
			$feed_items = $feed->get_items( 0, $max_items );

			foreach ( $feed_items as $item ) {
				/* @var SimplePie_Item $item */

				/* get thumbnail */
				$htmlDOM = new com\schrauger\news_block\simple_html_dom();
				$htmlDOM->load( $item->get_content() );
				$image     = $htmlDOM->find( 'img', 0 );
				$image_url = $image->src;

				// remove images for description
				$image->outertext = '';
				$htmlDOM->save();

				$content_minus_image = wp_trim_words( $htmlDOM, apply_filters('excerpt_length', self::excerpt_length() ), apply_filters('excerpt_more', self::excerpt_more()) ); // use any user-defined excerpt lengths to generate our own excerpt for external rss results
				if ( ! isset( $image_url ) ) // if exists
				{
					$image_url = plugins_url("images/default.jpg", __FILE__);
				}

				$UTC         = new DateTimeZone( "UTC" );
				$timezoneEST = new DateTimeZone( "America/New_York" );
				$datesort    = new DateTime( $item->get_date( 'Y-m-d H:i:s' ), $UTC );
				$datesort->setTimezone( $timezoneEST );
				$date = new DateTime( $item->get_date(), $UTC );
				$date->setTimezone( $timezoneEST );

				array_push( $news_posts, array(
					'image'     => $image_url,
					'permalink' => $item->get_link(),
					'title'     => $item->get_title(),
					'piece'     => $content_minus_image,
					'datesort'  => $datesort->format( 'Y-m-d H:i:s T' ),
					'date'      => $date->format( 'F d, Y' ),
					'class'     => 'class="news-preview-image"',
					'target'    => 'target="_blank"'
				) );
			}
		}
		add_filter( 'the_excerpt_rss', array( __CLASS__, 'wcs_post_thumbnails_in_feeds' ) );
		add_filter( 'the_content_feed', array( __CLASS__, 'wcs_post_thumbnails_in_feeds' ) );

		return $news_posts;
	}

	/**
	 * Generates the tax_query array based on attributes
	 *
	 * @param $attributes
	 *
	 * @return array
	 */
	public static function tax_query( $source ) {
		//$attributes = self::shortcode_atts( $attributes );
		$return_array = [];
		if ( $source[ 'taxonomy_term_mode' ] === false || $source[ 'taxonomy_term_mode' ] === 'false') { // type changes from boolean to string depending on if editor or on page. stupid inconsistent WP.
			// whitelist mode.
			$relation = "OR";
			$operator = "IN";
		} else {
			// blacklist mode
			$relation = "AND";
			$operator = "NOT IN";
		}
		// apply AND or OR if specifying more than one slug
		if ((is_array( $source[ 'selected_term_list' ] )) && ( sizeof( $source[ 'selected_term_list' ] ) > 1 )) {
			$return_array[ 'relation' ] = $relation;
		}

		// looping through each term and adding an explicit tax query for each one.
		// we might be able to simply apply all terms to the 'terms' operator as it accepts an array,
		// but I'm not sure what the behaviour is with IN vs NOT IN. we need (OR with IN) and (AND with NOT IN).
		foreach ( (array) $source[ 'selected_term_list' ] as $slug ) {
			array_push( $return_array, [
				'taxonomy' => $source[ 'taxonomy' ],
				'field'    => 'slug',
				'terms'    => $slug,
				'operator' => $operator
			] );
		}
		return $return_array;
	}

	public static function get_network_sites() {

	}

}

// have to use init hook, since there is server-side rendering
add_action( 'init', [ 'news_block', 'load_news_block' ] );



