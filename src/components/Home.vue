<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import CountUp from 'vue-countup-v3'
import axios from 'axios'
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'
import { getDatabase, push, ref as dbRef, query, orderByChild, equalTo, get } from "firebase/database"
import Meta from './icons/Meta.vue'
import Instagram from './icons/Instagram.vue'
import Twitter from './icons/Twitter.vue'
import Github from './icons/Github.vue'
import Laravel from './icons/Laravel.vue'
import Vuejs from './icons/Vuejs.vue'
import Tailwind from './icons/Tailwind.vue'
import Git from './icons/Git.vue'
import Cloudflare from './icons/Cloudflare.vue'
// import Account from './icons/Account.vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay, Pagination, Navigation, Scrollbar } from 'swiper/modules'
import 'swiper/css'
import ScrollReveal from 'scrollreveal'

// Initialize Database
const db = getDatabase()
const props = defineProps<{ name: string, userID: string, description: string }>()
const ipAddress = ref("")
const city = ref("")
const org = ref("")
const loc = ref("")
const timezone = ref("")
const country = ref("")
const postal = ref("")
const menu = ref()
const options = {
  chart: {
    height: 300,
    type: 'line',
    toolbar: {
      show: false
    }
  },
  colors: ["#3736af", "#3693FF"],
  dataLabels: {
    enabled: false
  },
  stroke: {
    curve: 'smooth',
    width: 6
  },
  legend: {
    show: false,

  },
  markers: {
    strokeWidth: 5,
    strokeColors: '#fff',
    hover: {
      size: 10,
    },
  },
  grid: {
    show: true,
    strokeDashArray: 6,
    borderColor: '#e6e6e6',
    xaxis: {
      lines: {
        show: true
      },
    },
    yaxis: {
      lines: {
        show: false
      },
    },
  },
  yaxis: {
    show: false,
    labels: {
      style: {
        colors: '#717579',
        fontSize: '12px',
        fontFamily: 'Poppins',
        fontWeight: 400

      },
      formatter: function (value: number) {
        return value + "USD";
      }
    },
  },
  xaxis: {
    categories: ["Jan", "Feb", "Mar", "Apr", "jun", "Jul", "Aug", "Sep", "Oct", "Nov"],
    labels: {
      style: {
        colors: '#B5B5C3',
        fontSize: '12px',
        fontFamily: 'Poppins',
        fontWeight: 400

      },
    },
    axisBorder: {
      show: false,
    },
    tooltip: {
      enabled: false,
    }
  }
}
const series = [{
  name: '1 ETH',
  className: 'bg-primary',
  data: [10000, 25000, 15000, 5000, 8000, 7000, 6000, 5000, 10000, 4000]
}, {
  name: '1 XRP',
  className: 'bg-secondary',
  data: [7000, 15000, 8000, 3000, 4000, 5000, 1000, 500, 8000, 2000]
}]

