import { defineComponent, reactive, watch, mergeProps, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrInterpolate } from "vue/server-renderer";
import gsap from "gsap";
import { range, shuffle } from "lodash-es";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "DigitDisplay",
  __ssrInlineRender: true,
  props: {
    target: null
  },
  emits: ["animation-start", "animation-end"],
  setup(__props, { emit: emits }) {
    const props = __props;
    const display = reactive(["0", "0", "0"]);
    watch(() => props.target, (newTarget) => {
      emits("animation-start");
      const target = newTarget.toString().padStart(3, "0").split("").map(Number);
      const animateData = range(0, 3).map((i) => {
        const shuffled = i === 0 ? shuffle(range(0, 4)) : shuffle(range(0, 10));
        const targetIndex = shuffled.indexOf(target[i]);
        const ticks = i === 0 ? 4 * (i + 7) + targetIndex : 10 * (i + 7) + targetIndex;
        return { shuffled, ticks };
      });
      const startTicks = [0, 0, 0];
      const onComplete = () => {
        emits("animation-end");
      };
      const onUpdate = () => animateData.forEach((datum, i) => {
        const displayIndex = i === 0 ? Math.round(startTicks[i]) % 4 : Math.round(startTicks[i]) % 10;
        display[i] = datum.shuffled[displayIndex].toString();
        display[i] = datum.shuffled[displayIndex].toString();
      });
      gsap.timeline({ onUpdate, onComplete }).to(startTicks, { "0": animateData[0].ticks, duration: 5 }, 0).to(startTicks, { "1": animateData[1].ticks, duration: 6 }, 0).to(startTicks, { "2": animateData[2].ticks, duration: 7 }, 0);
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex gap-3 justify-center" }, _attrs))}><div class="font-mono text-9xl bg-slate-200 shadow-inner rounded p-2 text-center opacity-60">${ssrInterpolate(unref(display)[0])}</div><div class="font-mono text-9xl bg-slate-200 shadow-inner rounded p-2 text-center opacity-60">${ssrInterpolate(unref(display)[1])}</div><div class="font-mono text-9xl bg-slate-200 shadow-inner rounded p-2 text-center opacity-60">${ssrInterpolate(unref(display)[2])}</div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/DigitDisplay.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as _
};
//# sourceMappingURL=DigitDisplay-a62b5f01.js.map
