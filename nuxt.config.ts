// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ['~/app.scss'],

  modules: ['@nuxt/content', '@nuxt/icon'],
  nitro: {
    preset: 'github-pages'
  },
  icon: {
    serverBundle: false,
    clientBundle: {
      icons: [
        'mdi:tag',
        'mdi:magnify',
        'mdi:menu-down',
        'mdi:close-circle',
        'mdi:code-braces',

        'mdi:github',
        'mdi:twitch',
        'mdi:telegram',
        'mdi:steam',
      ],
      scan: true
    }
  },
})
