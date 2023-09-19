import type { NavigationGuard } from 'vue-router'
export type MiddlewareKey = string
declare module "C:/Users/He Tianxing/Documents/truelot/lottery-combined/node_modules/nuxt/dist/pages/runtime/composables" {
  interface PageMeta {
    middleware?: MiddlewareKey | NavigationGuard | Array<MiddlewareKey | NavigationGuard>
  }
}