axios.get('https://ipinfo.io/json', {
  params: {
    token: process.env.VITE_TOKEN_IP
  }
})
  .then((response) => {
    const getData = response.data
    ipAddress.value = getData.ip || null
    city.value = getData.city || null
    org.value = getData.org || null
    loc.value = getData.loc || null
    timezone.value = getData.timezone || null
    country.value = getData.country || null
    postal.value = getData.postal || null

    // Firebase Database Realtime
    const ipUnique = query(dbRef(db, 'ip/'), orderByChild('ip'), equalTo(ipAddress.value))
    get(ipUnique)
      .then((data) => {
        data.exists() ? undefined : push(dbRef(db, 'ip/'), {
          ip: ipAddress.value,
          location: city.value,
          org: org.value,
          loc: loc.value,
          timezone: timezone.value,
          country: country.value,
          postal: postal.value,
        })
      })
  })
  .catch((error) => {
    toast.error(error.message, {
      autoClose: 1600
    })
  });

  function addActice() {
    const scrollPosition = window.scrollY

    if (scrollPosition > 10) { 
      menu.value.classList.add("active")
    } else {
      menu.value.classList.remove("active")
    }
  }

  onMounted(() => {
    window.addEventListener("scroll", addActice)

    const sr = ScrollReveal();
    var slideUp = {
      delay: 375,
      duration: 500,
      distance: '30px',
      origin: 'top',
      opacity: null,
      easing: 'ease-out',
      reset: true
    };
    var slideDown = {
      delay: 375,
      duration: 500,
      distance: '30px',
      origin: 'bottom',
      opacity: null,
      easing: 'ease-out',
      reset: true
    };
    var slideLeft = {
      delay: 375,
      duration: 500,
      distance: '30px',
      origin: 'left',
      opacity: null,
      easing: 'ease-out',
      reset: true
    };
    var slideRight = {
      delay: 375,
      duration: 500,
      distance: '30px',
      origin: 'right',
      opacity: null,
      easing: 'ease-out',
      reset: true
    };
    sr.reveal('.slide-up', slideUp)
    sr.reveal('.slide-down', slideDown)
    sr.reveal('.slide-left', slideLeft)
    sr.reveal('.slide-right', slideRight)
  })

  onBeforeUnmount(() => {
    window.removeEventListener("scroll", addActice)
  })
</script>

