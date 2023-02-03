<template>
  <div class="flex gap-3 justify-center">
    <div class="font-mono text-9xl bg-slate-200 shadow-inner rounded p-2 text-center opacity-60">{{ display[0] }}</div>
    <div class="font-mono text-9xl bg-slate-200 shadow-inner rounded p-2 text-center opacity-60">{{ display[1] }}</div>
    <div class="font-mono text-9xl bg-slate-200 shadow-inner rounded p-2 text-center opacity-60">{{ display[2] }}</div>
  </div>
</template>

<script setup lang="ts">
import gsap from 'gsap'
import { range, shuffle } from 'lodash-es'

const props = defineProps<{ target: number,digit: number }>()
const emits = defineEmits<{
  (event: 'animation-start'): void,
  (event: 'animation-end'): void,
  (event: 'animation-update'): void
}>()
const startTicks = [0, 0, 0]
var animateData: {
    shuffled: string[];
    ticks: number;
}[]
var onComplete = () => {
    emits('animation-update')
  }
var onUpdate: () => void
const display = reactive(['0', '0', '0'])

// first draw and first digit change
watch(() => props.target, (newTarget) => {
  emits('animation-start')
  // recevie new target
  const target = newTarget.toString().padStart(3, '0').split('')
  // shuffle and calculate ticks
  animateData = range(0, 3).map(i => {
    const shuffled = shuffle(range(0, 10)).map(String)
    const targetIndex = shuffled.indexOf(target[i])
    const ticks = 10 * (i + 7) + targetIndex
    return { shuffled, ticks }
  })
  onComplete = () => {
    emits('animation-update')
  }
  // first draw
  onUpdate = () => {
      const displayIndex = Math.round(startTicks[0]) % 10
      display[0] = animateData[0].shuffled[displayIndex]
      display[1] = "0"
      display[2] = "0"
    }
  // first digit change
  gsap.timeline({ onUpdate, onComplete })
    .to(startTicks, { '0': animateData[0].ticks, duration: 5 }, 0)
  console.log("digit0 change")
})
// second and third digit change
watch(() => props.digit, (newDigit) => {
  if (newDigit == 1) {
    emits('animation-start')
    onComplete = () => {
    emits('animation-update')
    }
    // third digit change
    onUpdate = () => {
      const displayIndex = Math.round(startTicks[1]) % 10
      display[1] = animateData[1].shuffled[displayIndex]
    }
    gsap.timeline({ onUpdate, onComplete })
    .to(startTicks, { '1': animateData[1].ticks, duration: 5 }, 0)
    console.log("digit1 change")
  } else if (newDigit == 2) {
    emits('animation-start')
    onComplete = () => {
    emits('animation-end')
    }
    // third digit change
    onUpdate = () => {
      const displayIndex = Math.round(startTicks[2]) % 10
      display[2] = animateData[2].shuffled[displayIndex]
    }
    gsap.timeline({ onUpdate, onComplete })
    .to(startTicks, { '2': animateData[2].ticks, duration: 5 }, 0)
    console.log("digit2 change")
  }
})
</script>