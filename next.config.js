/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    apiKey: process.env.API_KEY,
  },
  serverRuntimeConfig: {
    apiKey: process.env.API_KEY,
  },
  publicRuntimeConfig: {
    apiKey: process.env.API_KEY,
  },
}

module.exports = nextConfig
