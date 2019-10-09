const path = require('path')

module.exports = {
  webpack: (config, options) => {
    config.module.rules.push({
      test: /\.(graphql|gql)$/,
      exclude: /node_modules/,
      loader: 'graphql-tag/loader'
    })
    config.resolve.alias['components'] = path.join(__dirname, 'src/components')
    config.resolve.alias['lib'] = path.join(__dirname, 'src/lib')
    return config
  }
}
