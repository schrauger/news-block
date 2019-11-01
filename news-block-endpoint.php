<?php
/**
 * Created by IntelliJ IDEA.
 * User: stephen
 * Date: 2019-10-30
 * Time: 4:43 PM
 */
namespace schrauger\news_block;

class news_block_endpoint {
	private $version;
	private $namespace;

	public function __construct() {
		$this->version = '1';
		$this->namespace = 'schrauger/news-block/v' . $this->version;
	}
	public function run() {
		add_action( 'rest_api_init', array( $this, 'get_sites'));
		add_action( 'rest_api_init', array( $this, 'get_post_types'));
		add_action( 'rest_api_init', array( $this, 'get_taxonomies'));
		add_action( 'rest_api_init', array( $this, 'get_terms'));
	}

	// List all network sites
	public function get_sites() {
		register_rest_route(
			$this->namespace,
			'/get-sites',
			array(
				'methods' => 'GET',
				'callback' => array($this, 'get_sites_list'),
			)
		);
	}

	// List all public post types for current or specified site
	public function get_post_types() {
		register_rest_route(
			$this->namespace,
			'/get-post-types',
			array(
				'methods' => 'GET',
				'callback' => array($this, 'get_post_types_list'),
			)
		);
		register_rest_route(
			$this->namespace,
			'/site/(?P<blog_id>\d+)/get-post-types/',
			array(
				'methods' => 'GET',
				'callback' => array($this, 'get_post_types_list'),
				'args' => ['blog_id']
			)
		);
	}

	// List all taxonomies for specified post type and current or specified site
	public function get_taxonomies() {
		register_rest_route(
			$this->namespace,
			'/get-taxonomies',
			array(
				'methods' => 'GET',
				'callback' => array($this, 'get_taxonomies_list'),
			)
		);
		register_rest_route(
			$this->namespace,
			'/post-type/(?P<post_type>\w+)/get-taxonomies/',
			array(
				'methods' => 'GET',
				'callback' => array($this, 'get_taxonomies_list'),
				'args' => ['post_type']
			)
		);
		register_rest_route(
			$this->namespace,
			'/site/(?P<blog_id>\d+)/get-taxonomies/',
			array(
				'methods' => 'GET',
				'callback' => array($this, 'get_taxonomies_list'),
				'args' => ['blog_id']
			)
		);
		register_rest_route(
			$this->namespace,
			'/site/(?P<blog_id>\d+)/post-type/(?P<post_type>\w+)/get-taxonomies/',
			array(
				'methods' => 'GET',
				'callback' => array($this, 'get_taxonomies_list'),
				'args' => ['blog_id','post_type']
			)
		);
	}

	// List all terms for specified taxonomy and current or specified site
	public function get_terms() {
		register_rest_route(
			$this->namespace,
			'/get-terms',
			array(
				'methods' => 'GET',
				'callback' => array($this, 'get_terms_list'),
			)
		);
		register_rest_route(
			$this->namespace,
			'/taxonomy/(?P<taxonomy>\w+)/get-terms/',
			array(
				'methods' => 'GET',
				'callback' => array($this, 'get_terms_list'),
				'args' => ['taxonomy']
			)
		);
		register_rest_route(
			$this->namespace,
			'/site/(?P<blog_id>\d+)/get-terms/',
			array(
				'methods' => 'GET',
				'callback' => array($this, 'get_terms_list'),
				'args' => ['blog_id']
			)
		);
		register_rest_route(
			$this->namespace,
			'/site/(?P<blog_id>\d+)/taxonomy/(?P<taxonomy>\w+)/get-terms/',
			array(
				'methods' => 'GET',
				'callback' => array($this, 'get_terms_list'),
				'args' => ['blog_id','taxonomy']
			)
		);
	}


	public function get_sites_list() {
		$return_array = [];

		$wp_list = get_sites();

		foreach ($wp_list as $site) {
			array_push($return_array, [ 'value' => $site->blog_id, 'label' => $site->__get('blogname')]);
		}

		return $return_array;
	}


	/**
	 * Get a list of all post types for a specified blog, or the current blog if none specified (@TODO might be blog 1 instead of current, depending on how REST api is implemented in WordPress)
	 * @param $request
	 *
	 * @return array
	 */
	public function get_post_types_list($request) {

		$blog_id = $request['blog_id'];

		$return_array = [];

		$switched_blog = false;
		if ($blog_id && (get_current_blog_id() !== $blog_id)){
			switch_to_blog($blog_id);
			$switched_blog = true;
		}

		$wp_list = get_post_types(['public' => true], 'objects');
		foreach ($wp_list as $post_type) {
			array_push($return_array, [ 'value' => $post_type->name, 'label' => $post_type->label]);
		}

		if ( $switched_blog ) {
			restore_current_blog();
		}

		return $return_array;
	}

	/**
	 * Get a list of all taxonomies. If blog specified, switches to that blog.
	 * Also, if post_type specified, will only list taxonomies for that post type.
	 *
	 * @param $request
	 *
	 * @return array
	 */
	public function get_taxonomies_list($request) {

		$blog_id = $request['blog_id'];
		$post_type = $request['post_type'];

		$return_array = [];

		$switched_blog = false;
		if ($blog_id && (get_current_blog_id() !== $blog_id)){
			switch_to_blog($blog_id);
			$switched_blog = true;
		}

		if ($post_type) {
			$wp_list = get_object_taxonomies($post_type, 'objects');
		} else {
			$wp_list = get_taxonomies(['public' => true], 'objects');
		}

		foreach ($wp_list as $taxonomy) {
			array_push($return_array, [ 'value' => $taxonomy->name, 'label' => $taxonomy->label . " (" . $taxonomy->name . ")"]);
		}

		if ( $switched_blog ) {
			restore_current_blog();
		}

		return $return_array;
	}

	/**
	 * Get a list of all taxonomies. If blog specified, switches to that blog.
	 * Also, if post_type specified, will only list taxonomies for that post type.
	 *
	 * @param $request
	 *
	 * @return array
	 */
	public function get_terms_list($request) {

		$blog_id = $request['blog_id'];
		$taxonomy = $request['taxonomy'];

		$return_array = [];

		$switched_blog = false;
		if ($blog_id && (get_current_blog_id() !== $blog_id)){
			switch_to_blog($blog_id);
			$switched_blog = true;
		}

		if ($taxonomy) {
			$wp_list = get_terms(['taxonomy' => $taxonomy, 'hide_empty' => true]);
		} else {
			$wp_list = get_terms(['hide_empty' => true]);
		}

		foreach ($wp_list as $term) {
			array_push($return_array, [ 'value' => $term->slug, 'label' => $term->name]);
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