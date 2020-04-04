import colors from 'vuetify/es5/util/colors'
require('dotenv').config()
const client = require('./plugins/contentful').default

export default {
  mode: 'universal',
  /*
   ** Headers of the page
   */
  head: {
    // titleTemplate: '%s - ' + process.env.npm_package_name,
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      },
      { hid: 'og:site_name', property: 'og:site_name', content: 'webmas!' },
      { hid: 'og:type', property: 'og:type', content: 'website' },
      {
        hid: 'twitter:card',
        name: 'twitter:card',
        content: 'summary_large_image'
      },
      { hid: 'twitter:site', name: 'twitter:site', content: '@NadjaHarold' },
      { name: 'twitter:creator', content: '@NadjaHarold' }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: [],
  router: {
    middleware: ['getContentful']
  },
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    'plugins/vuetify',
    'plugins/contentful',
    'plugins/components',
    '~/plugins/prism'
    // '~/plugins/markdownit'
  ],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    // Doc: https://github.com/nuxt-community/stylelint-module
    '@nuxtjs/stylelint-module',
    '@nuxtjs/vuetify',
    '@nuxtjs/dotenv'
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/markdownit',
    '@nuxtjs/style-resources'
  ],
  styleResources: {
    scss: [
      '@/assets/base/_common.scss',
      '@/assets/base/_mixin.scss',
      '@/assets/base/_setting.scss'
    ]
  },
  markdownit: {
    injected: true, // $mdを利用してmarkdownをhtmlにレンダリングする
    breaks: true, // 改行コードを<br>に変換する
    html: true, // HTML タグを有効にする
    linkify: true, // URLに似たテキストをリンクに自動変換する
    typography: true, // 言語に依存しないきれいな 置換 + 引用符 を有効にします。
    use: [
      'markdown-it-table-of-contents',
      'markdown-it-anchor' // 目次を作るためのライブラリ。別途インストールが必要
    ]
  },
  env: {
    // contentful
    CTF_SPACE_ID: process.env.CTF_SPACE_ID,
    CTF_BLOG_POST_TYPE_ID: process.env.CTF_BLOG_POST_TYPE_ID,
    CTF_CDA_ACCESS_TOKEN: process.env.CTF_CDA_ACCESS_TOKEN,
    BASE_URL: process.env.BASE_URL || 'http://localhost:3000',
    SITE_NAME: process.env.SITE_NAME,
    TWITTER_ACCOUNT: process.env.TWITTER_ACCOUNT
  },
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {},
  /*
   ** vuetify module configuration
   ** https://github.com/nuxt-community/vuetify-module
   */
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        },
        light: {
          twitter: '#55acee',
          facebook: '#3b5998'
        }
      }
    }
  },
  generate: {
    routes() {
      return Promise.all([
        client.getEntries({
          content_type: process.env.CTF_BLOG_POST_TYPE_ID
        }),
        client.getEntries({
          content_type: 'category'
        }),
        client.getEntries({
          content_type: 'tag'
        })
      ]).then(([posts, categories, tags]) => {
        return [
          ...posts.items.map((post) => {
            return { route: `posts/${post.fields.slug}`, payload: post }
          }),
          ...categories.items.map((category) => {
            return {
              route: `categories/${category.fields.slug}`,
              payload: category
            }
          }),
          ...tags.items.map((tag) => {
            return { route: `tags/${tag.fields.slug}`, payload: tag }
          })
        ]
      })
    }
  },
  /*
   ** Build configuration
   */
  build: {
    transpile: ['vuetify/lib'], // 追記
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {}
  }
}
