<script setup lang="ts">
  import { defineProps, ref } from "vue"
  import CountUp from 'vue-countup-v3'
  import axios from "axios"
  import { toast } from 'vue3-toastify'
  import 'vue3-toastify/dist/index.css'
  import { getDatabase, push, ref as dbRef, query, orderByChild, equalTo, get } from "firebase/database"

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
  <div
    class="min-h-screen h-full w-full flex justify-center items-center bg-[#F1F5F9] p-[18px]"
  >
    <div
      class="dark:!bg-navy-800 rounded-[8px] bg-white shadow-3xl shadow-gray-500 rounded-primary relative mx-auto w-full max-w-[678px] bg-cover bg-clip-border dark:text-white dark:shadow-none"
    >
      <div class="p-[21px]">
        <div
          class="relative flex h-24 md:h-36 w-full justify-center rounded-[8px] bg-cover banner"
        >
          <div
            class="absolute -bottom-10 md:-bottom-12 md:left-12 flex justify-center rounded-full border-[4px] border-white"
          >
            <img
              class="size-[100px] md:size-[130px] rounded-full object-fill"
              src="https://ik.imagekit.io/odbmay3h6/avatar.webp?updatedAt=1724402771259"
              alt="Nguyen Tan Duy" loading="lazy"
            />
          </div>
        </div>
        <div class="w-full flex justify-end p-3 mt-8 md:mt-0">
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
            class="text-[13px] font-normal text-slate-600 -tracking-2 text-left md:text-justify"
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
    </div>
  </div>
  <div class="fixed bottom-0 right-0 py-3 w-full bg-[#6366F1] sm:bg-inherit sm:w-auto sm:bottom-10 
    sm:right-10 flex sm:flex-col sm:gap-3 rounded-t-[15px] justify-evenly items-center
    sm:rounded-none sm:py-0
    ">
    <div class="sm:size-[45px] sm:bg-[#6366F1] rounded-full hover:translateY shadow-lg shadow-[#6366F1]">
      <a href="https://www.facebook.com/ntanduy03" target="_blank" aria-label="Facebook" class="w-full h-full flex items-center justify-center">
        <i class='bx bxl-meta text-[25px] text-white leading-none'></i>
      </a>
    </div>
    <div class="sm:size-[45px] sm:bg-[#6366F1] rounded-full hover:translateY shadow-lg shadow-[#6366F1]">
      <a href="https://x.com/ng_tanduy" target="_blank" aria-label="X" class="w-full h-full flex items-center justify-center">
        <i class='bx bxl-twitter text-[25px] text-white leading-none'></i>
      </a>
    </div>
    <div class="sm:size-[45px] sm:bg-[#6366F1] rounded-full hover:translateY shadow-lg shadow-[#6366F1]">
      <a href="https://www.instagram.com/ng.tanduy26" target="_blank" aria-label="Instagram" class="w-full h-full flex items-center justify-center">
        <i class='bx bxl-instagram text-[25px] text-white leading-none'></i>
      </a>
    </div>
    <div class="sm:size-[45px] sm:bg-[#6366F1] rounded-full hover:translateY shadow-lg shadow-[#6366F1]">
      <a href="https://www.github.com/TanDuy03" target="_blank" aria-label="Github" class="w-full h-full flex items-center justify-center">
        <i class='bx bxl-github text-[25px] text-white leading-none'></i>
      </a>
    </div>
    <div class="sm:size-[45px] sm:bg-[#6366F1] rounded-full hover:translateY shadow-lg shadow-[#6366F1]">
      <router-link to="/login" class="w-full h-full flex items-center justify-center" aria-label="Login">
        <i class='bx bx-user text-[25px] text-white leading-none'></i>
      </router-link>
    </div>
  </div>
</template>

<style scoped>
  .banner {
    background-image: url("https://ik.imagekit.io/odbmay3h6/banner.webp?updatedAt=1724402641525");
  }

  .icon-social svg {
    height: 28px;
    width: 28px;
  }
</style>
