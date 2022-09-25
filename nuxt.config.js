const metaObj = () => {
  return ([
    { charset: 'utf-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { hid: 'description', name: 'description', content: "Beginning at 12PM. We hope that you'll join us on the afternoon of November 27th to celebrate our engagement." },
    { name: 'format-detection', content: 'telephone=no' },
    { name: 'twitter:card', content: 'summary_large_image' },
    {
      hid: 'twitter:title',
      name: 'twitter:title',
      content: "Chelsey & Michael's Engagement Party",
    },
    { name: 'twitter:site', content: '@michaelcrawbuck' },
    {
      hid: 'twitter:description',
      name: 'twitter:description',
      content: "Beginning at 12PM. We hope that you'll join us on the afternoon of November 27th to celebrate our engagement.",
    },
    {
      hid: 'twitter:image',
      name: 'twitter:image',
      content: './test.jpg',
    },
    {
      property: 'twitter:image:alt',
      content: 'test',
    },

    // Required type
    { hid: 'og:type', property: 'og:type', content: 'website' },

    // Required title
    {
      hid: 'og:title',
      property: 'og:title',
      content: "Chelsey & Michael's Engagement Party",
    },

    // Required canonical url
    {
      hid: 'og:url',
      property: 'og:url',
      content: 'https://chelseyxmichael.wedding/',
    },

    // Required image (you can add an image parameter if you want to change images per page or read part 3 how we generate an image per page)
    {
      hid: 'og:image',
      property: 'og:image',
      content: './test.jpg',
    },

    // Optional image width
    { property: 'og:image:width', content: '1200' },

    // Optional image heigth
    { property: 'og:image:height', content: '627' },

    // Optional image alt text
    {
      property: 'og:image:alt',
      content: 'test',
    },

    // Optional description
    {
      hid: 'og:description',
      property: 'og:description',
      content: "Beginning at 12PM. We hope that you'll join us on the afternoon of November 27th to celebrate our engagement.",
    },
  ])
}




export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: "Chelsey & Michael's Engagement Party",
    meta: metaObj(),
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/assets/css/main.css'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/stylelint
    '@nuxtjs/stylelint-module',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    // https://go.nuxtjs.dev/content
    '@nuxt/content',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: '/',
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en',
    },
  },

  // Content module configuration: https://go.nuxtjs.dev/config-content
  content: {},

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
}
