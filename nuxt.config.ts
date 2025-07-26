// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ['~/app.scss'],

  modules: ['@nuxt/content', '@nuxt/icon'],
  nitro: {
    preset: 'github-pages'
  }
})
