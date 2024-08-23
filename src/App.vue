<template >
  <div
    x-data="{ progress: 0, interval: null, loading: true }"
    x-init="
      window.onload = () => {
        interval = setInterval(() => { 
          if (progress < 100) {
            progress++; 
          } else {
            clearInterval(interval);
            setTimeout(() => loading = false, 300); 
          }
        }, 30);
      }
    ">
      <div x-show="loading"
        x-bind:style="'width: ' + progress + '%;'" class="absolute top-0 h-1 transition-all duration-100 animate-pulse ease-in bg-gradient-to-r from-rose-400 via-fuchsia-500 to-cyan-500"
      >
      </div>
  </div>
  <RouterView />
</template>

<script lang="ts">
  import { defineComponent, computed, reactive } from 'vue'
  import { useHead } from '@vueuse/head'
  export default defineComponent({
    setup() {
      const siteData = reactive({
        viewport:`width=device-width, initial-scale=1.0, viewport-fit=cover`,
        appleCapable:`yes`,
        appleStatus:`black`,
        description: `Nguyen Tan Duy, web application developer using Laravel, VueJS, Tailwindcss,...`,
        keywords: `Nguyen Tan Duy, Laravel, VueJs, Tailwindcss`,
        robots: `index, follow`,
        revisit: `1 days`,
        propType: `website`,
        propUrl: `https://ntanduy.id.vn`,
        propTitle: `Nguyen Tan Duy`,
        xCard: `summary`,
        xSiteCre: `@ng_tanduy`,
        charset: `UTF-8`,
        alternateLinks: [
          { rel: "alternate", href: 'https://ntanduy.id.vn', hreflang: 'es' }
        ]
      })
      useHead({
        meta: [
          {
            charset: computed(() => siteData.charset),
          },
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
            name: `twitter:card`,
            content: computed(() => siteData.xCard),
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
          }
        ],
        link: computed(() => [
          { rel: 'canonical', href: siteData.propUrl },
          { rel: 'icon', type: 'image/svg+xml', href: '/vite.svg' },
          { rel: 'preload', href: 'https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap', as:'style' },
          { rel: 'stylesheet', href: 'https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' },
          ...siteData.alternateLinks
        ])
      })
    }
  })
</script>