import { _ as _sfc_main$1 } from "./DigitDisplay-a62b5f01.js";
import { u as useNuxtApp, _ as _export_sfc } from "../server.mjs";
import { defineComponent, ref, unref, useSSRContext } from "vue";
import "destr";
import { ssrRenderAttr, ssrRenderComponent, ssrIncludeBooleanAttr, ssrRenderClass, ssrInterpolate } from "vue/server-renderer";
import { _ as _imports_0, a as _imports_1, b as _imports_2 } from "./UTA-909a626e.js";
import "gsap";
import "lodash-es";
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
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "1n",
  __ssrInlineRender: true,
  setup(__props) {
    const { $confetti } = useNuxtApp().vueApp.config.globalProperties;
    console.log(useNuxtApp().vueApp);
    const dispNum = ref(0);
    ref(2);
    const loading = ref(false);
    const maxlotnum = 300;
    Array.from({ length: maxlotnum }, (_, i) => i + 1);
    const confettiSettings = {
      particlesPerFrame: 2,
      defaultDropRate: 15,
      particles: [{ type: "circle" }, { type: "heart" }, { type: "rect" }]
    };
    const onAnimationEnd = () => {
      loading.value = false;
      $confetti.start(confettiSettings);
      setTimeout(() => {
        $confetti.stop();
      }, 2e3);
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_DigitDisplay = _sfc_main$1;
      _push(`<!--[--><div data-v-ba38a468><nav data-v-ba38a468><ul data-v-ba38a468><li data-v-ba38a468><a href="/1d" data-v-ba38a468>特等奖</a></li><li data-v-ba38a468><a href="/1n" data-v-ba38a468>大奖</a></li><li data-v-ba38a468><a href="/" data-v-ba38a468>幸运奖</a></li></ul></nav></div><div class="flex h-screen bg-center bg-no-repeat bg-cover bg-hero-pattern" data-v-ba38a468><header class="absolute w-screen flex items-center justify-center pt-[10vh]" data-v-ba38a468><img${ssrRenderAttr("src", _imports_0)} class="scale-150 pb-40" alt="兔年新春晚会抽奖" data-v-ba38a468></header><div class="column flex flex-col p-5" data-v-ba38a468><img${ssrRenderAttr("src", _imports_1)} alt="鸣谢WST赞助" class="mt-auto flex-justify center m-5 scale-125 origin-bottom-left" data-v-ba38a468></div><main class="m-auto w-1/2 min-w-fit overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 backdrop-blur bg-white bg-opacity-60" data-v-ba38a468>`);
      _push(ssrRenderComponent(_component_DigitDisplay, {
        class: "my-8",
        target: unref(dispNum),
        onAnimationStart: ($event) => loading.value = true,
        onAnimationEnd: ($event) => onAnimationEnd()
      }, null, _parent));
      _push(`<div class="flex justify-center my-8" data-v-ba38a468><button${ssrIncludeBooleanAttr(unref(loading)) ? " disabled" : ""} class="${ssrRenderClass([{
        "bg-gray-300": unref(loading),
        "bg-red-500 hover:bg-red-600 active:bg-red-700 active:shadow-inner shadow-md": !unref(loading)
      }, "text-white text-5xl font-medium rounded-full px-8 py-2 transition-all duration-200 disabled:cursor-wait"])}" data-v-ba38a468>${ssrInterpolate(unref(loading) ? "Loading..." : "Draw")}</button></div></main><div class="column flex flex-col p-5" data-v-ba38a468><img${ssrRenderAttr("src", _imports_2)} alt="鸣谢Weeee赞助" class="mt-auto flex-justify center m-5 scale-110 origin-bottom-right" data-v-ba38a468></div><footer class="absolute bottom-4 w-screen text-center" data-v-ba38a468><span class="text-slate-800" data-v-ba38a468>© <strong data-v-ba38a468>UTCSSA</strong> - Alex Kuang and Junyu Yao, 2023.</span></footer></div><!--]-->`);
    };
  }
});
const _1n_vue_vue_type_style_index_0_scoped_ba38a468_lang = "";
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/1n.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _1n = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-ba38a468"]]);
export {
  _1n as default
};
//# sourceMappingURL=1n-2f7bcde2.js.map
