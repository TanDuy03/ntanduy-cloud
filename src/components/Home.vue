<script setup lang="ts">
  import { defineProps } from "vue";
  const props = defineProps<{ name: string }>();
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
              class="text-navy-700 text-2xl text-center md:text-left font-bold dark:text-white"
            >
              {{ props.name }}
            </h4>
            <h5
              className="text-base font-normal text-center md:text-left text-gray-600"
            >
              Software Developer
            </h5>
          </div>
        </div>
        <div class="w-full flex justify-center pt-2 pb-3">
          <div class="w-2/3 grid grid-cols-3 gap-4">
            <div class="px-4 flex flex-col justify-center items-center">
              <h3 class="text-2xl font-bold">26</h3>
              <small class="font-normal text-neutral-600">Online</small>
            </div>
            <div class="px-4 flex flex-col justify-center items-center">
              <h3 class="text-2xl font-bold">12</h3>
              <small class="font-normal text-neutral-600">View</small>
            </div>
            <div class="px-4 flex flex-col justify-center items-center">
              <h3 class="text-2xl font-bold">03</h3>
              <small class="font-normal text-neutral-600">Block</small>
            </div>
          </div>
        </div>
        <div class="w-full mt-1">
          <p class="text-[14px] font-normal text-slate-600 -tracking-2 text-left md:text-justify">
            Welcome to the website. I am a programmer from Vietnam, I specialize in programming 
            web applications using Laravel, VueJs, Tailwindcss, Bootstrap, etc. My strong 
            passion for programming drives me to create powerful, high-performance web 
            applications with the most modern technologies and contribute to the development of 
            open source.
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
          >
            <i class='bx bxl-meta text-[28px] text-gray-700'></i>
            <span
              class="text-neutral-900 hover:text-cyan-600 transition duration-150"
              >Facebook</span
            >
          </a>
          <a
            href="https://x.com/ng_tanduy"
            target="_blank"
            class="flex gap-2 items-center"
          >
            <i class='bx bxl-twitter text-[28px] text-gray-700'></i>
            <span
              class="text-neutral-900 hover:text-cyan-600 transition duration-150"
              >Twitter</span
            >
          </a>
          <a
            href="https://github.com/TanDuy03"
            target="_blank"
            class="flex gap-2 items-center"
          >
            <i class='bx bxl-github text-[28px] text-gray-700'></i>
            <span
              class="text-neutral-900 hover:text-cyan-600 transition duration-150"
              >Github</span
            >
          </a>
          <a
            href="https://www.instagram.com/ng.tanduy26"
            target="_blank"
            class="flex gap-2 items-center"
          >
            <i class='bx bxl-instagram text-[28px] text-gray-700'></i>
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
