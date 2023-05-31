<?php
/**
 * Created by IntelliJ IDEA.
 * User: stephen
 * Date: 2019-10-30
 * Time: 4:43 PM
 */
namespace schrauger\news_block;

class news_block_endpoint {
	private string $version;
	private string $namespace;

	public function __construct() {
		$this->version = '1';
		$this->namespace = 'schrauger/news-block/v' . $this->version;
	}
	public function run(): void
    {
		add_action( 'rest_api_init', array( $this, 'get_sites'));
		add_action( 'rest_api_init', array( $this, 'get_post_types'));
		add_action( 'rest_api_init', array( $this, 'get_taxonomies'));
		add_action( 'rest_api_init', array( $this, 'get_terms'));
	}

	// List all network sites
	public function get_sites(): void
    {
		register_rest_route(
			$this->namespace,
			'/get-sites',
			array(
				'methods' => 'GET',
				'callback' => array($this, 'get_sites_list'),
				'permission_callback' => '__return_true',
			)
		);
	}

	// List all public post types for current or specified site
	public function get_post_types(): void
    {
		register_rest_route(
			$this->namespace,
			'/get-post-types',
			array(
				'methods' => 'GET',
				'callback' => array($this, 'get_post_types_list'),
				'permission_callback' => '__return_true',
			)
		);
		register_rest_route(
			$this->namespace,
			'/site/(?P<blog_id>\d+)/get-post-types/',
			array(
				'methods' => 'GET',
				'callback' => array($this, 'get_post_types_list'),
				'args' => array(
                    'blog_id' => array(
                        'required' => false,
                    )
                ),
				'permission_callback' => '__return_true',
			)
		);
	}

	// List all taxonomies for specified post type and current or specified site
	public function get_taxonomies(): void
    {
		register_rest_route(
			$this->namespace,
			'/get-taxonomies',
			array(
				'methods' => 'GET',
				'callback' => array($this, 'get_taxonomies_list'),
				'permission_callback' => '__return_true',
			)
		);
		register_rest_route(
			$this->namespace,
			'/post-type/(?P<post_type>\w+)/get-taxonomies/',
			array(
				'methods' => 'GET',
				'callback' => array($this, 'get_taxonomies_list'),
                'args' => array(
                    'post_type' => array(
                        'required' => true,
                    )
                ),
				'permission_callback' => '__return_true',
			)
		);
		register_rest_route(
			$this->namespace,
			'/site/(?P<blog_id>\d+)/get-taxonomies/',
			array(
				'methods' => 'GET',
				'callback' => array($this, 'get_taxonomies_list'),
                'args' => array(
                    'blog_id' => array(
                        'required' => true,
                    )
                ),
				'permission_callback' => '__return_true',
			)
		);
		register_rest_route(
			$this->namespace,
			'/site/(?P<blog_id>\d+)/post-type/(?P<post_type>\w+)/get-taxonomies/',
			array(
				'methods' => 'GET',
				'callback' => array($this, 'get_taxonomies_list'),
                'args' => array(
                    'blog_id' => array(
                        'required' => true,
                    ),
                    'post_type' => array(
                        'required' => true,
                    )
                ),
				'permission_callback' => '__return_true',
			)
		);
	}

	// List all terms for specified taxonomy and current or specified site
	public function get_terms(): void
    {
		register_rest_route(
			$this->namespace,
			'/get-terms',
			array(
				'methods' => 'GET',
				'callback' => array($this, 'get_terms_list'),
				'permission_callback' => '__return_true',
			)
		);
		register_rest_route(
			$this->namespace,
			'/taxonomy/(?P<taxonomy>\w+)/get-terms/',
			array(
				'methods' => 'GET',
				'callback' => array($this, 'get_terms_list'),
                'args' => array(
                    'taxonomy' => array(
                        'required' => true,
                    )
                ),
				'permission_callback' => '__return_true',
			)
		);
		register_rest_route(
			$this->namespace,
			'/site/(?P<blog_id>\d+)/get-terms/',
			array(
				'methods' => 'GET',
				'callback' => array($this, 'get_terms_list'),
                'args' => array(
                    'blog_id' => array(
                        'required' => true,
                    )
                ),				'permission_callback' => '__return_true',
			)
		);
		register_rest_route(
			$this->namespace,
			'/site/(?P<blog_id>\d+)/taxonomy/(?P<taxonomy>\w+)/get-terms/',
			array(
				'methods' => 'GET',
				'callback' => array($this, 'get_terms_list'),
                'args' => array(
                    'blog_id' => array(
                    ),
                    'taxonomy' => array(
                        'required' => true,
                    )
                ),
				'permission_callback' => '__return_true',
			)
		);
	}


	public function get_sites_list(): array
    {

		if (is_multisite()){
			$wp_list = get_sites();
			return $this->get_useful_site_list($wp_list);
		} else {
			return [['value' => 1, 'label' => get_bloginfo('name')]];
		}

	}

	public function get_useful_site_list($list_of_sites): array
    {
		$return_array = [];
		$inner_request = [];
		foreach ($list_of_sites as $site){
			$inner_request['blog_id'] = $site->blog_id;
			$post_types = $this->get_post_types_list($inner_request); // this function normally uses the request object, so we're passing it the data it expects
			if (is_array($post_types) && sizeof($post_types) > 0){
				$return_array[] = ['value' => $site->blog_id, 'label' => $site->__get('blogname')];
			}
		}
		return $return_array;
	}


