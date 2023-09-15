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
const props = defineProps<{ target: number }>()
const emits = defineEmits<{
  (event: 'animation-start'): void,
  (event: 'animation-end'): void,
}>()
const display = reactive(['0', '0', '0'])
watch(() => props.target, (newTarget) => {
  emits('animation-start')
  const target = newTarget.toString().padStart(3, '0').split('')
  const animateData = range(0, 3).map(i => {
    const shuffled = shuffle(range(0, 10)).map(String)
    const targetIndex = shuffled.indexOf(target[i])
    const ticks = 10 * (i + 7) + targetIndex
    return { shuffled, ticks }
  })
  const startTicks = [0, 0, 0]
  const onComplete =() => { emits('animation-end') }
  const onUpdate = () => animateData
    .forEach((datum, i) => {
      const displayIndex = Math.round(startTicks[i]) % 10
      display[i] = datum.shuffled[displayIndex]
    })
  gsap.timeline({ onUpdate, onComplete })
    .to(startTicks, { '0': animateData[0].ticks, duration: 5 }, 0)
    .to(startTicks, { '1': animateData[1].ticks, duration: 6 }, 0)
    .to(startTicks, { '2': animateData[2].ticks, duration: 7 }, 0)
})
</script>