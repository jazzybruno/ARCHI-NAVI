/** @type {import('next').NextConfig} */
const path = require('path')
require('dotenv').config()
const nextConfig = {
  reactStrictMode: false,
  webpack(config, options) {
    config.resolve.alias['@'] = path.join(__dirname, 'src')
    return config
  },
  experimental: {
    optimizeFonts: true,
  },
  env: {
    GOOGLE_MAPS_API_KEY: process.env.GOOGLE_MAPS_API_KEY
  }
}

module.exports = nextConfig
