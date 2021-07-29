module.exports = {
  // Set up the languages:
  i18n: {
    locales: ['en', 'pt'],
    defaultLocale: 'en',
  },
	// webpack5: false,
  webpack: (config, { isServer }) => {
    if (!isServer) {
    	// Fixes npm packages that depend on `fs` module:
      config.resolve.fallback.fs = false;
    } else {
      // Create the sitemap on build:
      require('./lib/siteMap')
    }
    return config;
  },
}