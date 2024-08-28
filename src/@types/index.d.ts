declare module 'alpinejs';
declare module 'vue-writer';
declare module 'express';
declare module '@vercel/speed-insights';
declare module 'swiper'
declare module 'scrollreveal'
declare module '*.vue' {
    import { DefineComponent } from 'vue';
    const component: DefineComponent<{}, {}, any>;
    export default component;
}