<?php
/*
Plugin Name: News Block
Plugin URI: https://github.com/schrauger/news-block
Description: WordPress Block for embedding COM and UCF Health news articles.
Version: 0.2
Author: Stephen Schrauger
Author URI: https://github.com/schrauger/news-block
License: GPL2
*/

locate_template( 'simple_html_dom.php', true, true );


// have to use init hook, since there is server-side rendering
// can't just use enqueue_block_editor_assets hook, since an editor-only return is client side rendered html, which is
// subject to html filtering (and would remove the iframe for less privileged users)
add_action( 'init', ['news_block', 'load_news_block'] );
//add_action('enqueue_block_editor_assets', ['news_block', 'load_news_block']);


class news_block {
	/**
     * Apply defaults to specified attributes if attribute is not defined by the user.
	 * @param array $attributes
	 *
	 * @return array
	 */
	public static function shortcode_atts($attributes = []){
		$defaults      = [
			'title'            => [
				'type'    => 'string',
				'default' => 'News Embed'
			],
			'blog_id'           => [
				'type'    => 'integer',
				'default' => get_current_blog_id()
			],
            'post_type' => [
                'type' => 'string',
                'default' => 'news'
            ],
            'taxonomy' => [
                'type' => 'string',
                'default' => 'news_category'
            ],
            'taxonomy_term_mode'      => [
                    'type' => 'boolean',
                    'default' => false // when false, use blacklist (any taxonomies listed will NOT show up). when true, use whitelist (only taxonomies listed will show up)
            ],
            'taxonomy_term_slugs' => [
                    'type' => 'array',
                    'default' => [],
                    'items' => [
                            'type' => 'string'
                    ]
            ],
			'latest_date'       => [
				'type'    => 'date',
				'default' => null
			],
			'max_news_articles'  => [
				'type'    => 'integer',
				'default' => 5
			],
			'max_excerpt_length' => [
				'type'    => 'integer',
				'default' => 30
			],
		];
		return shortcode_atts($defaults, $attributes);
	}

	/**
	 * register the react script for a block, and also define
	 * the server side render callback to allow for raw html.
	 */
	public static function load_news_block() {


		wp_register_script(
			'news-block-js',
			plugins_url( 'news-block.js', __FILE__ ),
			[ 'wp-blocks', 'wp-editor', 'wp-data', 'wp-element', 'wp-i18n', 'wp-components' ],
			filemtime( plugin_dir_path( __FILE__ ) . 'news-block.js' )
		);

		register_block_type(
			'news-module/news-block',
			[
				'editor_script'   => 'news-block-js',
				'render_callback' => ['news_block','render_news_callback'],
				// attributes must be defined here as well as on the client-side js file
				'attributes'      => self::shortcode_atts()
			]
		);
	}

