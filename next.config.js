// See the translation library in /lib/translationsLibrary.js

module.exports = {
  i18n: {
    locales: ['en', 'pt'],
    defaultLocale: 'en',
  },
  webpack: (config, { isServer }) => {
    // Fixes npm packages that depend on `fs` module
    if (!isServer) {
      config.node = {
        fs: 'empty'
      }
    }

    return config
  },
  async redirects() {
    return [
      {
        source: '/blog',
        destination: '/blog/show/all/1',
        permanent: true,
      },
      {
        source: '/blog/show/:tagId',
        destination: '/blog/show/:tagId/1',
        permanent: true,
      },

    ]
  },
}