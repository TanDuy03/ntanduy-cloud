declare module 'alpinejs';
declare module 'vue-writer';
declare module 'express';
declare module '*.vue' {
    import { DefineComponent } from 'vue';
    const component: DefineComponent<{}, {}, any>;
    export default component;
}