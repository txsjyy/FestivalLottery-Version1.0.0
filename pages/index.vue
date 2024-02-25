<template>
  <Navbar current-page=""></Navbar>
  <div class="flex h-screen bg-center bg-no-repeat bg-cover bg-hero-pattern">
    <!-- <sponsorBanner1></sponsorBanner1> -->
    <div class="absolute top-4 w-screen text-center">
    <!-- Display data once it's loaded -->
  </div>
    <main class="m-auto mt-60 w-1/2 min-w-fit overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 backdrop-blur bg-white bg-opacity-60">
      <div class="center_column">
        <DigitDisplay
        class="my-8"
        :target="dispNum1"
        @animation-start="loading = true"
        @animation-end="onAnimationEnd()"
        />
        <button
          @click="redraw1()"
          :disabled="!isDrawn || loading"
          class="mx-auto mt-4 bg-blue-500 disabled:bg-gray-400 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Redraw
        </button>
        <DigitDisplay
        class="my-8"
        :target="dispNum2"
        @animation-start="loading = true"
        @animation-end="onAnimationEnd()"
        />
        <button
          @click="redraw2()"
          :disabled="!isDrawn || loading"
          class="mx-auto mt-4 bg-blue-500 disabled:bg-gray-400 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Redraw
        </button>
      </div>
      <div class="center_column">
        <DigitDisplay
        class="my-8"
        :target="dispNum3"
        @animation-start="loading = true"
        @animation-end="onAnimationEnd()"
        />
        <button
          @click="redraw3()"
          :disabled="!isDrawn || loading"
          class="mx-auto mt-4 bg-blue-500 disabled:bg-gray-400 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Redraw
        </button>
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
        <button
          @click="redraw4()"
          :disabled="!isDrawn || loading"
          class="mx-auto mt-4 bg-blue-500 disabled:bg-gray-400 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Redraw
        </button>
        <DigitDisplay
        class="my-8"
        :target="dispNum"
        @animation-start="loading = true"
        @animation-end="onAnimationEnd()"
        />
        <button
          @click="redraw()"
          :disabled="!isDrawn || loading"
          class="mx-auto mt-4 bg-blue-500 disabled:bg-gray-400 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Redraw
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
import { ref, onMounted } from 'vue'

const data = ref(null)
const error = ref<string | null>(null)
const loading1 = ref(false)

// Function to fetch data automatically on page setup
onMounted(async () => {
  await fetchData()
})

const fetchData = async () => {
  loading1.value = true
  try {
    const response = await fetch('/api/sheet')
    if (!response.ok) throw new Error('Failed to fetch')
    const jsonData = await response.json()
    data.value = jsonData.data
  } catch (err) {
    error.value = err instanceof Error ? err.message : "An unexpected error occurred"
  } finally {
    loading1.value = false
  }
}

// Function to write data
const writeData = async (newData: any[]) => {
  try {
    const response = await fetch('/api/sheet', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ values: newData }), // Adjust the structure as needed for your sheet
    })
    if (!response.ok) throw new Error('Failed to write data')
    // Optionally, fetch data again to refresh the view
    await fetchData()
  } catch (err) {
    error.value = err instanceof Error ? err.message : "An unexpected error occurred"
  }
}


const { $confetti } = useNuxtApp().vueApp.config.globalProperties
console.log(useNuxtApp().vueApp)
const dispNum = ref<number>(0)
const dispNum1 = ref<number>(0)
const dispNum2 = ref<number>(0)
const dispNum3 = ref<number>(0)
const dispNum4 = ref<number>(0)
const loading = ref<boolean>(false)
const isDrawn = ref<boolean>(false)
const lotterylist = Array.from({length: 310}, (_, i) => i + 1)

const drawNumber = () => {
  const number = lotterylist[Math.floor(Math.random() * lotterylist.length)];
  lotterylist.splice(lotterylist.indexOf(number), 1);
  return number;
}

const draw = () => {
  [dispNum, dispNum1, dispNum2, dispNum3, dispNum4].forEach(ref => {
    ref.value = drawNumber();
  });
  isDrawn.value = true;
}


const redraw = () => {
  dispNum.value = drawNumber();
}

const redraw1 = () => {
  dispNum1.value = drawNumber();
}

const redraw2 = () => {
  dispNum2.value = drawNumber();
}

const redraw3 = () => {
  dispNum3.value = drawNumber();
}

const redraw4 = () => {
  dispNum4.value = drawNumber();
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

</style>