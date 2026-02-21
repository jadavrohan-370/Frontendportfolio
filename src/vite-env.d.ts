/// <reference types="vite/client" />

declare module "*.glsl?raw" {
  const content: string;
  export default content;
}

declare module "@studio-freight/lenis" {
  export default class Lenis {
    constructor(options?: any);
    raf(time: number): void;
    destroy(): void;
  }
}

declare module "*.css" {
  const content: any;
  export default content;
}

declare module "*.vue" {
  import type { DefineComponent } from "vue";
  const component: DefineComponent<{}, {}, any>;
  export default component;
}
