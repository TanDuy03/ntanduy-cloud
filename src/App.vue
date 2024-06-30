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
        proptype: `website`,
        propurl: `https://ntanduy.id.vn`,
        proptitle: `Nguyen Tan Duy`,
        propimg: `/assets/meta-img.jpg`,
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
            content: computed(() => siteData.proptype),
          },
          {
            property: `og:url`,
            content: computed(() => siteData.propurl),
          },
          {
            property: `og:title`,
            content: computed(() => siteData.proptitle),
          },
          {
            property: `og:image`,
            content: computed(() => siteData.propimg),
          },
        ]
      })
    }
  })
</script>