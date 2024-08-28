<script setup lang="ts">
import { ref } from 'vue'
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

</script>

<template>
  <div class="container-fluid">
    <div class="w-full h-44 md:h-52 bg-[#3736af] absolute top-0 left-0 baner-top"></div>
    <div class="fixed top-0 header-top w-full p-5 md:px-12 z-10">
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
              src="https://ik.imagekit.io/odbmay3h6/z5763204095890_794210606c61c277dac928b8ca60d86c-min.jpg?updatedAt=1724504017947"
              :alt="props.name">
          </div>
        </div>
      </div>
    </div>
    <div class="px-5 md:px-12">
      <div class="relative w-full border-line"></div>
    </div>
    <div class="mt-32"></div>
    <div class="w-full p-5 md:px-12 min-h-[500px] bg-[#09153F]">
      <div class="z-[1]">
        <swiper :modules="[Autoplay, Scrollbar]" :slides-per-view="1" :speed="15000" :space-between="20"
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
      <div class="w-full grid md:grid-cols-2 gap-[30px] mt-12 mb-10">
        <div class="bg-[#18254F] rounded-lg shadow-2xl p-3">
          <div class="card text-primary-content">
            <h4 class="card-title text-white font-medium text-lg capitalize">Crypto Statistics</h4>
            <p class="text-[#8896b9] text-xs mt-2">Lorem ipsum dolor sit amet consectetur.</p>
            <div class="card-body">
              <apexchart width="100%" type="line" :options="options" :series="series"></apexchart>
            </div>
          </div>
        </div>
        <div class="bg-[#18254F] rounded-lg shadow-2xl p-3">
          <div class="card text-primary-content flex flex-col h-full">
            <h4 class="card-title text-white font-medium text-lg capitalize">Maps</h4>
            <p class="text-[#8896b9] text-xs mt-2">Lorem ipsum dolor sit amet consectetur.</p>
            <div class="card-body flex justify-center items-center flex-grow p-4">
              <div class="loader-spiner"></div>
            </div>
          </div>
        </div>
      </div>
      <div class="bg-[#18254F] mt-10 rounded-lg">
        <div class="max-w-[85rem] px-4 py-6 sm:px-6 lg:px-8 lg:py-10 mx-auto">
          <div class="lg:grid lg:grid-cols-12 lg:gap-16 lg:items-center lg:justify-between">
            <div class="lg:col-span-5 lg:col-start-1">
              <div class="mb-8">
                <h2 class="mb-2 text-3xl text-white font-bold lg:text-4xl dark:text-neutral-200">
                  It's all about speed
                </h2>
                <p class="text-gray-500 dark:text-neutral-400">
                  We provide you with a test account that can be set up in seconds. Our main focus is getting responses
                  to you as soon as we can.
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
                  <div class="flex items-center gap-x-4">
                    <div class="shrink-0">
                      <img class="size-8 rounded-full object-cover"
                        src="https://ik.imagekit.io/odbmay3h6/z5763204095890_794210606c61c277dac928b8ca60d86c-min.jpg?updatedAt=1724504017947"
                        :alt="props.name">
                    </div>
                    <div class="grow">
                      <div class="font-semibold text-white dark:text-neutral-200">{{ props.name }}</div>
                      <div class="text-xs text-white dark:text-neutral-500">Software Developer</div>
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
                      class="flex items-end gap-x-2 text-3xl sm:text-5xl font-bold text-[#ffab2d] mb-2 dark:text-neutral-200">
                      45k+
                    </div>
                    <p class="text-sm sm:text-base text-white dark:text-neutral-400">
                      users - from new startups to public companies
                    </p>
                  </li>

                  <li class="flex flex-col -m-0.5 p-4 sm:p-8">
                    <div
                      class="flex items-end gap-x-2 text-3xl sm:text-5xl font-bold text-[#ffab2d] mb-2 dark:text-neutral-200">
                      <svg class="shrink-0 size-5 text-[#ffab2d] dark:text-blue-500" xmlns="http://www.w3.org/2000/svg"
                        width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                        stroke-linecap="round" stroke-linejoin="round">
                        <path d="m5 12 7-7 7 7" />
                        <path d="M12 19V5" />
                      </svg>
                      23%
                    </div>
                    <p class="text-sm sm:text-base text-white dark:text-neutral-400">
                      increase in traffic on webpages with Looms
                    </p>
                  </li>

                  <li class="flex flex-col -m-0.5 p-4 sm:p-8">
                    <div
                      class="flex items-end gap-x-2 text-3xl sm:text-5xl font-bold text-[#ffab2d] mb-2 dark:text-neutral-200">
                      <svg class="shrink-0 size-5 text-[#ffab2d] dark:text-blue-500" xmlns="http://www.w3.org/2000/svg"
                        width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                        stroke-linecap="round" stroke-linejoin="round">
                        <path d="m5 12 7-7 7 7" />
                        <path d="M12 19V5" />
                      </svg>
                      9.3%
                    </div>
                    <p class="text-sm sm:text-base text-white dark:text-neutral-400">
                      boost in reply rates across sales outreach
                    </p>
                  </li>

                  <li class="flex flex-col -m-0.5 p-4 sm:p-8">
                    <div
                      class="flex items-end gap-x-2 text-3xl sm:text-5xl font-bold text-[#ffab2d] mb-2 dark:text-neutral-200">
                      2x
                    </div>
                    <p class="text-sm sm:text-base text-white dark:text-neutral-400">
                      faster than previous Preline versions
                    </p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="mt-10">
        <section class="py-6 bg-[#18254F] sm:py-12 lg:py-18 rounded-lg">
          <div class="px-4 md:px-0 mx-auto sm:px-6 lg:px-8 max-w-7xl">
            <div class="grid items-center grid-cols-1 gap-y-12 lg:grid-cols-2 lg:gap-x-24">
              <div>
                <img class="w-full max-w-md mx-auto"
                  src="https://cdn.rareblocks.xyz/collection/celebration/images/integration/2/services-icons.png"
                  alt="Technology" />
              </div>
              <div class="text-center lg:text-left">
                <h2 class="text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">Grow business with
                  connections.</h2>
                <p class="mt-6 text-base text-white">Amet minim mollit non deserunt ullamco est sit aliqua dolor do
                  amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud
                  amet.</p>

                <a href="#" title=""
                  class="inline-flex items-center justify-center px-8 py-4 font-semibold text-white transition-all duration-200 bg-blue-600 rounded-md mt-9 hover:bg-blue-700 focus:bg-blue-700"
                  role="button"> Check all 1486 apps </a>
              </div>
            </div>
          </div>
        </section>
      </div>
      <div class="bg-[#18254F] mt-10 rounded-lg">

      </div>

      <footer class="bg-[#18254F] rounded-lg">
        <div class="w-full max-w-screen-xl mx-auto p-4 md:pt-8 md:pb-5">
          <div class="sm:flex sm:items-center sm:justify-between">
            <a href="https://pinkary.com/@TanDuy03" target="_blank"
              class="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse">
              <img src="https://flowbite.com/docs/images/logo.svg" class="h-8" :alt="props.name" />
              <span class="self-center text-2xl font-semibold whitespace-nowrap text-white">{{ props.userID }}</span>
            </a>
            <ul class="flex flex-wrap items-center mb-6 text-sm font-medium text-white sm:mb-0">
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
          <small class="block text-white sm:text-center">© {{ new Date().getFullYear() }} <a
              href="https://pinkary.com/@TanDuy03" class="hover:underline">{{ props.userID }}</a>. All Rights Reserved -
            Your current IP: {{ ipAddress || 'No data' }} - {{ city || 'No data' }}.</small>
        </div>
      </footer>

      <!-- <div
      class="rounded-[8px] bg-white shadow-3xl shadow-gray-500 rounded-primary relative mx-auto w-full max-w-[678px] bg-cover bg-clip-border dark:text-white dark:shadow-none"
    >
      <div class="p-[21px]">
        <div
          class="relative flex h-20 md:h-36 w-full justify-center rounded-[8px] bg-gradient-to-r from-rose-400 to-orange-300"
        >
          <div
            class="absolute -bottom-4 md:-bottom-12 md:left-12 flex justify-center rounded-full border-[4px] border-white"
          >
            <img
              class="size-[100px] md:size-[130px] rounded-full object-fill"
              src="https://ik.imagekit.io/odbmay3h6/avatar.webp?updatedAt=1724402771259"
              alt="Nguyen Tan Duy" loading="lazy"
            />
          </div>
        </div>
        <div class="w-full flex justify-end p-3 mt-6 md:mt-0">
          <div class="w-full flex-col md:w-[70%]">
            <h4
              class="flex justify-center md:justify-normal items-center gap-2 text-navy-700 text-2xl text-center md:text-left font-bold dark:text-white"
            >
              {{ props.name }}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                style="color: #0866ff"
                title="System verified"
                viewBox="0 0 24 24"
                fill="currentColor"
                class="icon icon-tabler icons-tabler-filled icon-tabler-rosette-discount-check hover:cursor-pointer"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path
                  d="M12.01 2.011a3.2 3.2 0 0 1 2.113 .797l.154 .145l.698 .698a1.2 1.2 0 0 0 .71 .341l.135 .008h1a3.2 3.2 0 0 1 3.195 3.018l.005 .182v1c0 .27 .092 .533 .258 .743l.09 .1l.697 .698a3.2 3.2 0 0 1 .147 4.382l-.145 .154l-.698 .698a1.2 1.2 0 0 0 -.341 .71l-.008 .135v1a3.2 3.2 0 0 1 -3.018 3.195l-.182 .005h-1a1.2 1.2 0 0 0 -.743 .258l-.1 .09l-.698 .697a3.2 3.2 0 0 1 -4.382 .147l-.154 -.145l-.698 -.698a1.2 1.2 0 0 0 -.71 -.341l-.135 -.008h-1a3.2 3.2 0 0 1 -3.195 -3.018l-.005 -.182v-1a1.2 1.2 0 0 0 -.258 -.743l-.09 -.1l-.697 -.698a3.2 3.2 0 0 1 -.147 -4.382l.145 -.154l.698 -.698a1.2 1.2 0 0 0 .341 -.71l.008 -.135v-1l.005 -.182a3.2 3.2 0 0 1 3.013 -3.013l.182 -.005h1a1.2 1.2 0 0 0 .743 -.258l.1 -.09l.698 -.697a3.2 3.2 0 0 1 2.269 -.944zm3.697 7.282a1 1 0 0 0 -1.414 0l-3.293 3.292l-1.293 -1.292l-.094 -.083a1 1 0 0 0 -1.32 1.497l2 2l.094 .083a1 1 0 0 0 1.32 -.083l4 -4l.083 -.094a1 1 0 0 0 -.083 -1.32z"
                />
                <title>System verified</title>
              </svg>
            </h4>
            <h5
              className="text-base font-normal text-[15px] text-center md:text-left text-gray-600"
            >
              <vue-writer :array="[props.description]" :eraseSpeed="35" :typeSpeed="20"></vue-writer>
            </h5>
          </div>
        </div>
        <div class="w-full flex justify-center pt-2 pb-3">
          <div class="w-2/3 grid grid-cols-3 gap-4">
            <div class="px-4 flex flex-col justify-center items-center">
              <count-up class="text-2xl font-bold" :end-val="26"></count-up>
              <small class="font-normal text-neutral-600">Online</small>
            </div>
            <div class="px-4 flex flex-col justify-center items-center">
              <count-up class="text-2xl font-bold" :end-val="12"></count-up>
              <small class="font-normal text-neutral-600">View</small>
            </div>
            <div class="px-4 flex flex-col justify-center items-center">
              <count-up class="text-2xl font-bold" :end-val="60"></count-up>
              <small class="font-normal text-neutral-600">Block</small>
            </div>
          </div>
        </div>
        <div class="w-full mt-1">
          <p
            class="text-[13px] line-clamp-3 md:line-clamp-none font-normal text-slate-600 -tracking-2 text-left md:text-justify"
          >
            Welcome to the website. I am a programmer from Vietnam, I specialize
            in programming web applications using Laravel, Vuejs, Tailwindcss, etc. My 
            strong passion for programming drives me to
            create powerful, high-performance web applications with the most
            modern technologies and contribute to the development of open
            source.
          </p>
        </div>
      </div>
      <div class="w-full h-[1px] bg-gray-300"></div>
      <div class="px-[21px] py-3">
        <small class="block text-center text-[13px]">Your current IP: {{ ipAddress || 'No data' }} - {{ city || 'No data' }}</small>
      </div>
    </div> -->
    </div>
  </div>
    <!-- <div class="fixed bottom-0 right-0 py-3 w-full bg-[#6366F1] sm:bg-inherit sm:w-auto sm:bottom-10 
    sm:right-10 flex sm:flex-col sm:gap-3 rounded-t-[15px] justify-evenly items-center
    sm:rounded-none sm:py-0
    ">
    <div class="sm:size-[45px] sm:bg-[#6366F1] rounded-full hover:translateY shadow-lg shadow-[#6366F1]">
      <a href="https://www.facebook.com/ntanduy03" target="_blank" aria-label="Facebook" class="w-full h-full flex items-center justify-center text-white">
        <Meta class="size-6"/>
      </a>
    </div>
    <div class="sm:size-[45px] sm:bg-[#6366F1] rounded-full hover:translateY shadow-lg shadow-[#6366F1]">
      <a href="https://x.com/ng_tanduy" target="_blank" aria-label="X" class="w-full h-full flex items-center justify-center text-white">
        <Twitter class="size-6"/>
      </a>
    </div>
    <div class="sm:size-[45px] sm:bg-[#6366F1] rounded-full hover:translateY shadow-lg shadow-[#6366F1]">
      <a href="https://www.instagram.com/ng.tanduy26" target="_blank" aria-label="Instagram" class="w-full h-full flex items-center justify-center text-white">
        <Instagram class="size-6"/>
      </a>
    </div>
    <div class="sm:size-[45px] sm:bg-[#6366F1] rounded-full hover:translateY shadow-lg shadow-[#6366F1]">
      <a href="https://www.github.com/TanDuy03" target="_blank" aria-label="Github" class="w-full h-full flex items-center justify-center text-white">
        <Github class="size-6"/>
      </a>
    </div>
    <div class="sm:size-[45px] sm:bg-[#6366F1] rounded-full hover:translateY shadow-lg shadow-[#6366F1]">
      <router-link to="/login" class="w-full h-full flex items-center justify-center text-white" aria-label="Login">
        <Account class="size-6"/>
      </router-link>
    </div>
  </div> -->
</template>

<style scoped>
.baner-top {
  background-image: url('../assets/bg-1.png');
  background-blend-mode: luminosity;
  background-size: cover;
  background-position: top;
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
  top: -45px;
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