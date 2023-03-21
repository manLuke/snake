// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  app: {
    baseURL: '/snake/',
    head: {
      title: 'Snake in Nuxt3',
    }
  }
})
