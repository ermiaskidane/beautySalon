/** @type {import('next').NextConfig} */
const webpack = require('webpack')
const nextConfig = {
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    config.plugins.push(
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        'window.jQuery': 'jquery',
      })
    )
    return config
  },
  images: {
    domains: ['uploadthing.com', 'utfs.io'],
  },
}

module.exports = nextConfig