<template>
  <div class="container-fluid">
    <div class="w-full h-44 md:h-52 bg-[#3736af] absolute top-0 left-0 baner-top"></div>
    <div class="fixed top-0 header-top w-full p-5 md:px-12 z-50" ref="menu">
      <div class="flex justify-between items-center relative">
        <div class="flex justify-center items-center gap-2 md:gap-3">
          <button aria-label="Menu" class="p-2 bg-[#ffffff1f] rounded-lg text-white">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
              class="icon icon-tabler icons-tabler-outline icon-tabler-menu-2">
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M4 6l16 0" />
              <path d="M4 12l16 0" />
              <path d="M4 18l16 0" />
            </svg>
          </button>
          <a href="#" aria-label="Dark Mode" class="p-2 md:bg-[#ffffff1f] rounded-lg text-white">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
              class="icon icon-tabler icons-tabler-outline icon-tabler-brightness-up">
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
              <path d="M12 5l0 -2" />
              <path d="M17 7l1.4 -1.4" />
              <path d="M19 12l2 0" />
              <path d="M17 17l1.4 1.4" />
              <path d="M12 19l0 2" />
              <path d="M7 17l-1.4 1.4" />
              <path d="M6 12l-2 0" />
              <path d="M7 7l-1.4 -1.4" />
            </svg>
          </a>
        </div>
        <div class="flex gap-2 md:gap-4">
          <div class="flex gap-2 md:gap-3">
            <a href="https://facebook.com/ntanduy03" target="_blank" aria-label="Facebook"
              class="p-2 md:bg-[#ffffff1f] rounded-lg text-white">
              <Meta />
            </a>
            <a href="https://github.com/TanDuy03" target="_blank" aria-label="Github"
              class="p-2 md:bg-[#ffffff1f] rounded-lg text-white">
              <Github />
            </a>
            <a href="https://x.com/daniel_saigon" target="_blank" aria-label="Twitter"
              class="p-2 md:bg-[#ffffff1f] rounded-lg text-white">
              <Twitter />
            </a>
            <a href="https://instagram.com/ng.tanduy26" target="_blank" aria-label="Instagram"
              class="p-2 md:bg-[#ffffff1f] rounded-lg text-white">
              <Instagram />
            </a>
          </div>

          <div class="flex gap-3">
            <div class="md:flex flex-col text-right hidden">
              <h3 class="text-white font-bold">{{ props.name }}</h3>
              <small class="text-white">@{{ props.userID }}</small>
            </div>
            <img class="size-[42px] rounded-full"
              v-lazy="'https://ik.imagekit.io/odbmay3h6/avatar.jpg?updatedAt=1724846688735'"
              :alt="props.name">
          </div>
        </div>
      </div>
    </div>
    <div class="px-5 md:px-12">
      <div class="relative w-full border-line top-[-14px] md:top-[-45px]"></div>
    </div>
    <div class="mt-24 md:mt-32"></div>
    <div class="w-full p-5 md:px-12 min-h-[500px] bg-[#09153F]">
      <div class="z-[1]">
        <swiper :modules="[Autoplay, Scrollbar, Pagination, Navigation]" :slides-per-view="1" :speed="15000" :space-between="20"
          :scrollbar="{ draggable: true }" :autoplay="{
            delay: 0,
            disableOnInteraction: false,
            reverseDirection: true,
            pauseOnMouseEnter: true,
          }" :breakpoints="{
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 25,
            },
            1024: {
              slidesPerView: 4,
              spaceBetween: 30,
            },
          }">
          <swiper-slide>
            <div class="max-w-full p-6 bg-[#F4392E] rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
              <div class="flex gap-3 items-center">
                <div class="size-11 p-2 bg-white mb-3 flex justify-center items-center rounded-md">
                  <Laravel />
                </div>
                <h2 class="mb-2 text-lg font-semibold tracking-tight text-white dark:text-white">Laravel
                </h2>
              </div>
              <a href="https://laravel.com" target="_blank"
                class="inline-flex font-normal items-center text-white hover:underline">
                <small class="text-[14px]">Documentation</small>
                <svg class="w-2 h-2 ms-2.5 rtl:rotate-[270deg]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                  fill="none" viewBox="0 0 18 18">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M15 11v4.833A1.166 1.166 0 0 1 13.833 17H2.167A1.167 1.167 0 0 1 1 15.833V4.167A1.166 1.166 0 0 1 2.167 3h4.618m4.447-2H17v5.768M9.111 8.889l7.778-7.778" />
                </svg>
              </a>
            </div>
          </swiper-slide>
          <swiper-slide>
            <div class="max-w-full p-6 bg-[#3AB67A] rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
              <div class="flex gap-3 items-center">
                <div class="size-11 p-2 bg-white mb-3 flex justify-center items-center rounded-md">
                  <Vuejs />
                </div>
                <h2 class="mb-2 text-lg font-semibold tracking-tight text-white dark:text-white">Vuejs
                </h2>
              </div>
              <a href="https://vuejs.org" target="_blank"
                class="inline-flex font-normal items-center text-white hover:underline">
                <small class="text-[14px]">Documentation</small>
                <svg class="w-2 h-2 ms-2.5 rtl:rotate-[270deg]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                  fill="none" viewBox="0 0 18 18">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M15 11v4.833A1.166 1.166 0 0 1 13.833 17H2.167A1.167 1.167 0 0 1 1 15.833V4.167A1.166 1.166 0 0 1 2.167 3h4.618m4.447-2H17v5.768M9.111 8.889l7.778-7.778" />
                </svg>
              </a>
            </div>
          </swiper-slide>
          <swiper-slide>
            <div class="max-w-full p-6 bg-[#F54D27] rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
              <div class="flex gap-3 items-center">
                <div class="size-11 p-2 bg-white mb-3 flex justify-center items-center rounded-md">
                  <Git />
                </div>
                <h2 class="mb-2 text-lg font-semibold tracking-tight text-white dark:text-white">Git
                </h2>
              </div>
              <a href="https://git-scm.com" target="_blank"
                class="inline-flex font-normal items-center text-white hover:underline">
                <small class="text-[14px]">Documentation</small>
                <svg class="w-2 h-2 ms-2.5 rtl:rotate-[270deg]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                  fill="none" viewBox="0 0 18 18">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M15 11v4.833A1.166 1.166 0 0 1 13.833 17H2.167A1.167 1.167 0 0 1 1 15.833V4.167A1.166 1.166 0 0 1 2.167 3h4.618m4.447-2H17v5.768M9.111 8.889l7.778-7.778" />
                </svg>
              </a>
            </div>
          </swiper-slide>
          <swiper-slide>
            <div class="max-w-full p-6 bg-[#3693FF] rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
              <div class="flex gap-3 items-center">
                <div class="size-11 p-2 bg-white mb-3 flex justify-center items-center rounded-md">
                  <Tailwind />
                </div>
                <h2 class="mb-2 text-lg font-semibold tracking-tight text-white dark:text-white">Tailwindcss
                </h2>
              </div>
              <a href="https://tailwindcss.com" target="_blank"
                class="inline-flex font-normal items-center text-white hover:underline">
                <small class="text-[14px]">Documentation</small>
                <svg class="w-2 h-2 ms-2.5 rtl:rotate-[270deg]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                  fill="none" viewBox="0 0 18 18">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M15 11v4.833A1.166 1.166 0 0 1 13.833 17H2.167A1.167 1.167 0 0 1 1 15.833V4.167A1.166 1.166 0 0 1 2.167 3h4.618m4.447-2H17v5.768M9.111 8.889l7.778-7.778" />
                </svg>
              </a>
            </div>
          </swiper-slide>
          <swiper-slide>
            <div class="max-w-full p-6 bg-[#FFAB2D] rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
              <div class="flex gap-3 items-center">
                <div class="size-11 p-2 bg-white mb-3 flex justify-center items-center rounded-md">
                  <Cloudflare />
                </div>
                <h2 class="mb-2 text-lg font-semibold tracking-tight text-white dark:text-white">Cloudflare
                </h2>
              </div>
              <a href="https://developers.cloudflare.com" target="_blank"
                class="inline-flex font-normal items-center text-white hover:underline">
                <small class="text-[14px]">Documentation</small>
                <svg class="w-2 h-2 ms-2.5 rtl:rotate-[270deg]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                  fill="none" viewBox="0 0 18 18">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M15 11v4.833A1.166 1.166 0 0 1 13.833 17H2.167A1.167 1.167 0 0 1 1 15.833V4.167A1.166 1.166 0 0 1 2.167 3h4.618m4.447-2H17v5.768M9.111 8.889l7.778-7.778" />
                </svg>
              </a>
            </div>
          </swiper-slide>
        </swiper>
      </div>

      <!-- Chart -->
      <div class="w-full grid md:grid-cols-2 gap-[40px] mt-12 mb-10 overflow-hidden">
        <div class="bg-[#18254F] rounded-lg shadow-2xl p-3 slide-left">
          <div class="card text-primary-content">
            <h4 class="card-title text-white font-medium text-lg capitalize slide-up">Crypto Statistics</h4>
            <p class="text-[#8896b9] text-xs mt-2 slide-left">Latest data and analysis on cryptocurrencies</p>
            <div class="card-body">
              <apexchart width="100%" type="line" :options="options" :series="series"></apexchart>
            </div>
          </div>
        </div>
        <div class="bg-[#18254F] rounded-lg shadow-2xl p-3 slide-right">
          <div class="card text-primary-content flex flex-col h-full">
            <h4 class="card-title text-white font-medium text-lg capitalize slide-up">Weather in your location</h4>
            <p class="text-[#8896b9] text-xs mt-2 slide-right">Instant weather forecast for your current location</p>
            <div class="card-body flex justify-center items-center flex-grow p-4 min-h-[120px]">
              <div class="loader-spiner"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- About -->
      <div class="bg-[#18254F] mt-10 rounded-lg">
        <div class="max-w-[85rem] px-4 py-6 sm:px-6 lg:px-8 lg:py-10 mx-auto">
          <div class="lg:grid lg:grid-cols-12 lg:gap-16 lg:items-center lg:justify-between overflow-hidden">
            <div class="lg:col-span-6 lg:col-start-1">
              <div class="mb-8">
                <h2 class="mb-2 text-3xl text-white font-bold lg:text-4xl dark:text-neutral-200 slide-up">
                  The passion that drives me forward
                </h2>
                <p class="text-gray-500 text-sm dark:text-neutral-400">
                  I am a programmer from Vietnam, I specialize in programming web applications using Laravel, Vuejs, Tailwindcss, etc. My strong passion for programming drives me to create powerful, high-performance web applications with the most modern technologies and contribute to the development of open source.
                </p>
              </div>

              <blockquote class="relative">
                <svg
                  class="absolute top-0 start-0 transform -translate-x-6 -translate-y-8 size-16 text-gray-200 dark:text-neutral-800"
                  width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true">
                  <path
                    d="M7.39762 10.3C7.39762 11.0733 7.14888 11.7 6.6514 12.18C6.15392 12.6333 5.52552 12.86 4.76621 12.86C3.84979 12.86 3.09047 12.5533 2.48825 11.94C1.91222 11.3266 1.62421 10.4467 1.62421 9.29999C1.62421 8.07332 1.96459 6.87332 2.64535 5.69999C3.35231 4.49999 4.33418 3.55332 5.59098 2.85999L6.4943 4.25999C5.81354 4.73999 5.26369 5.27332 4.84476 5.85999C4.45201 6.44666 4.19017 7.12666 4.05926 7.89999C4.29491 7.79332 4.56983 7.73999 4.88403 7.73999C5.61716 7.73999 6.21938 7.97999 6.69067 8.45999C7.16197 8.93999 7.39762 9.55333 7.39762 10.3ZM14.6242 10.3C14.6242 11.0733 14.3755 11.7 13.878 12.18C13.3805 12.6333 12.7521 12.86 11.9928 12.86C11.0764 12.86 10.3171 12.5533 9.71484 11.94C9.13881 11.3266 8.85079 10.4467 8.85079 9.29999C8.85079 8.07332 9.19117 6.87332 9.87194 5.69999C10.5789 4.49999 11.5608 3.55332 12.8176 2.85999L13.7209 4.25999C13.0401 4.73999 12.4903 5.27332 12.0713 5.85999C11.6786 6.44666 11.4168 7.12666 11.2858 7.89999C11.5215 7.79332 11.7964 7.73999 12.1106 7.73999C12.8437 7.73999 13.446 7.97999 13.9173 8.45999C14.3886 8.93999 14.6242 9.55333 14.6242 10.3Z"
                    fill="currentColor" />
                </svg>

                <div class="relative z-10">
                  <p class="text-xl italic text-white dark:text-white">
                    Amazing people to work with. Very fast and professional partner.
                  </p>
                </div>

                <footer class="mt-6">
                  <div class="flex items-center gap-x-4 slide-left">
                    <div class="shrink-0">
                      <img class="size-[42px] rounded-full object-fill"
                        v-lazy="'https://ik.imagekit.io/odbmay3h6/avatar.jpg?updatedAt=1724846688735'"
                        :alt="props.name">
                    </div>
                    <div class="grow">
                      <div class="font-semibold text-white dark:text-neutral-200">{{ props.name }}</div>
                      <div class="text-xs text-white dark:text-neutral-500">{{ props.description }}</div>
                    </div>
                  </div>
                </footer>
              </blockquote>
            </div>

            <div class="mt-10 lg:mt-0 lg:col-span-6 lg:col-end-13">
              <div class="space-y-6 sm:space-y-8">
                <ul
                  class="grid grid-cols-2 divide-y-2 divide-x-2 divide-gray-500 overflow-hidden dark:divide-neutral-700">
                  <li class="flex flex-col -m-0.5 p-4 sm:p-8">
                    <div
                      class="flex items-end text-3xl sm:text-5xl font-bold text-[#ffab2d] mb-2 dark:text-neutral-200 slide-up">
                      <count-up :end-val="45"></count-up>k+
                    </div>
                    <p class="text-sm sm:text-base text-white dark:text-neutral-400 slide-left">
                      users - from new startups to public companies
                    </p>
                  </li>

                  <li class="flex flex-col -m-0.5 p-4 sm:p-8">
                    <div
                      class="flex items-end text-3xl sm:text-5xl font-bold text-[#ffab2d] mb-2 dark:text-neutral-200 slide-up">
                      <svg class="shrink-0 size-5 text-[#ffab2d] dark:text-blue-500" xmlns="http://www.w3.org/2000/svg"
                        width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                        stroke-linecap="round" stroke-linejoin="round">
                        <path d="m5 12 7-7 7 7" />
                        <path d="M12 19V5" />
                      </svg>
                      <count-up :end-val="23"></count-up>%
                    </div>
                    <p class="text-sm sm:text-base text-white dark:text-neutral-400 slide-right">
                      increase in traffic on webpages with Looms
                    </p>
                  </li>

                  <li class="flex flex-col -m-0.5 p-4 sm:p-8">
                    <div
                      class="flex items-end text-3xl sm:text-5xl font-bold text-[#ffab2d] mb-2 dark:text-neutral-200 slide-up">
                      <svg class="shrink-0 size-5 text-[#ffab2d] dark:text-blue-500" xmlns="http://www.w3.org/2000/svg"
                        width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                        stroke-linecap="round" stroke-linejoin="round">
                        <path d="m5 12 7-7 7 7" />
                        <path d="M12 19V5" />
                      </svg>
                      <count-up :end-val="93"></count-up>%
                    </div>
                    <p class="text-sm sm:text-base text-white dark:text-neutral-400 slide-left">
                      boost in reply rates across sales outreach
                    </p>
                  </li>

                  <li class="flex flex-col -m-0.5 p-4 sm:p-8">
                    <div
                      class="flex items-end text-3xl sm:text-5xl font-bold text-[#ffab2d] mb-2 dark:text-neutral-200 slide-up">
                      <count-up :end-val="2"></count-up>x
                    </div>
                    <p class="text-sm sm:text-base text-white dark:text-neutral-400 slide-right">
                      faster than previous Preline versions
                    </p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Business  -->
      <div class="mt-10">
        <section class="py-6 bg-[#18254F] sm:py-12 lg:py-18 rounded-lg overflow-hidden">
          <div class="px-4 md:px-0 mx-auto sm:px-6 lg:px-8 max-w-7xl">
            <div class="grid items-center grid-cols-1 gap-y-12 lg:grid-cols-2 lg:gap-x-24">
              <div class="slide-left">
                <img class="w-full max-w-md mx-auto"
                  v-lazy="'https://cdn.rareblocks.xyz/collection/celebration/images/integration/2/services-icons.png'"
                  :alt="props.name" />
              </div>
              <div class="text-center lg:text-left">
                <h2 class="text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl slide-up">Grow business with
                  connections.</h2>
                <p class="mt-6 text-gray-500 text-sm slide-right">Amet minim mollit non deserunt ullamco est sit aliqua dolor do
                  amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud
                  amet.</p>

                <a href="#" title=""
                  class="inline-flex items-center justify-center px-8 py-4 font-semibold text-white transition-all duration-200 bg-blue-600 rounded-md mt-9 hover:bg-blue-700 focus:bg-blue-700 slide-down"
                  role="button"> Check all 1486 apps </a>
              </div>
            </div>
          </div>
        </section>
      </div>

      <!-- Princing -->
      <div class="bg-[#18254F] mt-10 rounded-lg">
        <section class="py-6 sm:py-12 lg:py-18 overflow-hidden">
          <div class="max-w-8xl px-4 mx-auto sm:px-6 lg:px-8">
            <div class="grid grid-cols-1 md:grid-cols-[2fr,1fr] md:items-stretch gap-x-12 lg:gap-x-20 gap-y-10">
              <div class="flex flex-col lg:py-5 slide-left">
                <h2 class="text-3xl font-bold leading-tight text-white sm:text-4xl lg:leading-tight lg:text-5xl">Join
                  35k+ web professionals & build your website</h2>

                <div class="mt-10">
                  <div class="flex items-center">
                    <svg class="w-6 h-6 text-orange-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                      fill="currentColor">
                      <path
                        d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <svg class="w-6 h-6 text-orange-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                      fill="currentColor">
                      <path
                        d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <svg class="w-6 h-6 text-orange-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                      fill="currentColor">
                      <path
                        d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <svg class="w-6 h-6 text-orange-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                      fill="currentColor">
                      <path
                        d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <svg class="w-6 h-6 text-orange-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                      fill="currentColor">
                      <path
                        d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </div>

                  <blockquote class="mt-3">
                    <p class="text-sm leading-relaxed text-white">You made it so simple. My new site is so much faster
                      and easier to work with than my old site. I just choose the page, make the change and click save.
                    </p>
                  </blockquote>

                  <div class="flex items-center mt-8">
                    <img class="flex-shrink-0 object-fill size-[42px] rounded-full"
                      v-lazy="'https://ik.imagekit.io/odbmay3h6/avatar.jpg?updatedAt=1724846688735'"
                      :alt="props.name" />
                    <div class="ml-4">
                      <p class="text-base font-semibold text-white">{{ props.name }}</p>
                      <p class="mt-px text-sm text-gray-400">{{ props.description }}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div class="slide-right">
                <div class="overflow-hidden bg-white rounded-md" style="z-index: -1;">
                  <div class="p-10">
                    <h3 class="text-xs font-semibold tracking-widest text-purple-600 uppercase">Single pack</h3>
                    <p class="mt-4 text-6xl font-bold text-black">$79</p>

                    <ul class="flex flex-col mt-8 space-y-4">
                      <li class="inline-flex items-center space-x-2">
                        <svg class="flex-shrink-0 w-5 h-5 text-green-500" xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20" fill="currentColor">
                          <path fill-rule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clip-rule="evenodd" />
                        </svg>
                        <span class="text-base font-medium text-gray-900"> 1 Domain License </span>
                      </li>

                      <li class="inline-flex items-center space-x-2">
                        <svg class="flex-shrink-0 w-5 h-5 text-green-500" xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20" fill="currentColor">
                          <path fill-rule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clip-rule="evenodd" />
                        </svg>
                        <span class="text-base font-medium text-gray-900"> Full Celebration Library </span>
                      </li>

                      <li class="inline-flex items-center space-x-2">
                        <svg class="flex-shrink-0 w-5 h-5 text-green-500" xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20" fill="currentColor">
                          <path fill-rule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clip-rule="evenodd" />
                        </svg>
                        <span class="text-base font-medium text-gray-900"> 120+ Coded Blocks </span>
                      </li>

                      <li class="inline-flex items-center space-x-2">
                        <svg class="flex-shrink-0 w-5 h-5 text-green-500" xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20" fill="currentColor">
                          <path fill-rule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clip-rule="evenodd" />
                        </svg>
                        <span class="text-base font-medium text-gray-900"> Design Files Included </span>
                      </li>

                      <li class="inline-flex items-center space-x-2">
                        <svg class="flex-shrink-0 w-5 h-5 text-green-500" xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20" fill="currentColor">
                          <path fill-rule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clip-rule="evenodd" />
                        </svg>
                        <span class="pb-0.5 text-base font-medium text-gray-900 border-b border-black border-dashed">
                          Premium Support </span>
                      </li>
                    </ul>

                    <button
                      class="inline-flex items-center justify-center w-full px-8 py-4 mt-10 font-semibold text-white transition-all duration-200 rounded-full bg-gradient-to-r from-fuchsia-600 to-blue-600 hover:opacity-80 focus:opacity-80"
                      role="button"> Get full access </button>

                    <div class="flex items-center mt-5">
                      <svg class="flex-shrink-0 w-5 h-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none"
                        viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                      <span class="ml-2 text-sm text-gray-500"> 14 Days Moneyback Guarantee </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

      </div>

      <!-- Footer -->
      <footer class="bg-[#18254F] rounded-lg mt-10">
        <div class="w-full max-w-screen-xl mx-auto px-8 py-4 md:pt-8 md:pb-5">
          <div class="sm:flex sm:items-center sm:justify-between">
            <a href="https://pinkary.com/@TanDuy03" target="_blank"
              class="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse slide-up">
              <img src="https://flowbite.com/docs/images/logo.svg" class="h-8" :alt="props.name" />
              <span class="self-center text-2xl font-semibold whitespace-nowrap text-white">{{ props.userID }}</span>
            </a>
            <ul class="flex flex-wrap items-center mb-6 text-sm font-medium text-white sm:mb-0 slide-up">
              <li>
                <a href="#" class="hover:underline me-4 md:me-6">About</a>
              </li>
              <li>
                <a href="#" class="hover:underline me-4 md:me-6">Privacy Policy</a>
              </li>
              <li>
                <a href="#" class="hover:underline me-4 md:me-6">Licensing</a>
              </li>
              <li>
                <a href="#" class="hover:underline me-4 md:me-6">Contact</a>
              </li>
              <li>
                <router-link to="/login" class="hover:underline">Login</router-link>
              </li>
            </ul>
          </div>
          <hr class="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-5" />
          <small class="block text-white sm:text-center slide-down">© {{ new Date().getFullYear() }} <a
              href="https://pinkary.com/@TanDuy03" class="hover:underline">{{ props.userID }}</a>. All Rights Reserved -
            Your current IP: {{ ipAddress || 'No data' }} - {{ city || 'No data' }}.</small>
        </div>
      </footer>
    </div>
  </div>
