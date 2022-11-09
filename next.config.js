/**
 * @type {import('next').NextConfig}
 */
const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
})

const { withSentryConfig } = require('@sentry/nextjs');

const path = require('path')
const moduleExports = withPWA({
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
    prependData: `@import "colors.scss";`
  },

  trailingSlash: true,
  reactStrictMode: true,
  eslint: {
    // ESLint managed on the workspace level
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ['s3.ap-south-1.amazonaws.com', 'dsa0i94r8ef09.cloudfront.net'],
    images: {
      loader: 'akamai',
      path: '',
    }
  },

  env: {
    "development": {
      "presets": ["next/babel"],
      "plugins": [
        [
          "babel-plugin-styled-components",
          { "ssr": true, "displayName": true, "preprocess": false }
        ]
      ]
    },
    "production": {
      "plugins": [
        [
          "babel-plugin-styled-components",
          { "ssr": true, "displayName": true, "preprocess": false }
        ]
      ],
      "presets": ["next/babel"]
    },
    "test": {
      "presets": ["next/babel"]
    }
  },
  "plugins": [
    [
      "babel-plugin-styled-components",
      { "ssr": true, "displayName": true, "preprocess": false }
    ]
  ],
  sentry: {
    hideSourceMaps: true,
  },
});

const sentryWebpackPluginOptions = {
  silent: true, // Suppresses all logs
};
module.exports = withSentryConfig(moduleExports, sentryWebpackPluginOptions);