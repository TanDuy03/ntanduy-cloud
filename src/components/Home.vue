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
import Discord from './icons/Discord.vue'
import Footer from './layout/Footer.vue'
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

// Option1
const options1 = {
  chart: {
    height: 350,
    type: 'line',
    toolbar: {
      show: false,
    }
  },
  grid: {
    show: false
  },
  title: {
    text: '',
    align: 'left'
  },
  stroke: {
    width: [3, 1]
  },
  tooltip: {
    shared: true,
    custom: [function ({ seriesIndex, dataPointIndex, w }: { seriesIndex: number; dataPointIndex: number; w: any }) {
      return w.globals.series[seriesIndex][dataPointIndex]
    }, function ({ seriesIndex, dataPointIndex, w }: { seriesIndex: number; dataPointIndex: number; w: any }) {
      var o = w.globals.seriesCandleO[seriesIndex][dataPointIndex]
      var h = w.globals.seriesCandleH[seriesIndex][dataPointIndex]
      var l = w.globals.seriesCandleL[seriesIndex][dataPointIndex]
      var c = w.globals.seriesCandleC[seriesIndex][dataPointIndex]
      return (
        '<div class="apexcharts-tooltip-candlestick" style="padding: 10px 20px; background-color: #09153F; color: #fff; border-radius: 5px;">' +
        '<div>Open: <span class="value" style="color: #00E396;">' + o + '</span></div>' +
        '<div>High: <span class="value" style="color: #FEB019;">' + h + '</span></div>' +
        '<div>Low: <span class="value" style="color: #FF4560;">' + l + '</span></div>' +
        '<div>Close: <span class="value" style="color: #775DD0;">' + c + '</span></div>' +
        '</div>'
      );
    }]
  },
  xaxis: {
    type: 'datetime',
    labels: {
      style: {
        colors: '#8896b9',
        fontSize: '12px',
      },
    },
    axisBorder: {
      show: true,
      color: '#8896b9',
    },
    axisTicks: {
      show: true,
      color: '#8896b9',
    },
  },
  yaxis: {
    labels: {
      style: {
        colors: '#8896b9',
        fontSize: '12px',
      },
    },
    tooltip: {
      enabled: true
    }
  },
  plotOptions: {
    candlestick: {
      colors: {
        upward: '#3ab67a',
        downward: '#fd5353'
      }
    }
  },
  legend: {
    show: false,
  },
}
const series1 = [{
  name: '',
  type: 'line',
  data: [
    {
      x: new Date(1538778600000),
      y: 6604
    }, {
      x: new Date(1538782200000),
      y: 6602
    }, {
      x: new Date(1538814600000),
      y: 6607
    }, {
      x: new Date(1538884800000),
      y: 6620
    }
  ]
}, {
  name: '',
  type: 'candlestick',
  data: [
    {
      x: new Date(1538778600000),
      y: [6629.81, 6650.5, 6623.04, 6633.33]
    },
    {
      x: new Date(1538780400000),
      y: [6632.01, 6643.59, 6620, 6630.11]
    },
    {
      x: new Date(1538782200000),
      y: [6630.71, 6648.95, 6623.34, 6635.65]
    },
    {
      x: new Date(1538784000000),
      y: [6635.65, 6651, 6629.67, 6638.24]
    },
    {
      x: new Date(1538785800000),
      y: [6638.24, 6640, 6620, 6624.47]
    },
    {
      x: new Date(1538787600000),
      y: [6624.53, 6636.03, 6621.68, 6624.31]
    },
    {
      x: new Date(1538789400000),
      y: [6624.61, 6632.2, 6617, 6626.02]
    },
    {
      x: new Date(1538791200000),
      y: [6627, 6627.62, 6584.22, 6603.02]
    },
    {
      x: new Date(1538793000000),
      y: [6605, 6608.03, 6598.95, 6604.01]
    },
    {
      x: new Date(1538794800000),
      y: [6604.5, 6614.4, 6602.26, 6608.02]
    },
    {
      x: new Date(1538796600000),
      y: [6608.02, 6610.68, 6601.99, 6608.91]
    },
    {
      x: new Date(1538798400000),
      y: [6608.91, 6618.99, 6608.01, 6612]
    },
    {
      x: new Date(1538800200000),
      y: [6612, 6615.13, 6605.09, 6612]
    },
    {
      x: new Date(1538802000000),
      y: [6612, 6624.12, 6608.43, 6622.95]
    },
    {
      x: new Date(1538803800000),
      y: [6623.91, 6623.91, 6615, 6615.67]
    },
    {
      x: new Date(1538805600000),
      y: [6618.69, 6618.74, 6610, 6610.4]
    },
    {
      x: new Date(1538807400000),
      y: [6611, 6622.78, 6610.4, 6614.9]
    },
    {
      x: new Date(1538809200000),
      y: [6614.9, 6626.2, 6613.33, 6623.45]
    },
    {
      x: new Date(1538811000000),
      y: [6623.48, 6627, 6618.38, 6620.35]
    },
    {
      x: new Date(1538812800000),
      y: [6619.43, 6620.35, 6610.05, 6615.53]
    },
    {
      x: new Date(1538814600000),
      y: [6615.53, 6617.93, 6610, 6615.19]
    },
    {
      x: new Date(1538816400000),
      y: [6615.19, 6621.6, 6608.2, 6620]
    },
    {
      x: new Date(1538818200000),
      y: [6619.54, 6625.17, 6614.15, 6620]
    },
    {
      x: new Date(1538820000000),
      y: [6620.33, 6634.15, 6617.24, 6624.61]
    },
    {
      x: new Date(1538821800000),
      y: [6625.95, 6626, 6611.66, 6617.58]
    },
    {
      x: new Date(1538823600000),
      y: [6619, 6625.97, 6595.27, 6598.86]
    },
    {
      x: new Date(1538825400000),
      y: [6598.86, 6598.88, 6570, 6587.16]
    },
    {
      x: new Date(1538827200000),
      y: [6588.86, 6600, 6580, 6593.4]
    },
    {
      x: new Date(1538829000000),
      y: [6593.99, 6598.89, 6585, 6587.81]
    },
    {
      x: new Date(1538830800000),
      y: [6587.81, 6592.73, 6567.14, 6578]
    },
    {
      x: new Date(1538832600000),
      y: [6578.35, 6581.72, 6567.39, 6579]
    },
    {
      x: new Date(1538834400000),
      y: [6579.38, 6580.92, 6566.77, 6575.96]
    },
    {
      x: new Date(1538836200000),
      y: [6575.96, 6589, 6571.77, 6588.92]
    },
    {
      x: new Date(1538838000000),
      y: [6588.92, 6594, 6577.55, 6589.22]
    },
    {
      x: new Date(1538839800000),
      y: [6589.3, 6598.89, 6589.1, 6596.08]
    },
    {
      x: new Date(1538841600000),
      y: [6597.5, 6600, 6588.39, 6596.25]
    },
    {
      x: new Date(1538843400000),
      y: [6598.03, 6600, 6588.73, 6595.97]
    },
    {
      x: new Date(1538845200000),
      y: [6595.97, 6602.01, 6588.17, 6602]
    },
    {
      x: new Date(1538847000000),
      y: [6602, 6607, 6596.51, 6599.95]
    },
    {
      x: new Date(1538848800000),
      y: [6600.63, 6601.21, 6590.39, 6591.02]
    },
    {
      x: new Date(1538850600000),
      y: [6591.02, 6603.08, 6591, 6591]
    },
    {
      x: new Date(1538852400000),
      y: [6591, 6601.32, 6585, 6592]
    },
    {
      x: new Date(1538854200000),
      y: [6593.13, 6596.01, 6590, 6593.34]
    },
    {
      x: new Date(1538856000000),
      y: [6593.34, 6604.76, 6582.63, 6593.86]
    },
    {
      x: new Date(1538857800000),
      y: [6593.86, 6604.28, 6586.57, 6600.01]
    },
    {
      x: new Date(1538859600000),
      y: [6601.81, 6603.21, 6592.78, 6596.25]
    },
    {
      x: new Date(1538861400000),
      y: [6596.25, 6604.2, 6590, 6602.99]
    },
    {
      x: new Date(1538863200000),
      y: [6602.99, 6606, 6584.99, 6587.81]
    },
    {
      x: new Date(1538865000000),
      y: [6587.81, 6595, 6583.27, 6591.96]
    },
    {
      x: new Date(1538866800000),
      y: [6591.97, 6596.07, 6585, 6588.39]
    },
    {
      x: new Date(1538868600000),
      y: [6587.6, 6598.21, 6587.6, 6594.27]
    },
    {
      x: new Date(1538870400000),
      y: [6596.44, 6601, 6590, 6596.55]
    },
    {
      x: new Date(1538872200000),
      y: [6598.91, 6605, 6596.61, 6600.02]
    },
    {
      x: new Date(1538874000000),
      y: [6600.55, 6605, 6589.14, 6593.01]
    },
    {
      x: new Date(1538875800000),
      y: [6593.15, 6605, 6592, 6603.06]
    },
    {
      x: new Date(1538877600000),
      y: [6603.07, 6604.5, 6599.09, 6603.89]
    },
    {
      x: new Date(1538879400000),
      y: [6604.44, 6604.44, 6600, 6603.5]
    },
    {
      x: new Date(1538881200000),
      y: [6603.5, 6603.99, 6597.5, 6603.86]
    },
    {
      x: new Date(1538883000000),
      y: [6603.85, 6605, 6600, 6604.07]
    },
    {
      x: new Date(1538884800000),
      y: [6604.98, 6606, 6604.07, 6606]
    },
  ]
}]

