const [server, client] = require('nullstack/webpack.config')

function customClient(...args) {
  const config = client(...args)
  const rule = config.module.rules.find((rule) => rule.test && rule.test.test('.css'))
  rule.use.push({
    loader: require.resolve('postcss-loader'),
    options: {
      postcssOptions: {
        plugins: {
          '@tailwindcss/postcss': {},
        },
      },
    },
  })

  // Configurar minimizer CSS mais compatível para build
  if (config.optimization && config.optimization.minimizer) {
    config.optimization.minimizer = config.optimization.minimizer.map((minimizer) => {
      if (minimizer.constructor.name === 'CssMinimizerPlugin') {
        const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
        return new CssMinimizerPlugin({
          minimizerOptions: {
            preset: [
              'default',
              {
                discardComments: { removeAll: true },
              },
            ],
          },
        })
      }
      return minimizer
    })
  }

  return config
}

module.exports = [server, customClient]
