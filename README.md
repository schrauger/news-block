# news-block

Adds a Gutenberg block to WordPress that will pull in posts from multiple internal sources.

Once all posts are loaded, it sorts them by date. The resulting block will contain a subset of the posts.

Example: You want to pull in all posts with a specific term from your primary network site, all posts from a second network site within your WordPress multisite, and all posts from a third source via an external rss feed. Add all three sources, then select the number of posts you want to ultimately display. You can also specify a date range.

### Development
To modify the plugin, you'll need to install `npm` on your machine, then run `npm install` to get all the dependencies. Then run `npm run dev`, which will run a program that constantly watches the directory for changes and compiles the files when you change the code.

If you modify the `scss` files, you'll need to use an `scss` compiler to create the correct css output.
