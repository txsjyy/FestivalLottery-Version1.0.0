<template>
  <div>
    <nav>
    <ul>
      <li><a href="/1d">特等奖</a></li>
      <li><a href="/1n">大奖</a></li>
      <li><a href="/">幸运奖</a></li>
    </ul>
    </nav>
  </div>
  <div class="flex h-screen bg-center bg-no-repeat bg-cover bg-hero-pattern">
    <header class="absolute w-screen flex items-center justify-center pt-[10vh]">
      <img src="../assets/font.jpg" class = "scale-150 pb-40" alt="兔年新春晚会抽奖" >
    </header>
    <div class="column flex flex-col p-5">
      <img src="~/assets/WST.jpg" alt="鸣谢WST赞助" class="mt-auto flex-justify center m-5 scale-125 origin-bottom-left" />
    </div>
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
    <div class="column flex flex-col p-5">
      <img src="~/assets/UTA.png" alt="鸣谢Weeee赞助" class="mt-auto flex-justify center m-5 scale-110 origin-bottom-right"/>
    </div>
    <footer class="absolute bottom-4 w-screen text-center">
      <span class="text-slate-800">&copy; <strong>UTCSSA</strong> - Alex Kuang and Junyu Yao, 2023.</span>
    </footer>
  </div>
</template>

<script setup lang="ts">
const { $confetti } = useNuxtApp().vueApp.config.globalProperties
console.log(useNuxtApp().vueApp)
const dispNum = ref<number>(0)
const digitNum = ref<number>(2)
const loading = ref<boolean>(false)
const lotterylist = Array.from({length: 300}, (_, i) => i + 1)


const draw1 = () => {
  dispNum.value = lotterylist[Math.floor(Math.random() * lotterylist.length)]
  lotterylist.splice(lotterylist.indexOf(dispNum.value),1)
}

const onAnimationEnd = () => {
  loading.value = false
  $confetti.start({
    particlesPerFrame: 2,
    defaultDropRate: 15,
    particles: [
      { type: 'circle' },
      { type: 'heart' },
      { type: 'rect' },
    ]
  })
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
nav {
  background-color: #333;
  color: white;
  display: flex;
  justify-content: space-between;
  padding: 10px 20px;
}
nav ul {
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
}
nav li {
  margin: 0 10px;
}
nav a {
  color: white;
  text-decoration: none;
}
</style>