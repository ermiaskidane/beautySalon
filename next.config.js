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
  target: 'server',
  images: {
    // / https://utfs.io/f/4dd45b40-9055-4cd6-a896-7bbbcfdeae5f-2dr.jpg
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'utfs.io',
        pathname: '/f/**',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'uploadthing.com',
        pathname: '**',
        port: '',
      },
    ],
  },
}

module.exports = nextConfig
