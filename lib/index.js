const path = require('path')

module.exports = {
  enhanceAppFiles: [path.resolve(__dirname, './client.js')],
  define () {
    const PRISM_ROOT = path.dirname(
      require.resolve('prismjs/components.js')
    )
    return {
      PRISM_ROOT,
    }
  },
}
