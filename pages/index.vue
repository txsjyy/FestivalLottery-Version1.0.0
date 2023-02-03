<template>
  <div class="flex h-screen bg-center bg-no-repeat bg-cover bg-hero-pattern">
    <header class="absolute w-screen flex items-center justify-center pt-[10vh]">
      <!-- <img src="../assets/UTCSSA.jpg" class="scale-50" alt="UTCSSA" > -->
      <img src="../assets/font.jpg" class = "scale-150 pb-40" alt="兔年新春晚会抽奖" >
    </header>
    <div class="column flex flex-col p-5">
      <img src="~/assets/WST.jpg" alt="鸣谢WST赞助" class="mt-auto flex-justify center m-5 scale-125 origin-bottom-left" />
    </div>
    <main class="m-auto mt-60 w-1/2 min-w-fit overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 backdrop-blur bg-white bg-opacity-60">
      <div class="center_column">
        <DigitDisplay1
        class="my-8"
        :target="dispNum1"
        @animation-start="loading = true"
        @animation-end="onAnimationEnd()"
        />
        <DigitDisplay2
        class="my-8"
        :target="dispNum2"
        @animation-start="loading = true"
        @animation-end="onAnimationEnd()"
        />
      </div>
      <div class="center_column">
        <DigitDisplay3
        class="my-8"
        :target="dispNum3"
        @animation-start="loading = true"
        @animation-end="onAnimationEnd()"
        />
        <div class="flex justify-center my-8">
          <button
            @click="draw()"
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
      </div>
      <div class="center_column">
        <DigitDisplay4
        class="my-8"
        :target="dispNum4"
        @animation-start="loading = true"
        @animation-end="onAnimationEnd()"
        />
        <DigitDisplay
        class="my-8"
        :target="dispNum"
        @animation-start="loading = true"
        @animation-end="onAnimationEnd()"
        />
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
const dispNum1 = ref<number>(0)
const dispNum2 = ref<number>(0)
const dispNum3 = ref<number>(0)
const dispNum4 = ref<number>(0)
const loading = ref<boolean>(false)

const lotterylist = Array.from({length: 300}, (_, i) => i + 1)

const draw = () => {
  dispNum.value = lotterylist[Math.floor(Math.random() * lotterylist.length)]
  lotterylist.splice(lotterylist.indexOf(dispNum.value),1)
  dispNum1.value = lotterylist[Math.floor(Math.random() * lotterylist.length)]
  lotterylist.splice(lotterylist.indexOf(dispNum1.value),1)
  dispNum2.value = lotterylist[Math.floor(Math.random() * lotterylist.length)]
  lotterylist.splice(lotterylist.indexOf(dispNum2.value),1)
  dispNum3.value = lotterylist[Math.floor(Math.random() * lotterylist.length)]
  lotterylist.splice(lotterylist.indexOf(dispNum3.value),1)
  dispNum4.value = lotterylist[Math.floor(Math.random() * lotterylist.length)]
  lotterylist.splice(lotterylist.indexOf(dispNum4.value),1)
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
  padding: 10px;
}
.center_column {
  float: left;
  width: 33.3%;
  padding: 15px;
}
</style>