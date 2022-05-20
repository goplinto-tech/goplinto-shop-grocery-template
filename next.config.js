/**
 * @type {import('next').NextConfig}
 */
const path = require('path')
module.exports = {
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
  ]

}

/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
// const withPlugins = require('next-compose-plugins');
// const optimizedImages = require('next-optimized-images');

// // const getLocalPackages = require('./scripts/getLocalPackages');

// // const localPackages = getLocalPackages.getLocalPackages();
// // const withTM = require('next-transpile-modules')(localPackages);
// const nextConfig = {
//   webpack: (config, options) => {
//     return config;
//   },
//   eslint: {
//     // ESLint managed on the workspace level
//     ignoreDuringBuilds: true,
//   },
//   images: {
//     disableStaticImages: true,
//   },
// };

// const config = withPlugins(
//   [
//     // [withTM()],
//     [
//       optimizedImages,
//       {
//         // optimisation disabled by default, to enable check https://github.com/cyrilwanner/next-optimized-images
//         optimizeImages: false,
//       },
//     ],
//   ],
//   nextConfig
// );

// module.exports = config;