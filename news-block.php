<?php
/*
Plugin Name: News Block
Plugin URI: https://github.com/schrauger/news-block
Description: WordPress Block for embedding COM and UCF Health news articles.
Version: 0.11.1
Author: Stephen Schrauger
Author URI: https://github.com/schrauger/news-block
License: GPL2
*/

//locate_template( 'simple_html_dom.php', true, true );
require_once( 'news-block-excerpt.php' );
require_once( 'news-block-endpoint.php' );


class news_block {
	/**
	 * Apply defaults to specified attributes if attribute is not defined by the user.
	 *
	 * @param array $attributes
	 *
	 * @return array
	 */
	public static function block_atts( ) {

		return [
			'sources' =>     [
				'type' => 'array',
				'default' => '',
				'query' => [
					'enabled' => [
						'type' => 'boolean',
						'default' => true
					],
					'is_external' => [
						'type' => 'boolean',
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
					'rss_url' => [
						'type' => 'string',
						'default' => ''
					]
				]

			],
			'date_restriction_mode' => [
				'type'    => 'boolean',
				'default' => false
				// when false, use blacklist (any taxonomies listed will NOT show up). when true, use whitelist (only taxonomies listed will show up)
			],
			'earliest_date'        => [
				'type'    => 'date',
				'default' => null
			],
			'latest_date'        => [
				'type'    => 'date',
				'default' => null
			],
			'max_news_articles'  => [
				'type'    => 'integer',
				'default' => 8
			],
			'max_excerpt_length' => [
				'type'    => 'integer',
				'default' => 20
			]
		];

		//return shortcode_atts( $defaults, $attributes );
	}

	/**
	 * register the react script for a block, and also define
	 * the server side render callback to allow for raw html.
	 */
	public static function load_news_block() {


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
	public static function excerpt_length( $length ) {
		return 8;
	}

	// Custom excerpt ellipses
	public static function excerpt_more( $more_string ) {
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

		// loop through all our sources and build an array with all the posts
		$news_posts = [];
		foreach ($attributes['sources'] as $source) {
			if ($source['is_external'] == 'false'){ //
				// internal source
				$internal_posts = self::internal_site_query( $attributes, $source );
				if (count($internal_posts) > 0) {
					array_push($news_posts, $internal_posts);
				}
			} else {
				// external source
			}
		}

		// sort all the posts by date
		usort($news_posts, function($a,$b){
			return strtotime($a['datesort']) < strtotime($b['datesort']);
		});

		// trim down our array based on the max number we want to display
		$news_posts = array_slice( $news_posts, 0, $attributes[ 'max_news_articles' ] );
		// finally, print out all the posts
		if ( sizeof( $news_posts ) > 0 ) {
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

				$return_rendered_html .= "
                    <article>
                        <a 
                                target='{$post['target']}' 
                                class='photo-prev' 
                                href='{$post['permalink']}'
                                style='background: url(\"{$post['image']}\") no-repeat center center; background-size: cover;'>
                            {$post['title']}
                        </a>
                        {$youtube_html}
                        <a 
                                href='{$post['permalink']}' 
                                alt='${post['title']}'
                                title='${post['title']}'>
                            ${post['title']}
                            <small>
                                {$notification_html}
                                {$post['date']}
                            </small>
                        </a>
                        <p>{$post['piece']}</p>
                    </article>
                        
                
                ";
			}

			return $return_rendered_html;
		} else {
			return "No posts found"; //@TODO style
		}
	}


	/**
	 * Runs a query on the internal site, based on the taxonomy terms specified
	 *
	 * @param $attributes attributes shared by all sources, such as max_articles, excerpt_length, and date restrictions
	 * @param $source specifics about the internal source, such as the blog_id, selected_terms, post_type, and others
	 *
	 * @return WP_Query
	 */
	public static function internal_site_query( $attributes, $source ) {
//		var_dump($attributes);
		//$attributes        = self::shortcode_atts( $attributes );
		$return_news_posts = [];

		$switched_blog = false;
		if ( get_current_blog_id() != $source[ 'blog_id' ] ) {
			echo('switching');
			switch_to_blog( $source[ 'blog_id' ] );
			$switched_blog = true;
		}
		$tax_query = self::tax_query( $source );

		$query_args = [];
		$query_args = array_merge($query_args, [
			'post_type'      => $source[ 'post_type' ],
			'posts_per_page' => $attributes[ 'max_news_articles' ],
		]);

		// restrict to selected terms from taxonomy
		if ( sizeof( $tax_query ) > 0 ) {
			$query_args = array_merge($query_args, [
				'tax_query'      => [ $tax_query ], // must be inside an array
			]);
		}


		// restrict to articles posted within date range
		if ($attributes['date_restriction_mode']){
			$query_args = array_merge($query_args, [
				'date_query' => [
					[
						'before' => $attributes['latest_date'],
						'after' => $attributes['earliest_date'],
						'inclusive' => true
					]
				]
			]);
		}

//echo(json_encode($query_args));
		$the_query = new WP_Query( $query_args );
//echo(json_encode($the_query));
		new news_block_excerpt( $attributes[ 'max_excerpt_length' ] );

		while ( $the_query->have_posts() ) {
//echo 'we have a post';
			$the_query->the_post();

			$news_image_array = wp_get_attachment_image_src( get_post_thumbnail_id(), 'large' );
			$news_image       = $news_image_array[ 0 ];

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

	public static function external_site_query( $attributes ) {
		$attributes = self::block_atts( $attributes );
		$news_posts = [];
		add_filter( 'wp_feed_cache_transient_lifetime', create_function( '$a', 'return 600;' ) ); // refresh every 10 minutes
		$feed = fetch_feed( "https://ucfhealth.com/feed/?post_type=news&news_category=crosspost-to-com" );
		remove_filter( 'wp_feed_cache_transient_lifetime', create_function( '$a', 'return 600;' ) );
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
		if ( $source[ 'taxonomy_term_mode' ] === 'false' ) {
			// whitelist mode.
			$relation = "OR";
			$operator = "IN";
		} else {
			// blacklist mode
			$relation = "AND";
			$operator = "NOT IN";
		}

		// apply AND or OR if specifying more than one slug
		if ( sizeof( $source[ 'selected_term_list' ] ) > 1 ) {
			$return_array[ 'relation' ] = $relation;
		}

		// looping through each term and adding an explicit tax query for each one.
		// we might be able to simply apply all terms to the 'terms' operator as it accepts an array,
		// but I'm not sure what the behaviour is with IN vs NOT IN. we need (OR with IN) and (AND with NOT IN).
		foreach ( $source[ 'selected_term_list' ] as $slug ) {
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



