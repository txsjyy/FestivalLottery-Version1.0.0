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
      <!-- <img src="../assets/UTCSSA.jpg" class="scale-50" alt="UTCSSA" > -->
      <img src="../assets/font.jpg" class = "scale-150 pb-40" alt="兔年新春晚会抽奖" >
    </header>
    <div class="column flex flex-col p-5">
      <img src="~/assets/WST.jpg" alt="鸣谢WST赞助" class="mt-auto flex-justify center m-5 scale-125 origin-bottom-left" />
    </div>
    <main class="m-auto mt-60 w-1/2 min-w-fit overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 backdrop-blur bg-white bg-opacity-60">
      <div class="center_column">
        <DigitDisplay
        class="my-8"
        :target="dispNum1"
        @animation-start="loading = true"
        @animation-end="onAnimationEnd()"
        />
        <DigitDisplay
        class="my-8"
        :target="dispNum2"
        @animation-start="loading = true"
        @animation-end="onAnimationEnd()"
        />
      </div>
      <div class="center_column">
        <DigitDisplay
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
        <DigitDisplay
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

const drawNumber = () => {
  const number = lotterylist[Math.floor(Math.random() * lotterylist.length)];
  lotterylist.splice(lotterylist.indexOf(number), 1);
  return number;
}

const draw = () => {
  [dispNum, dispNum1, dispNum2, dispNum3, dispNum4].forEach(ref => {
    ref.value = drawNumber();
  });
}

// Pre-defined confetti settings
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

<style>
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