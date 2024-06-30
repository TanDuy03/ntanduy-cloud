<template>
  <RouterView />
</template>

<script lang="ts">
  import { defineComponent, computed, reactive } from 'vue'
  import { useHead } from '@vueuse/head'
  export default defineComponent({
    setup() {
      const siteData = reactive({
        title: `Nguyen Tan Duy | Software Developer`,
        viewport:`width=device-width, initial-scale=1.0, viewport-fit=cover`,
        appleCapable:`yes`,
        appleStatus:`black`,
        description: `Nguyen Tan Duy, web application developer using Laravel, VueJS, Tailwindcss, Bootstrap,...`,
        keywords: `Nguyen Tan Duy, Laravel, VueJs, Tailwindcss, Bootstrap, FPT`,
        robots: `index, follow`,
        revisit: `1 days`,
        propType: `website`,
        propUrl: `https://ntanduy.id.vn`,
        propTitle: `Nguyen Tan Duy`,
        propImg: `/meta-img.jpg`,
        xcard: `summary`,
        xSiteCre: `@ng_tanduy`,
        alternateLinks: [
          { rel: "alternate", href: 'https://ntanduy.id.vn', hreflang: 'es' }
        ]
      })
      useHead({
        title: computed(() => siteData.title),
        meta: [
          {
            name: `apple-mobile-web-app-capable`,
            content: computed(() => siteData.appleCapable),
          },
          {
            name: `apple-mobile-web-app-status-bar-style`,
            content: computed(() => siteData.appleStatus),
          },
          {
            name: `viewport`,
            content: computed(() => siteData.viewport),
          },
          {
            name: `description`,
            content: computed(() => siteData.description),
          },
          {
            name: `keywords`,
            content: computed(() => siteData.keywords),
          },
          {
            name: `robots`,
            content: computed(() => siteData.robots),
          },
          {
            name: `revisit-after`,
            content: computed(() => siteData.revisit),
          },
          {
            property: `og:type`,
            content: computed(() => siteData.propType),
          },
          {
            property: `og:url`,
            content: computed(() => siteData.propUrl),
          },
          {
            property: `og:title`,
            content: computed(() => siteData.propTitle),
          },
          {
            property: `og:image`,
            content: computed(() => siteData.propImg),
          },
          {
            name: `twitter:card`,
            content: computed(() => siteData.xcard),
          },
          {
            name: `twitter:site`,
            content: computed(() => siteData.xSiteCre),
          },
          {
            name: `twitter:creator`,
            content: computed(() => siteData.xSiteCre),
          },
          {
            name: `twitter:url`,
            content: computed(() => siteData.propUrl),
          },
          {
            name: `twitter:title`,
            content: computed(() => siteData.propTitle),
          },
          {
            name: `twitter:description`,
            content: computed(() => siteData.description),
          },
          {
            name: `twitter:image`,
            content: computed(() => siteData.propImg),
          },
        ],
        link: computed(() => [
          { rel: 'canonical', href: siteData.propUrl },
          { rel: 'icon', type: 'image/svg+xml', href: '/vite.svg' },
          { rel: 'stylesheet', href: 'https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' },
          ...siteData.alternateLinks
        ])
      })
    }
  })
</script>