    /**
     * Get a list of all post types for a specified blog, or the current blog if none specified (@TODO might be blog 1 instead of current, depending on how REST api is implemented in WordPress)
     * @param \WP_REST_Request|array $request
     *
     * @return array
     */
	public function get_post_types_list(\WP_REST_Request|array $request): array
    {

        if (is_a($request, 'WP_REST_Request' )){
            $blog_id = $request->get_param('blog_id');
        } elseif (is_array($request)){
            $blog_id = $request['blog_id'];
        }

        $switched_blog = false;
		if (is_multisite()) {
			if ( $blog_id && ( get_current_blog_id() !== $blog_id ) ) {
				switch_to_blog( $blog_id );
				$switched_blog = true;
			}
		}

		$wp_list = get_post_types(['public' => true], 'objects'); //public gets rid of internal post types
		$return_array = $this->get_useful_post_types_list($wp_list);

		if ( $switched_blog ) {
			restore_current_blog();
		}

		return $return_array;
	}

    /**
     * @param \WP_Post_Type[] $list_of_post_types
     * @return array
     */
    public function get_useful_post_types_list(array $list_of_post_types): array
    {
		$return_array = [];
		foreach ($list_of_post_types as $post_type) {
			// only show post types that actually have published posts
			$count_posts = wp_count_posts($post_type->name);
			$count_published = $count_posts->publish;

			// also show post types only if they have a taxonomy, as that is required for the plugin to work
			$wp_tax_list = get_object_taxonomies($post_type->name, 'objects');
			//			echo "<pre>";
			//			var_dump($wp_tax_list);
			//			echo "</pre>";
			$useful_tax_list = $this->get_useful_taxonomies_list($wp_tax_list);

			if (($count_published > 0) && ((is_array($useful_tax_list)) && (sizeof($useful_tax_list) > 0))) {
				$return_array[] = ['value' => $post_type->name, 'label' => $post_type->label];
			}
		}
		return $return_array;
	}

    /**
     * Get a list of all taxonomies. If blog specified, switches to that blog.
     * Also, if post_type specified, will only list taxonomies for that post type.
     *
     * @param \WP_REST_Request|array $request
     *
     * @return array
     */
	public function get_taxonomies_list(\WP_REST_Request|array $request): array
    {
        if (is_a($request, 'WP_REST_Request' )){
            $blog_id = $request->get_param('blog_id');
            $post_type = $request->get_param('post_type');
        } elseif (is_array($request)){
            $blog_id = $request['blog_id'];
            $post_type = $request['post_type'];
        }

		$return_array = [];

		$switched_blog = false;
		if (is_multisite()) {
			if ( $blog_id && ( get_current_blog_id() !== $blog_id ) ) {
				switch_to_blog( $blog_id );
				$switched_blog = true;
			}
		}
		if ($post_type) {
			$wp_list = get_object_taxonomies($post_type, 'objects');
		} else {
			$wp_list = get_taxonomies(['public' => true], 'objects');
		}

		$return_array = $this->get_useful_taxonomies_list($wp_list);

		if ( $switched_blog ) {
			restore_current_blog();
		}

		return $return_array;
	}

    /**
     * @param \WP_Taxonomy[] $list_of_taxonomies
     * @return array
     */
    public function get_useful_taxonomies_list(array $list_of_taxonomies): array
    {
		$return_array = [];

		foreach ($list_of_taxonomies as $taxonomy) {

			// make sure the taxonomy has terms that are used. if it has terms, but they're all unused, then don't show this taxonomy.
			$term_list = get_terms(['taxonomy' => $taxonomy->name, 'hide_empty' => true]);
			if (count($term_list) > 0){
				$return_array[] = ['value' => $taxonomy->name, 'label' => $taxonomy->label . " (" . $taxonomy->name . ")"];
			}
		}
		return $return_array;

	}

    /**
     * Get a list of all taxonomies. If blog specified, switches to that blog.
     * Also, if post_type specified, will only list taxonomies for that post type.
     *
     * @param \WP_REST_Request|array $request
     *
     * @return array
     */
	public function get_terms_list(\WP_REST_Request|array $request) {

        if (is_a($request, 'WP_REST_Request' )){
            $blog_id = $request->get_param('blog_id');
            $taxonomy = $request->get_param('taxonomy');
        } elseif (is_array($request)){
            $blog_id = $request['blog_id'];
            $taxonomy = $request['taxonomy'];
        }

		$return_array = [];

		$switched_blog = false;
		if (is_multisite()) {
			if ( $blog_id && ( get_current_blog_id() !== $blog_id ) ) {
				switch_to_blog( $blog_id );
				$switched_blog = true;
			}
		}

		if ($taxonomy) {
			$wp_list = get_terms(['taxonomy' => $taxonomy, 'hide_empty' => true]);
		}else {
			$wp_list = get_terms(['hide_empty' => true]);
		}

		foreach ($wp_list as $term) {
			$return_array[] = ['value' => $term->slug, 'label' => $term->name];
		}

		if ( $switched_blog ) {
			restore_current_blog();
		}

		return $return_array;
	}


//	public function get_taxonomy_list() {
//		$taxonomy_array = [];
//
//		$taxonomy_list =
//
//		foreach ($taxonomy_list as $taxonomy) {
//			array_push($taxonomy_array, [ 'value' => $taxonomy->slug, 'label' => $taxonomy->__get('name')]); //@TODO fix value and label
//			//$site_array[$site->blog_id] = $site->__get('blogname');
//		}
//
//		return $taxonomy_array;
//	}
}
$news_block_endpoint = new news_block_endpoint();
$news_block_endpoint->run();
