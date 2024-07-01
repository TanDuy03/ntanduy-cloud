<script setup lang="ts">
  import { defineProps } from "vue"
  import CountUp from 'vue-countup-v3'
  const props = defineProps<{ name: string, description: string }>()
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
          class="relative flex h-32 md:h-36 w-full justify-center rounded-[8px] bg-cover banner"
        >
          <div
            class="absolute -bottom-7 md:-bottom-12 md:left-12 h-[100px] md:h-[130px] w-[100px] md:w-[130px] flex justify-center rounded-full border-[4px] border-white"
          >
            <img
              class="h-full w-full rounded-full object-fill"
              src="../assets/avatar.png"
              alt="Nguyen Tan Duy"
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
              <count-up class="text-2xl font-bold" :end-val="35"></count-up>
              <small class="font-normal text-neutral-600">Block</small>
            </div>
          </div>
        </div>
        <div class="w-full mt-1">
          <p
            class="text-[14px] font-normal text-slate-600 -tracking-2 text-left md:text-justify"
          >
            Welcome to the website. I am a programmer from Vietnam, I specialize
            in programming web applications using Laravel, VueJs, Tailwindcss,
            Bootstrap, etc. My strong passion for programming drives me to
            create powerful, high-performance web applications with the most
            modern technologies and contribute to the development of open
            source.
          </p>
        </div>
      </div>
      <div class="w-full h-[1px] bg-gray-300"></div>
      <div class="px-[21px] py-[21px]">
        <div
          class="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 icon-social"
        >
          <a
            href="https://www.facebook.com/ntanduy03"
            target="_blank"
            class="flex gap-2 items-center"
            title="Facebook"
          >
            <i class="bx bxl-meta text-[28px] text-gray-700"></i>
            <span
              class="text-neutral-900 hover:text-cyan-600 transition duration-150"
              >Facebook</span
            >
          </a>
          <a
            href="https://x.com/ng_tanduy"
            target="_blank"
            class="flex gap-2 items-center"
            title="Twitter"
          >
            <i class="bx bxl-twitter text-[28px] text-gray-700"></i>
            <span
              class="text-neutral-900 hover:text-cyan-600 transition duration-150"
              >Twitter</span
            >
          </a>
          <a
            href="https://github.com/TanDuy03"
            target="_blank"
            class="flex gap-2 items-center"
            title="Github"
          >
            <i class="bx bxl-github text-[28px] text-gray-700"></i>
            <span
              class="text-neutral-900 hover:text-cyan-600 transition duration-150"
              >Github</span
            >
          </a>
          <a
            href="https://www.instagram.com/ng.tanduy26"
            target="_blank"
            class="flex gap-2 items-center"
            title="Instagram"
          >
            <i class="bx bxl-instagram text-[28px] text-gray-700"></i>
            <span
              class="text-neutral-900 hover:text-cyan-600 transition duration-150"
              >Instagram</span
            >
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.banner {
  background-image: url("../assets/banner.png");
}

.icon-social svg {
  height: 28px;
  width: 28px;
}
</style>
