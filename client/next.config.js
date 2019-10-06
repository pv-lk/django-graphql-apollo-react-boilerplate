const path = require('path')

module.exports = {
  webpack: (config, options) => {
    config.module.rules.push({
      test: /\.(graphql|gql)$/,
      exclude: /node_modules/,
      loader: 'graphql-tag/loader',
      resolve: {
        alias: {
          components: path.join(__dirname, 'components'),
          lib: path.join(__dirname, 'lib')

        }
      }
    }),
    config.resolve.alias['components'] = path.join(__dirname, 'components')
    config.resolve.alias['lib'] = path.join(__dirname, 'lib')
    return config
  }
}