	/** Prepends the $content with the current post thumbnail if exists - <p>{thumbnail}</p>$content
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
	public static function excerpt_length( ) {
		return 8;
	}

	// Custom excerpt ellipses
	public static function excerpt_more( ) {
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
		$attributes = self::shortcode_atts($attributes);
		$return_rendered_html = "";

		$news_posts = self::internal_site_query($attributes);

		$news_posts = array_slice( $news_posts, 0, $attributes['max_news_articles'] );

		if (sizeof($news_posts) > 0) {
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
		    return "No posts found";
        }
	}


	/**
     * Runs a query on the internal site, based on the taxonomy terms specified
	 * @param $attributes
	 *
	 * @return WP_Query
	 */
	public static function internal_site_query($attributes){
        $attributes = self::shortcode_atts($attributes);
		$return_news_posts = [];

		$switched_blog = false;
        if ( get_current_blog_id() != $attributes['blog_id']){
            switch_to_blog( $attributes['blog_id']);
            $switched_blog = true;
        }
        $tax_query = self::tax_query($attributes);

        if (sizeof($tax_query) > 0){
	        $query_args = [
		        'post_type' => $attributes['post_type'],
		        'posts_per_page' => $attributes['max_news_articles'],
		        'tax_query'      => [ self::tax_query($attributes) ], // must be inside an array
	        ];
        } else {
	        $query_args = [
		        'post_type' => $attributes['post_type'],
		        'posts_per_page' => $attributes['max_news_articles'],
	        ];
        }

		$the_query = new WP_Query( $query_args );

		add_filter( 'excerpt_length', ['news_block','excerpt_length'] );
		add_filter( 'excerpt_more', ['news_block','excerpt_more'] );

		while ( $the_query->have_posts() ) {

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
				'class'     => get_post_class('news-preview-image'),
				'target'    => ''
			] );
		}

		remove_filter( 'excerpt_length', ['news_block','excerpt_length'] );
		remove_filter( 'excerpt_more', ['news_block','excerpt_more'] );

		wp_reset_postdata();

		if ($switched_blog){
			restore_current_blog();
		}

		return $return_news_posts;
    }

    public static function external_site_query($attributes){
	    $attributes = self::shortcode_atts($attributes);
	    $news_posts = [];
	    add_filter( 'wp_feed_cache_transient_lifetime', create_function( '$a', 'return 600;' ) ); // refresh every 10 minutes
	    $feed = fetch_feed( "https://ucfhealth.com/feed/?post_type=news&news_category=crosspost-to-com" );
	    remove_filter( 'wp_feed_cache_transient_lifetime', create_function( '$a', 'return 600;' ) );
    }

	/**
     * Generates the tax_query array based on attributes
	 * @param $attributes
	 *
	 * @return array
	 */
    public static function tax_query($attributes){
	    $attributes = self::shortcode_atts($attributes);

	    $return_array = [];
	    if ($attributes['taxonomy_term_mode'] === true){
	        // whitelist mode.
            $relation = "OR";
            $operator = "IN";
        } else {
	        // blacklist mode
            $relation = "AND";
            $operator = "NOT IN";
        }

	    // apply AND or OR if specifying more than one slug
	    if (sizeof($attributes['taxonomy_term_slugs']) > 1) {
            $return_array['relation'] = $relation;
        }


	    // looping through each term and adding an explicit tax query for each one.
        // we might be able to simply apply all terms to the 'terms' operator as it accepts an array,
        // but I'm not sure what the behaviour is with IN vs NOT IN. we need (OR with IN) and (AND with NOT IN).
	    foreach ($attributes['taxonomy_term_slugs'] as $slug){
            array_push($return_array, [
                'taxonomy' => $attributes['taxonomy'],
                'field' => 'slug',
                'terms' => $slug,
                'operator' => $operator
            ]);
        }
	    return $return_array;
    }

	function z__construct() {
		$news_posts = [];

		$max_news_articles = 5; // show max of 5 articles.

		if ( get_current_blog_id() == 8 ) {

			switch_to_blog( 1 );

			$args = [
				'post_type'      => 'news',
				'posts_per_page' => $max_news_articles,
				'tax_query'      => [
					[
						'taxonomy' => 'news_category',
						'field'    => 'slug',
						'terms'    => 'burnett-school',
						'operator' => 'IN'
					]
				]
			];

		} else {

			$args = [
				'post_type'      => 'news',
				'tax_query'      => [
					'relation' => 'AND',
					[
						'taxonomy' => 'news_category',
						'field'    => 'slug',
						'terms'    => 'external-news',
						'operator' => 'NOT IN',
					],
					[
						'taxonomy' => 'news_category',
						'field'    => 'slug',
						'terms'    => 'health-sciences-campus-news',
						'operator' => 'NOT IN',
					],
				],
				'posts_per_page' => $max_news_articles
			];

		}

		/*$args = [
			'post_type' => 'news',
			'posts_per_page' => $max_news_articles
		);*/

		$the_query = new WP_Query( $args );


		while ( $the_query->have_posts() ) {

			$the_query->the_post();

			$news_image_array = wp_get_attachment_image_src( get_post_thumbnail_id(), 'large' );
			$news_image       = $news_image_array[ 0 ];

			add_filter( 'excerpt_length', 'new_excerpt_length' ); // these functions are defined in the functions.php file.
			add_filter( 'excerpt_more', 'new_excerpt_more' );

			// add all (5) COM articles to array
			array_push( $news_posts, [
				'image'     => $news_image,
				'permalink' => get_the_permalink(),
				'title'     => get_the_title(),
				'piece'     => get_the_excerpt(),
				'datesort'  => get_the_date( 'Y-m-d H:i:s T' ),
				'date'      => get_the_date(),
				'class'     => get_post_class('news-preview-image'),
				'target'    => ''
			] );

		}

		wp_reset_postdata();

		// next, get all UCF Health articles that have the crosspost-to-com category, and add them to the array.
		add_filter( 'wp_feed_cache_transient_lifetime', create_function( '$a', 'return 600;' ) ); // refresh every 10 minutes
		$feed = fetch_feed( "https://ucfhealth.com/feed/?post_type=news&news_category=crosspost-to-com" );
		remove_filter( 'wp_feed_cache_transient_lifetime', create_function( '$a', 'return 600;' ) );


		if ( ! is_wp_error( $feed ) ) {
			$maxitems   = $feed->get_item_quantity( $max_news_articles );
			$feed_items = $feed->get_items( 0, $maxitems );


			foreach ( $feed_items as $item ) {
				/* @var SimplePie_Item $item */

				/* get thumbnail */
				$htmlDOM = new simple_html_dom();
				$htmlDOM->load( $item->get_content() );
				$image     = $htmlDOM->find( 'img', 0 );
				$image_url = $image->src;

				// remove images for description
				$image->outertext = '';
				$htmlDOM->save();

				$content_minus_image = wp_trim_words( $htmlDOM, new_excerpt_length(), new_excerpt_more() ); // these functions are defined in functions.php

				if ( ! isset( $image_url ) ) // if exists
				{
					$image_url = '/wp-content/themes/ucf-health-theme/images/logos/ucf-building.jpg'; // default stock image if image not set
				}

				$UTC         = new DateTimeZone( "UTC" );
				$timezoneEST = new DateTimeZone( "America/New_York" );
				$datesort    = new DateTime( $item->get_date( 'Y-m-d H:i:s' ), $UTC );
				$datesort->setTimezone( $timezoneEST );
				$date = new DateTime( $item->get_date(), $UTC );
				$date->setTimezone( $timezoneEST );

				array_push( $news_posts, [
					'image'     => $image_url,
					'permalink' => $item->get_link(),
					'title'     => $item->get_title(),
					'piece'     => $content_minus_image,
					'datesort'  => $datesort->format( 'Y-m-d H:i:s T' ),
					'date'      => $date->format( 'F d, Y' ),
					'class'     => 'class="news-preview-image"',
					'target'    => 'target="_blank"'
				] );
			}
		}

		add_filter( 'the_excerpt_rss', [ $this, 'wcs_post_thumbnails_in_feeds' ] );
		add_filter( 'the_content_feed', [ $this, 'wcs_post_thumbnails_in_feeds' ] );

		// finally, sort by date, and choose the 7 most recent out of all

		usort( $news_posts, function ( $a, $b ) {
			return strtotime( $a[ 'datesort' ] ) < strtotime( $b[ 'datesort' ] );
		} );

		$news_posts = array_slice( $news_posts, 0, $max_news_articles );

		foreach ( $news_posts as $post ) {
			?>
            <article >
                <a target='<?php echo $post[ 'target' ] ?>' class="photo-prev"
                   href="<?php echo $post[ 'permalink' ]; ?>"
                   style="background: url('<?php echo $post[ 'image' ]; ?>') no-repeat center center; background-size: cover;" ><?php echo $post[ 'title' ]; ?></a >

				<?php if ( $post[ 'youtube_video_id' ] ) { ?>
                    <aside class="go-to" ><a href="<?php echo $post[ 'permalink' ]; ?>" >Go to Article</a >
                    </aside ><?php } ?>

                <a href="<?php echo $post[ 'permalink' ]; ?>" alt="<?php echo $post[ 'title' ]; ?>"
                   title="<?php echo $post[ 'title' ]; ?>" ><?php echo $post[ 'title' ]; ?>
                    <small ><?php if ( $post[ 'notification_type' ] ) { ?><span
                                class="notification" ><?php $post[ 'notification_type' ]; ?></span ><?php }
						echo $post[ 'date' ]; ?></small >
                </a >

                <p ><?php echo $post[ 'piece' ]; ?></p >
            </article >

			<?php
			// the a.button should be outside the loop, but we only show 1 article. must fix later if we want to show more (requires css changes)
		}

		restore_current_blog();

		wp_reset_postdata();
	}
}






