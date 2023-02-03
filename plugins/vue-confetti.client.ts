import VueConfetti from 'vue-confetti'

export default defineNuxtPlugin(nuxt => {
  nuxt.vueApp.use(VueConfetti)
})