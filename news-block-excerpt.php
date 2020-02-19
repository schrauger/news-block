<?php
/**
 * Created by IntelliJ IDEA.
 * User: stephen
 * Date: 2019-10-30
 * Time: 3:16 PM
 */

/**
 * Class news_block_excerpt
 * Since you cannot pass arguments to pre-defined filters, I instead created a class with class variables.
 * Then, you pass the instantiated class object and the function name to the filter. When the filter
 * calls the function, the class variables are already set to whatever you defined.
 */
class news_block_excerpt {
	private $length;
	private $more_string;

	public function __construct( $excerpt_length = 55, $more_string = '...' ) {
		if ((int)$excerpt_length > 0){
			$this->length      = (int)$excerpt_length;
			$this->more_string = $more_string;
		} else {
			$this->length = 0;
			$this->more_string = '';
		}
		$this->add_filters();
	}

	public function __destruct() {
		$this->remove_filters();
	}

	public function excerpt_length( $length ) {
		// ignore previous length. just return what was defined in our class.
		return $this->length;
	}

	// Custom excerpt ellipses
	public function excerpt_more( $more_string ) {
		// ignore previous string. just return what was defined in our class.
		return $this->more_string;
	}

	public function excerpt_left_trim( $excerpt ) {
		return preg_replace( '~^(\s*(?:&nbsp;)?)*~i', '', $excerpt );
	}

	private function add_filters() {
		add_filter( 'excerpt_length', [ $this, 'excerpt_length' ], 999 );
		add_filter( 'excerpt_more', [ $this, 'excerpt_more' ], 999 );
		add_filter( 'get_the_excerpt', [ $this, 'excerpt_left_trim' ], 999 );
	}

	private function remove_filters() {
		remove_filter( 'excerpt_length', [ $this, 'excerpt_length' ], 999 );
		remove_filter( 'excerpt_more', [ $this, 'excerpt_more' ], 999 );
		remove_filter( 'get_the_excerpt', [ $this, 'excerpt_left_trim' ], 999 );
	}
}