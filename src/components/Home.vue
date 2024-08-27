<script setup lang="ts">
import { defineProps, ref } from 'vue'
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
const props = defineProps<{ name: string, description: string }>()
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
    <div class="relative w-full top-0">
      <div class="fixed top-0 header-top w-full flex justify-between items-center p-5 md:px-12 z-10 bg-[#3736af]">
        <div class="flex justify-center items-center gap-2 md:gap-3">
          <button aria-label="Menu" class="p-2 md:bg-[#ffffff1f] rounded-lg text-white">
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
              <h3 class="text-white font-bold">Nguyen Tan Duy</h3>
              <small class="text-white">@TanDuy03</small>
            </div>
            <img class="size-[42px] rounded-full"
              src="https://ik.imagekit.io/odbmay3h6/z5763204095890_794210606c61c277dac928b8ca60d86c-min.jpg?updatedAt=1724504017947"
              alt="Nguyen Tan Duy">
          </div>
        </div>
      </div>
      <div class="mt-32"></div>
    </div>
    <div class="w-full p-5 md:px-12 min-h-[500px] bg-[#09153F]">
      <div class="z-[1]">
        <swiper :modules="[Autoplay, Scrollbar]" :slides-per-view="1" :speed="10000" :space-between="20"
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
            <div class="max-w-sm p-6 bg-[#F4392E] rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
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
            <div class="max-w-sm p-6 bg-[#3AB67A] rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
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
            <div class="max-w-sm p-6 bg-[#3693FF] rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
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
            <div class="max-w-sm p-6 bg-[#5B5E81] rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
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
            <div class="max-w-sm p-6 bg-[#FFAB2D] rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
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
          <div class="card text-primary-content">
            <h4 class="card-title text-white font-medium text-lg capitalize">Maps</h4>
            <p class="text-[#8896b9] text-xs mt-2">Lorem ipsum dolor sit amet consectetur.</p>
            <div class="card-body">

            </div>
          </div>
        </div>
      </div>
    </div>

    <footer class="bg-[#18254F]">
      <div class="w-full max-w-screen-xl mx-auto p-4 md:pt-8 md:pb-5">
        <div class="sm:flex sm:items-center sm:justify-between">
          <a href="https://www.github.com/TanDuy03" target="_blank" class="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse">
            <img src="https://flowbite.com/docs/images/logo.svg" class="h-8" alt="Flowbite Logo" />
            <span class="self-center text-2xl font-semibold whitespace-nowrap text-white">TanDuy03</span>
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
        <small class="block text-white sm:text-center">© 2024 <a
          href="https://github.com/TanDuy03" class="hover:underline">TanDuy03</a>. All Rights Reserved - Your current IP: {{ ipAddress || 'No data' }} - {{ city || 'No data' }}</small>
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

.baner-top .header-top::before {
  position: absolute;
  content: '';
  bottom: 0;
  left: 0;
  width: 100%;
  background: rgba(255, 255, 255, 0.12);
  height: 1px;
}

.swiper-wrapper {
  -webkit-transition-timing-function: linear;
  -o-transition-timing-function: linear;
  transition-timing-function: linear;
}
</style>