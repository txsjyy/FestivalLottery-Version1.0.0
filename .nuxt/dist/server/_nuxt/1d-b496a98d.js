import { defineComponent, reactive, watch, mergeProps, unref, useSSRContext, ref } from "vue";
import { ssrRenderAttrs, ssrInterpolate, ssrRenderAttr, ssrRenderComponent, ssrIncludeBooleanAttr, ssrRenderClass } from "vue/server-renderer";
import gsap from "gsap";
import { range, shuffle } from "lodash-es";
import { u as useNuxtApp } from "../server.mjs";
import "destr";
import { _ as _imports_0, a as _imports_1, b as _imports_2 } from "./UTA-909a626e.js";
import "ofetch";
import "#internal/nitro";
import "hookable";
import "unctx";
import "ufo";
import "h3";
import "@unhead/vue";
import "@unhead/dom";
import "@unhead/ssr";
import "vue-router";
import "defu";
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "DigitDisplaydigit",
  __ssrInlineRender: true,
  props: {
    target: null,
    digit: null
  },
  emits: ["animation-start", "animation-end", "animation-update"],
  setup(__props, { emit: emits }) {
    const props = __props;
    var startTicks = [0, 0, 0];
    var animateData;
    var onComplete = () => {
      emits("animation-update");
    };
    var onUpdate;
    const display = reactive(["0", "0", "0"]);
    watch(() => props.target, (newTarget) => {
      emits("animation-start");
      startTicks = [0, 0, 0];
      const target = newTarget.toString().padStart(3, "0").split("").map(Number);
      animateData = range(0, 3).map((i) => {
        const shuffled = i === 0 ? shuffle(range(0, 4)) : shuffle(range(0, 10));
        const targetIndex = shuffled.indexOf(target[i]);
        const ticks = i === 0 ? 4 * (i + 7) + targetIndex : 10 * (i + 7) + targetIndex;
        return { shuffled, ticks };
      });
      onComplete = () => {
        emits("animation-update");
      };
      onUpdate = () => {
        const displayIndex = Math.round(startTicks[0]) % 4;
        display[0] = animateData[0].shuffled[displayIndex].toString();
        display[1] = "0";
        display[2] = "0";
      };
      gsap.timeline({ onUpdate, onComplete }).to(startTicks, { "0": animateData[0].ticks, duration: 5 }, 0);
      console.log("digit0 change");
    });
    watch(() => props.digit, (newDigit) => {
      if (newDigit == 1) {
        emits("animation-start");
        onComplete = () => {
          emits("animation-update");
        };
        onUpdate = () => {
          const displayIndex = Math.round(startTicks[1]) % 10;
          display[1] = animateData[1].shuffled[displayIndex].toString();
        };
        gsap.timeline({ onUpdate, onComplete }).to(startTicks, { "1": animateData[1].ticks, duration: 5 }, 0);
        console.log("digit1 change");
      } else if (newDigit == 2) {
        emits("animation-start");
        onComplete = () => {
          emits("animation-end");
        };
        onUpdate = () => {
          const displayIndex = Math.round(startTicks[2]) % 10;
          display[2] = animateData[2].shuffled[displayIndex].toString();
        };
        gsap.timeline({ onUpdate, onComplete }).to(startTicks, { "2": animateData[2].ticks, duration: 5 }, 0);
        console.log("digit2 change");
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex gap-3 justify-center" }, _attrs))}><div class="font-mono text-9xl bg-slate-200 shadow-inner rounded p-2 text-center opacity-60">${ssrInterpolate(unref(display)[0])}</div><div class="font-mono text-9xl bg-slate-200 shadow-inner rounded p-2 text-center opacity-60">${ssrInterpolate(unref(display)[1])}</div><div class="font-mono text-9xl bg-slate-200 shadow-inner rounded p-2 text-center opacity-60">${ssrInterpolate(unref(display)[2])}</div></div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/DigitDisplaydigit.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "1d",
  __ssrInlineRender: true,
  setup(__props) {
    const { $confetti } = useNuxtApp().vueApp.config.globalProperties;
    console.log(useNuxtApp().vueApp);
    const dispNum = ref(0);
    const digitNum = ref(2);
    const loading = ref(false);
    Array.from({ length: 300 }, (_, i) => i + 1);
    const onAnimationEnd = () => {
      loading.value = false;
      $confetti.start({
        particlesPerFrame: 2,
        defaultDropRate: 15,
        particles: [
          { type: "circle" },
          { type: "heart" },
          { type: "rect" }
        ]
      });
      setTimeout(() => {
        $confetti.stop();
      }, 2e3);
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_DigitDisplaydigit = _sfc_main$1;
      _push(`<!--[--><div><nav><ul><li><a href="/1d">特等奖</a></li><li><a href="/1n">大奖</a></li><li><a href="/">幸运奖</a></li></ul></nav></div><div class="flex h-screen bg-center bg-no-repeat bg-cover bg-hero-pattern"><header class="absolute w-screen flex items-center justify-center pt-[10vh]"><img${ssrRenderAttr("src", _imports_0)} class="scale-150 pb-40" alt="兔年新春晚会抽奖"></header><div class="column flex flex-col p-5"><img${ssrRenderAttr("src", _imports_1)} alt="鸣谢WST赞助" class="mt-auto flex-justify center m-5 scale-125 origin-bottom-left"></div><main class="m-auto w-1/2 min-w-fit overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 backdrop-blur bg-white bg-opacity-60">`);
      _push(ssrRenderComponent(_component_DigitDisplaydigit, {
        class: "my-8",
        target: unref(dispNum),
        digit: unref(digitNum),
        onAnimationStart: ($event) => loading.value = true,
        onAnimationEnd: ($event) => onAnimationEnd(),
        onAnimationUpdate: ($event) => loading.value = false
      }, null, _parent));
      _push(`<div class="flex justify-center my-8"><button${ssrIncludeBooleanAttr(unref(loading)) ? " disabled" : ""} class="${ssrRenderClass([{
        "bg-gray-300": unref(loading),
        "bg-red-500 hover:bg-red-600 active:bg-red-700 active:shadow-inner shadow-md": !unref(loading)
      }, "text-white text-5xl font-medium rounded-full px-8 py-2 transition-all duration-200 disabled:cursor-wait"])}">${ssrInterpolate(unref(loading) ? "Loading..." : "Draw")}</button></div></main><div class="column flex flex-col p-5"><img${ssrRenderAttr("src", _imports_2)} alt="鸣谢Weeee赞助" class="mt-auto flex-justify center m-5 scale-110 origin-bottom-right"></div><footer class="absolute bottom-4 w-screen text-center"><span class="text-slate-800">© <strong>UTCSSA</strong> - Alex Kuang and Junyu Yao, 2023.</span></footer></div><!--]-->`);
    };
  }
});
const _1d_vue_vue_type_style_index_0_lang = "";
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/1d.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=1d-b496a98d.js.map