</template>

<style scoped>
.baner-top {
  background-image: url('../assets/bg-1.png');
  background-blend-mode: luminosity;
  background-size: cover;
  background-position: top;
}

.header-top {
  -webkit-transition: background-color 1000ms linear;
  -moz-transition: background-color 1000ms linear;
  -o-transition: background-color 1000ms linear;
  -ms-transition: background-color 1000ms linear;
  transition: background-color 1000ms linear;
}

.header-top.active {
  background-color: #3736af;
  box-shadow: 0 6px 12px rgba(55, 54, 175, 0.6);
}

svg {
  height: 1.65rem;
  width: 1.65rem;
}

.border-line::before {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  width: 100%;
  height: 1px;
  background-color: rgba(255, 255, 255, 0.12);
}

.swiper-wrapper {
  -webkit-transition-timing-function: linear;
  -o-transition-timing-function: linear;
  transition-timing-function: linear;
}

.loader-spiner {
  --s: 64px;
  width: var(--s);
  aspect-ratio: 2;
  --_g: #fff 90%, #0000;
  background:
    radial-gradient(farthest-side, var(--_g)) 0 50%/25% 50%,
    radial-gradient(farthest-side at bottom, var(--_g)) 50% calc(50% - var(--s)/16)/25% 25%,
    radial-gradient(farthest-side at top, var(--_g)) 50% calc(50% + var(--s)/16)/25% 25%,
    radial-gradient(farthest-side at bottom, var(--_g)) 100% calc(50% - var(--s)/16)/25% 25%,
    radial-gradient(farthest-side at top, var(--_g)) 100% calc(50% + var(--s)/16)/25% 25%;
  background-repeat: no-repeat;
  animation: l14 1s infinite;
}

@keyframes l14 {
  25% {
    background-position: 0 50%, 50% 0, 50% 100%, 100% 0, 100% 100%
  }

  50% {
    background-position: 100% 50%, 0 0, 0 100%, 50% 0, 50% 100%
  }

  75%,
  100% {
    background-position: 100% 50%, 0 calc(50% - var(--s)/16), 0 calc(50% + var(--s)/16), 50% calc(50% - var(--s)/16), 50% calc(50% + var(--s)/16)
  }
}
</style>