// Option2
const options2 = {
  chart: {
    height: 350,
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
const series2 = [{
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
    duration: 500,
    distance: '30px',
    origin: 'top',
    opacity: null,
    easing: 'ease-out',
    reset: true
  };
  var slideDown = {
    duration: 500,
    distance: '30px',
    origin: 'bottom',
    opacity: null,
    easing: 'ease-out',
    reset: true
  };
  var slideLeft = {
    duration: 500,
    distance: '30px',
    origin: 'left',
    opacity: null,
    easing: 'ease-out',
    reset: true
  };
  var slideRight = {
    duration: 500,
    distance: '30px',
    origin: 'right',
    opacity: null,
    easing: 'ease-out',
    reset: true
  };

  //Delay
  ['.slide-up', '.slide-up1', '.slide-up2', '.slide-up3'].forEach((selector, index) => {
    sr.reveal(selector, {
      ...slideUp,
      delay: 375 + index * 100
    })
  }),

    ['.slide-down', '.slide-down1', '.slide-down2', '.slide-down3'].forEach((selector, index) => {
      sr.reveal(selector, {
        ...slideDown,
        delay: 375 + index * 100
      })
    }),

    ['.slide-left', '.slide-left1', '.slide-left2', '.slide-left3'].forEach((selector, index) => {
      sr.reveal(selector, {
        ...slideLeft,
        delay: 375 + index * 100
      })
    }),

    ['.slide-right', '.slide-right1', '.slide-right2', '.slide-right3'].forEach((selector, index) => {
      sr.reveal(selector, {
        ...slideRight,
        delay: 375 + index * 100
      })
    })
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
              class="icon icon-tabler icons-tabler-outline icon-tabler-menu-2 icon-social">
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M4 6l16 0" />
              <path d="M4 12l16 0" />
              <path d="M4 18l16 0" />
            </svg>
          </button>
          <a href="https://discordapp.com/users/1261979713388150845" target="_blank" aria-label="Dark Mode"
            class="p-2 md:bg-[#ffffff1f] rounded-lg text-white">
            <Discord />
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
              v-lazy="'https://ik.imagekit.io/odbmay3h6/avatar.jpg?updatedAt=1724846688735'" :alt="props.name">
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
        <swiper :modules="[Autoplay, Scrollbar, Pagination, Navigation]" :slides-per-view="1" :speed="15000"
          :space-between="20" :scrollbar="{ draggable: true }" :autoplay="{
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
                <svg class="w-2 h-2 ms-2.5 rtl:rotate-[270deg] icon-social" aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
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
                <svg class="w-2 h-2 ms-2.5 rtl:rotate-[270deg] icon-social" aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
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
                <svg class="w-2 h-2 ms-2.5 rtl:rotate-[270deg] icon-social" aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
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
                <svg class="w-2 h-2 ms-2.5 rtl:rotate-[270deg] icon-social" aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
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
                <svg class="w-2 h-2 ms-2.5 rtl:rotate-[270deg] icon-social" aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M15 11v4.833A1.166 1.166 0 0 1 13.833 17H2.167A1.167 1.167 0 0 1 1 15.833V4.167A1.166 1.166 0 0 1 2.167 3h4.618m4.447-2H17v5.768M9.111 8.889l7.778-7.778" />
                </svg>
              </a>
            </div>
          </swiper-slide>
        </swiper>
      </div>

      <!-- Chart1 -->
      <div class="w-full grid md:grid-cols-2 gap-[40px] mt-12 mb-10 overflow-hidden">
        <div class="bg-[#18254F] rounded-lg shadow-2xl p-3 slide-left">
          <div class="card text-primary-content">
            <h4 class="card-title text-white font-medium text-lg capitalize slide-up">Market Overview</h4>
            <p class="text-[#8896b9] text-xs mt-2 slide-left">Summary of current market trends and price movements</p>
            <div class="card-body">
              <apexchart width="100%" type="line" :options="options1" :series="series1"></apexchart>
            </div>
          </div>
        </div>
        <div class="bg-[#18254F] rounded-lg shadow-2xl p-3 slide-right">
          <div class="card text-primary-content flex flex-col h-full">
            <h4 class="card-title text-white font-medium text-lg capitalize slide-up">Weather in your location</h4>
            <p class="text-[#8896b9] text-xs mt-2 slide-right">Instant weather forecast for your current location</p>
            <div class="card-body flex justify-center items-center flex-grow p-4 min-h-[120px]">
              <div class="loader-spiner1"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Chart2 -->
      <div class="w-full grid md:grid-cols-2 gap-[40px] mt-12 mb-10 overflow-hidden">
        <div class="bg-[#18254F] rounded-lg shadow-2xl p-3 slide-left">
          <div class="card text-primary-content">
            <h4 class="card-title text-white font-medium text-lg capitalize slide-up">Crypto Statistics</h4>
            <p class="text-[#8896b9] text-xs mt-2 slide-left">Latest data and analysis on cryptocurrencies</p>
            <div class="card-body">
              <apexchart width="100%" height="250" type="line" :options="options2" :series="series2"></apexchart>
            </div>
          </div>
        </div>
        <div class="bg-[#18254F] rounded-lg shadow-2xl p-3 slide-right">
          <div class="card text-primary-content flex flex-col h-full">
            <h4 class="card-title text-white font-medium text-lg capitalize slide-up">User data analysis</h4>
            <p class="text-[#8896b9] text-xs mt-2 slide-right">Assessing user behavior to optimize experience</p>
            <div class="card-body flex justify-center items-center flex-grow p-4 min-h-[120px]">
              <div class="loader-spiner2"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- About -->
      <div class="bg-[#18254F] mt-10 rounded-lg">
        <div class="max-w-[85rem] px-4 py-6 sm:px-6 lg:px-8 lg:py-10 mx-auto">
          <div class="lg:grid lg:grid-cols-12 lg:gap-16 lg:items-center lg:justify-between overflow-hidden">
            <div class="lg:col-span-6 lg:col-start-1">
              <div class="mb-10">
                <h2 class="mb-2 text-3xl sm:text-4xl lg:text-5xl text-white font-bold dark:text-neutral-200 slide-up">
                  The passion that drives me forward
                </h2>
                <p class="text-gray-500 text-sm dark:text-neutral-400 slide-left">
                  I am a programmer from Vietnam, I specialize in programming web applications using Laravel, Vuejs,
                  Tailwindcss, etc. My strong passion for programming drives me to create powerful, high-performance web
                  applications with the most modern technologies and contribute to the development of open source.
                </p>
              </div>

              <blockquote class="relative">
                <svg
                  class="absolute slide-left1 top-[-5px] icon-social left-[20px] transform -translate-x-5 -translate-y-6 size-16 text-gray-200 dark:text-neutral-800"
                  width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true">
                  <path
                    d="M7.39762 10.3C7.39762 11.0733 7.14888 11.7 6.6514 12.18C6.15392 12.6333 5.52552 12.86 4.76621 12.86C3.84979 12.86 3.09047 12.5533 2.48825 11.94C1.91222 11.3266 1.62421 10.4467 1.62421 9.29999C1.62421 8.07332 1.96459 6.87332 2.64535 5.69999C3.35231 4.49999 4.33418 3.55332 5.59098 2.85999L6.4943 4.25999C5.81354 4.73999 5.26369 5.27332 4.84476 5.85999C4.45201 6.44666 4.19017 7.12666 4.05926 7.89999C4.29491 7.79332 4.56983 7.73999 4.88403 7.73999C5.61716 7.73999 6.21938 7.97999 6.69067 8.45999C7.16197 8.93999 7.39762 9.55333 7.39762 10.3ZM14.6242 10.3C14.6242 11.0733 14.3755 11.7 13.878 12.18C13.3805 12.6333 12.7521 12.86 11.9928 12.86C11.0764 12.86 10.3171 12.5533 9.71484 11.94C9.13881 11.3266 8.85079 10.4467 8.85079 9.29999C8.85079 8.07332 9.19117 6.87332 9.87194 5.69999C10.5789 4.49999 11.5608 3.55332 12.8176 2.85999L13.7209 4.25999C13.0401 4.73999 12.4903 5.27332 12.0713 5.85999C11.6786 6.44666 11.4168 7.12666 11.2858 7.89999C11.5215 7.79332 11.7964 7.73999 12.1106 7.73999C12.8437 7.73999 13.446 7.97999 13.9173 8.45999C14.3886 8.93999 14.6242 9.55333 14.6242 10.3Z"
                    fill="currentColor" />
                </svg>

                <div class="relative z-10 slide-left2">
                  <p class="text-xl italic text-white dark:text-white">
                    Amazing people to work with. Very fast and professional partner.
                  </p>
                </div>

                <footer class="mt-6">
                  <div class="flex items-center gap-x-4 slide-left">
                    <div class="shrink-0 slide-left3">
                      <img class="size-[42px] rounded-full object-fill"
                        v-lazy="'https://ik.imagekit.io/odbmay3h6/avatar.jpg?updatedAt=1724846688735'"
                        :alt="props.name">
                    </div>
                    <div class="grow">
                      <div class="font-semibold text-white dark:text-neutral-200 slide-up">{{ props.name }}</div>
                      <div class="text-xs text-white dark:text-neutral-500 slide-down">{{ props.description }}</div>
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
                      <svg class="shrink-0 size-5 icon-social text-[#ffab2d] dark:text-blue-500"
                        xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
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
                      <svg class="shrink-0 size-5 icon-social text-[#ffab2d] dark:text-blue-500"
                        xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
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
                <h2 class="text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl slide-up">Grow business
                  with
                  connections.</h2>
                <p class="mt-6 text-gray-500 text-sm slide-right">Amet minim mollit non deserunt ullamco est sit aliqua
                  dolor do
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
            <div class="grid grid-cols-1 md:items-stretch md:grid-cols-2 gap-x-12 lg:gap-x-20 gap-y-10">
              <div class="flex flex-col lg:py-5">
                <h2
                  class="text-3xl font-bold leading-tight text-white sm:text-4xl lg:leading-tight lg:text-5xl slide-left">
                  Join
                  35k+ web professionals & build your website</h2>
                <div class="mt-10">
                  <div class="flex items-center slide-down1">
                    <svg class="w-6 h-6 text-orange-500 icon-social" xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20" fill="currentColor">
                      <path
                        d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <svg class="w-6 h-6 text-orange-500 icon-social" xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20" fill="currentColor">
                      <path
                        d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <svg class="w-6 h-6 text-orange-500 icon-social" xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20" fill="currentColor">
                      <path
                        d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <svg class="w-6 h-6 text-orange-500 icon-social" xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20" fill="currentColor">
                      <path
                        d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <svg class="w-6 h-6 text-orange-500 icon-social" xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20" fill="currentColor">
                      <path
                        d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </div>

                  <blockquote class="mt-3 slide-down2">
                    <p class="text-sm leading-relaxed text-white">You made it so simple. My new site is so much faster
                      and easier to work with than my old site. I just choose the page, make the change and click save.
                    </p>
                  </blockquote>

                  <div class="flex items-center mt-8 slide-down3">
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
                        <svg class="flex-shrink-0 w-5 h-5 text-green-500 icon-social" xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20" fill="currentColor">
                          <path fill-rule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clip-rule="evenodd" />
                        </svg>
                        <span class="text-base font-medium text-gray-900"> 1 Domain License </span>
                      </li>

                      <li class="inline-flex items-center space-x-2">
                        <svg class="flex-shrink-0 w-5 h-5 text-green-500 icon-social" xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20" fill="currentColor">
                          <path fill-rule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clip-rule="evenodd" />
                        </svg>
                        <span class="text-base font-medium text-gray-900"> Full Celebration Library </span>
                      </li>

                      <li class="inline-flex items-center space-x-2">
                        <svg class="flex-shrink-0 w-5 h-5 text-green-500 icon-social" xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20" fill="currentColor">
                          <path fill-rule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clip-rule="evenodd" />
                        </svg>
                        <span class="text-base font-medium text-gray-900"> 120+ Coded Blocks </span>
                      </li>

                      <li class="inline-flex items-center space-x-2">
                        <svg class="flex-shrink-0 w-5 h-5 text-green-500 icon-social" xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20" fill="currentColor">
                          <path fill-rule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clip-rule="evenodd" />
                        </svg>
                        <span class="text-base font-medium text-gray-900"> Design Files Included </span>
                      </li>

                      <li class="inline-flex items-center space-x-2">
                        <svg class="flex-shrink-0 w-5 h-5 text-green-500 icon-social" xmlns="http://www.w3.org/2000/svg"
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
                      <svg class="flex-shrink-0 w-5 h-5 text-gray-500 icon-social" xmlns="http://www.w3.org/2000/svg"
                        fill="none" viewBox="0 0 24 24" stroke="currentColor">
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

      <!-- Review -->
      <div class="overflow-hidden bg-[#18254F] mt-10 rounded-lg">
        <div class="relative max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
          <!-- Title -->
          <div class="w-full md:max-w-5xl w-3/4 mb-6 sm:mb-10 md:mb-16 slide-up">
            <h2 class="text-3xl font-bold leading-tight text-white sm:text-4xl lg:leading-tight lg:text-5xl">
              Loved by business and individuals across the globe
            </h2>
          </div>
          <!-- End Title -->

          <!-- Grid -->
          <div class="w-full">
            <swiper :modules="[Autoplay, Scrollbar, Pagination, Navigation]" :slides-per-view="1" :speed="1800"
              :space-between="20" :scrollbar="{ draggable: true }" :autoplay="{
                delay: 1200,
                disableOnInteraction: false,
                reverseDirection: false,
                pauseOnMouseEnter: true,
              }"
              :breakpoints="{
                640: {
                  slidesPerView: 1,
                },
                768: {
                  slidesPerView: 2,
                },
                1024: {
                  slidesPerView: 3,
                },
              }" 
              :navigation="{
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
              }" :loop="true">
              <!-- <div class="swiper-button-next">next</div>
              <div class="swiper-button-prev">prev</div> -->
              <swiper-slide>
                <article
                  class="group rounded-xl flex max-w-md flex-col border border-slate-300 bg-slate-100 p-6 text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor"
                    class="size-12 text-black dark:text-white group-hover:scale-105 transition duration-500 ease-out"
                    aria-hidden="true">
                    <path
                      d="M12 12a1 1 0 0 0 1-1V8.558a1 1 0 0 0-1-1h-1.388q0-.527.062-1.054.093-.558.31-.992t.559-.683q.34-.279.868-.279V3q-.868 0-1.52.372a3.3 3.3 0 0 0-1.085.992 4.9 4.9 0 0 0-.62 1.458A7.7 7.7 0 0 0 9 7.558V11a1 1 0 0 0 1 1zm-6 0a1 1 0 0 0 1-1V8.558a1 1 0 0 0-1-1H4.612q0-.527.062-1.054.094-.558.31-.992.217-.434.559-.683.34-.279.868-.279V3q-.868 0-1.52.372a3.3 3.3 0 0 0-1.085.992 4.9 4.9 0 0 0-.62 1.458A7.7 7.7 0 0 0 3 7.558V11a1 1 0 0 0 1 1z" />
                  </svg>
                  <p class="mt-2 text-pretty text-sm">
                    Simply put, this software transformed my workflow! Its intuitive
                    interface and powerful features make tasks a breeze. A game-changer
                    for productivity!
                  </p>
                  <!-- avatar & rating -->
                  <div class="flex flex-col-reverse md:flex-row md:items-center mt-8 justify-between gap-6">
                    <!-- avatar & title -->
                    <div class="flex items-center gap-2">
                      <img src="https://penguinui.s3.amazonaws.com/component-assets/avatar-1.webp"
                        class="size-10 rounded-full object-cover" alt="avatar" />
                      <div class="flex flex-col gap-1">
                        <h3 class="font-bold leading-4 text-black dark:text-white">Bob Johnson</h3>
                        <span class="text-xs">CEO - TechNova</span>
                      </div>
                    </div>
                    <!-- Rating -->
                    <div class="flex items-center gap-1">
                      <span class="sr-only">Rated 4 stars</span>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                        class="size-4 text-amber-500" aria-hidden="true">
                        <path fill-rule="evenodd"
                          d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                          clip-rule="evenodd" />
                      </svg>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                        class="size-4 text-amber-500" aria-hidden="true">
                        <path fill-rule="evenodd"
                          d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                          clip-rule="evenodd" />
                      </svg>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                        class="size-4 text-amber-500" aria-hidden="true">
                        <path fill-rule="evenodd"
                          d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                          clip-rule="evenodd" />
                      </svg>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                        class="size-4 text-amber-500" aria-hidden="true">
                        <path fill-rule="evenodd"
                          d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                          clip-rule="evenodd" />
                      </svg>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                        class="size-4 text-slate-700/50 dark:text-slate-300/50" aria-hidden="true">
                        <path fill-rule="evenodd"
                          d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                          clip-rule="evenodd" />
                      </svg>
                    </div>
                  </div>
                </article>
              </swiper-slide>

              <swiper-slide>
                <article
                  class="group rounded-xl flex max-w-md flex-col border border-slate-300 bg-slate-100 p-6 text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor"
                    class="size-12 text-black dark:text-white group-hover:scale-105 transition duration-500 ease-out"
                    aria-hidden="true">
                    <path
                      d="M12 12a1 1 0 0 0 1-1V8.558a1 1 0 0 0-1-1h-1.388q0-.527.062-1.054.093-.558.31-.992t.559-.683q.34-.279.868-.279V3q-.868 0-1.52.372a3.3 3.3 0 0 0-1.085.992 4.9 4.9 0 0 0-.62 1.458A7.7 7.7 0 0 0 9 7.558V11a1 1 0 0 0 1 1zm-6 0a1 1 0 0 0 1-1V8.558a1 1 0 0 0-1-1H4.612q0-.527.062-1.054.094-.558.31-.992.217-.434.559-.683.34-.279.868-.279V3q-.868 0-1.52.372a3.3 3.3 0 0 0-1.085.992 4.9 4.9 0 0 0-.62 1.458A7.7 7.7 0 0 0 3 7.558V11a1 1 0 0 0 1 1z" />
                  </svg>
                  <p class="mt-2 text-pretty text-sm">
                    Simply put, this software transformed my workflow! Its intuitive
                    interface and powerful features make tasks a breeze. A game-changer
                    for productivity!
                  </p>
                  <!-- avatar & rating -->
                  <div class="flex flex-col-reverse md:flex-row md:items-center mt-8 justify-between gap-6">
                    <!-- avatar & title -->
                    <div class="flex items-center gap-2">
                      <img src="https://penguinui.s3.amazonaws.com/component-assets/avatar-1.webp"
                        class="size-10 rounded-full object-cover" alt="avatar" />
                      <div class="flex flex-col gap-1">
                        <h3 class="font-bold leading-4 text-black dark:text-white">Bob Johnson</h3>
                        <span class="text-xs">CEO - TechNova</span>
                      </div>
                    </div>
                    <!-- Rating -->
                    <div class="flex items-center gap-1">
                      <span class="sr-only">Rated 4 stars</span>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                        class="size-4 text-amber-500" aria-hidden="true">
                        <path fill-rule="evenodd"
                          d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                          clip-rule="evenodd" />
                      </svg>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                        class="size-4 text-amber-500" aria-hidden="true">
                        <path fill-rule="evenodd"
                          d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                          clip-rule="evenodd" />
                      </svg>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                        class="size-4 text-amber-500" aria-hidden="true">
                        <path fill-rule="evenodd"
                          d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                          clip-rule="evenodd" />
                      </svg>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                        class="size-4 text-amber-500" aria-hidden="true">
                        <path fill-rule="evenodd"
                          d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                          clip-rule="evenodd" />
                      </svg>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                        class="size-4 text-slate-700/50 dark:text-slate-300/50" aria-hidden="true">
                        <path fill-rule="evenodd"
                          d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                          clip-rule="evenodd" />
                      </svg>
                    </div>
                  </div>
                </article>
              </swiper-slide>

              <swiper-slide>
                <article
                  class="group rounded-xl flex max-w-md flex-col border border-slate-300 bg-slate-100 p-6 text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor"
                    class="size-12 text-black dark:text-white group-hover:scale-105 transition duration-500 ease-out"
                    aria-hidden="true">
                    <path
                      d="M12 12a1 1 0 0 0 1-1V8.558a1 1 0 0 0-1-1h-1.388q0-.527.062-1.054.093-.558.31-.992t.559-.683q.34-.279.868-.279V3q-.868 0-1.52.372a3.3 3.3 0 0 0-1.085.992 4.9 4.9 0 0 0-.62 1.458A7.7 7.7 0 0 0 9 7.558V11a1 1 0 0 0 1 1zm-6 0a1 1 0 0 0 1-1V8.558a1 1 0 0 0-1-1H4.612q0-.527.062-1.054.094-.558.31-.992.217-.434.559-.683.34-.279.868-.279V3q-.868 0-1.52.372a3.3 3.3 0 0 0-1.085.992 4.9 4.9 0 0 0-.62 1.458A7.7 7.7 0 0 0 3 7.558V11a1 1 0 0 0 1 1z" />
                  </svg>
                  <p class="mt-2 text-pretty text-sm">
                    Simply put, this software transformed my workflow! Its intuitive
                    interface and powerful features make tasks a breeze. A game-changer
                    for productivity!
                  </p>
                  <!-- avatar & rating -->
                  <div class="flex flex-col-reverse md:flex-row md:items-center mt-8 justify-between gap-6">
                    <!-- avatar & title -->
                    <div class="flex items-center gap-2">
                      <img src="https://penguinui.s3.amazonaws.com/component-assets/avatar-1.webp"
                        class="size-10 rounded-full object-cover" alt="avatar" />
                      <div class="flex flex-col gap-1">
                        <h3 class="font-bold leading-4 text-black dark:text-white">Bob Johnson</h3>
                        <span class="text-xs">CEO - TechNova</span>
                      </div>
                    </div>
                    <!-- Rating -->
                    <div class="flex items-center gap-1">
                      <span class="sr-only">Rated 4 stars</span>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                        class="size-4 text-amber-500" aria-hidden="true">
                        <path fill-rule="evenodd"
                          d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                          clip-rule="evenodd" />
                      </svg>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                        class="size-4 text-amber-500" aria-hidden="true">
                        <path fill-rule="evenodd"
                          d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                          clip-rule="evenodd" />
                      </svg>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                        class="size-4 text-amber-500" aria-hidden="true">
                        <path fill-rule="evenodd"
                          d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                          clip-rule="evenodd" />
                      </svg>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                        class="size-4 text-amber-500" aria-hidden="true">
                        <path fill-rule="evenodd"
                          d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                          clip-rule="evenodd" />
                      </svg>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                        class="size-4 text-slate-700/50 dark:text-slate-300/50" aria-hidden="true">
                        <path fill-rule="evenodd"
                          d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                          clip-rule="evenodd" />
                      </svg>
                    </div>
                  </div>
                </article>
              </swiper-slide>

              <swiper-slide>
                <article
                  class="group rounded-xl flex max-w-md flex-col border border-slate-300 bg-slate-100 p-6 text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor"
                    class="size-12 text-black dark:text-white group-hover:scale-105 transition duration-500 ease-out"
                    aria-hidden="true">
                    <path
                      d="M12 12a1 1 0 0 0 1-1V8.558a1 1 0 0 0-1-1h-1.388q0-.527.062-1.054.093-.558.31-.992t.559-.683q.34-.279.868-.279V3q-.868 0-1.52.372a3.3 3.3 0 0 0-1.085.992 4.9 4.9 0 0 0-.62 1.458A7.7 7.7 0 0 0 9 7.558V11a1 1 0 0 0 1 1zm-6 0a1 1 0 0 0 1-1V8.558a1 1 0 0 0-1-1H4.612q0-.527.062-1.054.094-.558.31-.992.217-.434.559-.683.34-.279.868-.279V3q-.868 0-1.52.372a3.3 3.3 0 0 0-1.085.992 4.9 4.9 0 0 0-.62 1.458A7.7 7.7 0 0 0 3 7.558V11a1 1 0 0 0 1 1z" />
                  </svg>
                  <p class="mt-2 text-pretty text-sm">
                    Simply put, this software transformed my workflow! Its intuitive
                    interface and powerful features make tasks a breeze. A game-changer
                    for productivity!
                  </p>
                  <!-- avatar & rating -->
                  <div class="flex flex-col-reverse md:flex-row md:items-center mt-8 justify-between gap-6">
                    <!-- avatar & title -->
                    <div class="flex items-center gap-2">
                      <img src="https://penguinui.s3.amazonaws.com/component-assets/avatar-1.webp"
                        class="size-10 rounded-full object-cover" alt="avatar" />
                      <div class="flex flex-col gap-1">
                        <h3 class="font-bold leading-4 text-black dark:text-white">Bob Johnson</h3>
                        <span class="text-xs">CEO - TechNova</span>
                      </div>
                    </div>
                    <!-- Rating -->
                    <div class="flex items-center gap-1">
                      <span class="sr-only">Rated 4 stars</span>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                        class="size-4 text-amber-500" aria-hidden="true">
                        <path fill-rule="evenodd"
                          d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                          clip-rule="evenodd" />
                      </svg>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                        class="size-4 text-amber-500" aria-hidden="true">
                        <path fill-rule="evenodd"
                          d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                          clip-rule="evenodd" />
                      </svg>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                        class="size-4 text-amber-500" aria-hidden="true">
                        <path fill-rule="evenodd"
                          d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                          clip-rule="evenodd" />
                      </svg>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                        class="size-4 text-amber-500" aria-hidden="true">
                        <path fill-rule="evenodd"
                          d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                          clip-rule="evenodd" />
                      </svg>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                        class="size-4 text-slate-700/50 dark:text-slate-300/50" aria-hidden="true">
                        <path fill-rule="evenodd"
                          d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                          clip-rule="evenodd" />
                      </svg>
                    </div>
                  </div>
                </article>
              </swiper-slide>

              <swiper-slide>
                <article
                  class="group rounded-xl flex max-w-md flex-col border border-slate-300 bg-slate-100 p-6 text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor"
                    class="size-12 text-black dark:text-white group-hover:scale-105 transition duration-500 ease-out"
                    aria-hidden="true">
                    <path
                      d="M12 12a1 1 0 0 0 1-1V8.558a1 1 0 0 0-1-1h-1.388q0-.527.062-1.054.093-.558.31-.992t.559-.683q.34-.279.868-.279V3q-.868 0-1.52.372a3.3 3.3 0 0 0-1.085.992 4.9 4.9 0 0 0-.62 1.458A7.7 7.7 0 0 0 9 7.558V11a1 1 0 0 0 1 1zm-6 0a1 1 0 0 0 1-1V8.558a1 1 0 0 0-1-1H4.612q0-.527.062-1.054.094-.558.31-.992.217-.434.559-.683.34-.279.868-.279V3q-.868 0-1.52.372a3.3 3.3 0 0 0-1.085.992 4.9 4.9 0 0 0-.62 1.458A7.7 7.7 0 0 0 3 7.558V11a1 1 0 0 0 1 1z" />
                  </svg>
                  <p class="mt-2 text-pretty text-sm">
                    Simply put, this software transformed my workflow! Its intuitive
                    interface and powerful features make tasks a breeze. A game-changer
                    for productivity!
                  </p>
                  <!-- avatar & rating -->
                  <div class="flex flex-col-reverse md:flex-row md:items-center mt-8 justify-between gap-6">
                    <!-- avatar & title -->
                    <div class="flex items-center gap-2">
                      <img src="https://penguinui.s3.amazonaws.com/component-assets/avatar-1.webp"
                        class="size-10 rounded-full object-cover" alt="avatar" />
                      <div class="flex flex-col gap-1">
                        <h3 class="font-bold leading-4 text-black dark:text-white">Bob Johnson</h3>
                        <span class="text-xs">CEO - TechNova</span>
                      </div>
                    </div>
                    <!-- Rating -->
                    <div class="flex items-center gap-1">
                      <span class="sr-only">Rated 4 stars</span>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                        class="size-4 text-amber-500" aria-hidden="true">
                        <path fill-rule="evenodd"
                          d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                          clip-rule="evenodd" />
                      </svg>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                        class="size-4 text-amber-500" aria-hidden="true">
                        <path fill-rule="evenodd"
                          d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                          clip-rule="evenodd" />
                      </svg>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                        class="size-4 text-amber-500" aria-hidden="true">
                        <path fill-rule="evenodd"
                          d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                          clip-rule="evenodd" />
                      </svg>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                        class="size-4 text-amber-500" aria-hidden="true">
                        <path fill-rule="evenodd"
                          d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                          clip-rule="evenodd" />
                      </svg>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                        class="size-4 text-slate-700/50 dark:text-slate-300/50" aria-hidden="true">
                        <path fill-rule="evenodd"
                          d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                          clip-rule="evenodd" />
                      </svg>
                    </div>
                  </div>
                </article>
              </swiper-slide>

              <swiper-slide>
                <article
                  class="group rounded-xl flex max-w-md flex-col border border-slate-300 bg-slate-100 p-6 text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor"
                    class="size-12 text-black dark:text-white group-hover:scale-105 transition duration-500 ease-out"
                    aria-hidden="true">
                    <path
                      d="M12 12a1 1 0 0 0 1-1V8.558a1 1 0 0 0-1-1h-1.388q0-.527.062-1.054.093-.558.31-.992t.559-.683q.34-.279.868-.279V3q-.868 0-1.52.372a3.3 3.3 0 0 0-1.085.992 4.9 4.9 0 0 0-.62 1.458A7.7 7.7 0 0 0 9 7.558V11a1 1 0 0 0 1 1zm-6 0a1 1 0 0 0 1-1V8.558a1 1 0 0 0-1-1H4.612q0-.527.062-1.054.094-.558.31-.992.217-.434.559-.683.34-.279.868-.279V3q-.868 0-1.52.372a3.3 3.3 0 0 0-1.085.992 4.9 4.9 0 0 0-.62 1.458A7.7 7.7 0 0 0 3 7.558V11a1 1 0 0 0 1 1z" />
                  </svg>
                  <p class="mt-2 text-pretty text-sm">
                    Simply put, this software transformed my workflow! Its intuitive
                    interface and powerful features make tasks a breeze. A game-changer
                    for productivity!
                  </p>
                  <!-- avatar & rating -->
                  <div class="flex flex-col-reverse md:flex-row md:items-center mt-8 justify-between gap-6">
                    <!-- avatar & title -->
                    <div class="flex items-center gap-2">
                      <img src="https://penguinui.s3.amazonaws.com/component-assets/avatar-1.webp"
                        class="size-10 rounded-full object-cover" alt="avatar" />
                      <div class="flex flex-col gap-1">
                        <h3 class="font-bold leading-4 text-black dark:text-white">Bob Johnson</h3>
                        <span class="text-xs">CEO - TechNova</span>
                      </div>
                    </div>
                    <!-- Rating -->
                    <div class="flex items-center gap-1">
                      <span class="sr-only">Rated 4 stars</span>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                        class="size-4 text-amber-500" aria-hidden="true">
                        <path fill-rule="evenodd"
                          d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                          clip-rule="evenodd" />
                      </svg>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                        class="size-4 text-amber-500" aria-hidden="true">
                        <path fill-rule="evenodd"
                          d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                          clip-rule="evenodd" />
                      </svg>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                        class="size-4 text-amber-500" aria-hidden="true">
                        <path fill-rule="evenodd"
                          d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                          clip-rule="evenodd" />
                      </svg>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                        class="size-4 text-amber-500" aria-hidden="true">
                        <path fill-rule="evenodd"
                          d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                          clip-rule="evenodd" />
                      </svg>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                        class="size-4 text-slate-700/50 dark:text-slate-300/50" aria-hidden="true">
                        <path fill-rule="evenodd"
                          d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                          clip-rule="evenodd" />
                      </svg>
                    </div>
                  </div>
                </article>
              </swiper-slide>

            </swiper>
          </div>
          <!-- End Grid -->

          <!-- Grid -->
          <div class="mt-20 grid gap-6 grid-cols-2 sm:gap-12 lg:grid-cols-3 lg:gap-8">
            <!-- Stats -->
            <div>
              <h4 class="text-lg sm:text-xl font-semibold text-white slide-up">Accuracy rate</h4>
              <p class="mt-2 sm:mt-3 text-4xl sm:text-6xl font-bold text-blue-500 slide-left">99.95%</p>
              <p class="mt-1 text-gray-400 slide-down">in fulfilling orders</p>
            </div>
            <!-- End Stats -->

            <!-- Stats -->
            <div>
              <h4 class="text-lg sm:text-xl font-semibold text-white slide-up">Startup businesses</h4>
              <p class="mt-2 sm:mt-3 text-4xl sm:text-6xl font-bold text-blue-500 slide-left">2,000+</p>
              <p class="mt-1 text-gray-400 slide-down">partner with Preline</p>
            </div>
            <!-- End Stats -->

            <!-- Stats -->
            <div>
              <h4 class="text-lg sm:text-xl font-semibold text-white slide-up">Happy customer</h4>
              <p class="mt-2 sm:mt-3 text-4xl sm:text-6xl font-bold text-blue-500 slide-left">85%</p>
              <p class="mt-1 text-gray-400 slide-down">this year alone</p>
            </div>
            <!-- End Stats -->
          </div>
          <!-- End Grid -->

          <!-- SVG Element -->
          <div class="absolute bottom-0 end-0 transform lg:translate-x-32 slide-right" aria-hidden="true">
            <svg class="w-40 h-auto sm:w-72" width="1115" height="636" viewBox="0 0 1115 636" fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M0.990203 279.321C-1.11035 287.334 3.68307 295.534 11.6966 297.634L142.285 331.865C150.298 333.965 158.497 329.172 160.598 321.158C162.699 313.145 157.905 304.946 149.892 302.845L33.8132 272.418L64.2403 156.339C66.3409 148.326 61.5475 140.127 53.5339 138.026C45.5204 135.926 37.3213 140.719 35.2207 148.733L0.990203 279.321ZM424.31 252.289C431.581 256.26 440.694 253.585 444.664 246.314C448.635 239.044 445.961 229.931 438.69 225.96L424.31 252.289ZM23.0706 296.074C72.7581 267.025 123.056 230.059 187.043 212.864C249.583 196.057 325.63 198.393 424.31 252.289L438.69 225.96C333.77 168.656 249.817 164.929 179.257 183.892C110.144 202.465 54.2419 243.099 7.92943 270.175L23.0706 296.074Z"
                fill="currentColor" class="fill-orange-500" />
              <path
                d="M451.609 382.417C446.219 388.708 446.95 398.178 453.241 403.567L555.763 491.398C562.054 496.788 571.524 496.057 576.913 489.766C582.303 483.474 581.572 474.005 575.281 468.615L484.15 390.544L562.222 299.413C567.612 293.122 566.881 283.652 560.59 278.263C554.299 272.873 544.829 273.604 539.44 279.895L451.609 382.417ZM837.202 559.655C841.706 566.608 850.994 568.593 857.947 564.09C864.9 559.586 866.885 550.298 862.381 543.345L837.202 559.655ZM464.154 407.131C508.387 403.718 570.802 395.25 638.136 410.928C704.591 426.401 776.318 465.66 837.202 559.655L862.381 543.345C797.144 442.631 718.724 398.89 644.939 381.709C572.033 364.734 504.114 373.958 461.846 377.22L464.154 407.131Z"
                fill="currentColor" class="fill-cyan-500" />
              <path
                d="M447.448 0.194357C439.203 -0.605554 431.87 5.43034 431.07 13.6759L418.035 148.045C417.235 156.291 423.271 163.623 431.516 164.423C439.762 165.223 447.095 159.187 447.895 150.942L459.482 31.5025L578.921 43.0895C587.166 43.8894 594.499 37.8535 595.299 29.6079C596.099 21.3624 590.063 14.0296 581.818 13.2297L447.448 0.194357ZM1086.03 431.727C1089.68 439.166 1098.66 442.239 1106.1 438.593C1113.54 434.946 1116.62 425.96 1112.97 418.521L1086.03 431.727ZM434.419 24.6572C449.463 42.934 474.586 81.0463 521.375 116.908C568.556 153.07 637.546 187.063 742.018 200.993L745.982 171.256C646.454 157.985 582.444 125.917 539.625 93.0974C496.414 59.978 474.537 26.1903 457.581 5.59138L434.419 24.6572ZM742.018 200.993C939.862 227.372 1054.15 366.703 1086.03 431.727L1112.97 418.521C1077.85 346.879 956.138 199.277 745.982 171.256L742.018 200.993Z"
                fill="currentColor" class="fill-white" />
            </svg>
          </div>
          <!-- End SVG Element -->
        </div>
      </div>

      <!-- Footer -->
      <Footer :ipAddress="ipAddress" :city="city" :name="props.name" :userID="props.userID"/>
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
  -webkit-transition: background-color 1200ms linear;
  -moz-transition: background-color 1200ms linear;
  -o-transition: background-color 1200ms linear;
  -ms-transition: background-color 1200ms linear;
  transition: background-color 1200ms linear;
}

.header-top.active {
  background-color: #3736af;
  box-shadow: 0 6px 12px rgba(55, 54, 175, 0.6);
}

svg.icon-social {
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

/*  */
.loader-spiner1 {
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

/*  */
.loader-spiner2 {
  width: 35px;
  aspect-ratio: 1;
  --_g: no-repeat radial-gradient(circle closest-side, #fff 90%, #0000);
  background:
    var(--_g) 0 0,
    var(--_g) 0 100%,
    var(--_g) 100% 100%;
  background-size: 40% 40%;
  animation: l11 1s infinite linear;
}

@keyframes l11 {
  25% {
    background-position: 100% 0, 0 100%, 100% 100%
  }

  50% {
    background-position: 100% 0, 0 0, 100% 100%
  }

  75% {
    background-position: 100% 0, 0 0, 0 100%
  }

  100% {
    background-position: 100% 100%, 0 0, 0 100%
  }
}
</style>
