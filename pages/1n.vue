<template>
  <Navbar current-page="1n"></Navbar>
  <div class="flex h-screen bg-center bg-no-repeat bg-cover bg-hero-pattern">
    <!-- <sponsorBanner1></sponsorBanner1> -->
    <main class="m-auto w-1/2 min-w-fit overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 backdrop-blur bg-white bg-opacity-60">
      <DigitDisplay 
        class="my-8"
        :target="dispNum"
        @animation-start="loading = true"
        @animation-end="onAnimationEnd()"
      />
      <div class="flex justify-center my-8">
        <button
          @click="draw1()"
          :disabled="loading"
          :class="{
            'bg-gray-300': loading,
            'bg-red-500 hover:bg-red-600 active:bg-red-700 active:shadow-inner shadow-md': !loading,
          }"
          class="text-white text-5xl font-medium rounded-full px-8 py-2 transition-all duration-200 disabled:cursor-wait"
        >
          {{ loading ? 'Loading...' : 'Draw' }}
        </button>
      </div>
    </main>
    <!-- <sponsorBanner2></sponsorBanner2> -->
    <footer class="absolute bottom-4 w-screen text-center">
      <span class="text-slate-800">&copy; <strong>UTCSSA</strong> - Junyu Yao and Tech Department, 2024.</span>
    </footer>
  </div>
</template>

<script setup lang="ts">
const { $confetti } = useNuxtApp().vueApp.config.globalProperties
console.log(useNuxtApp().vueApp)
const dispNum = ref<number>(0)
const digitNum = ref<number>(2)
const loading = ref<boolean>(false)
const maxlotnum = 310
const lotterylist = Array.from({length: maxlotnum}, (_, i) => i + 1)


const draw1 = () => {
  dispNum.value = lotterylist[Math.floor(Math.random() * lotterylist.length)]
  lotterylist.splice(lotterylist.indexOf(dispNum.value),1)
}

const confettiSettings = {
  particlesPerFrame: 2,
  defaultDropRate: 15,
  particles: [{ type: 'circle' }, { type: 'heart' }, { type: 'rect' }]
};

const onAnimationEnd = () => {
  loading.value = false;
  $confetti.start(confettiSettings);
  setTimeout(() => {
    $confetti.stop()
  }, 2000)
}
</script>

<style scoped>
.column {
  float: left;
  width: 25%;
  padding: 20px;
}
</style>