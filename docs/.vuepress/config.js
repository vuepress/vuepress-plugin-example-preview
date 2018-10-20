module.exports = {
  title: 'vuepress-plugin-example-preview',

  description: 'Easily embed example code alongside their preview',

  head: [
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }],
  ],

  themeConfig: {
    repo: 'posva/vuepress-plugin-example-preview',
    editLinks: true,
    docsDir: 'docs',
    editLinkText: 'Edit this page on GitHub',
    lastUpdated: 'Last Updated',
  },

  plugins: [require('../../lib/index')],
}
