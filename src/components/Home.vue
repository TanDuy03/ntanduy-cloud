<script setup lang="ts">
import { defineProps } from "vue";
const props = defineProps<{ name: string }>();
</script>

<template>
  <div class="min-h-screen h-full w-full flex justify-center items-center bg-[#F1F5F9] p-[18px]">
    <div
      class="dark:!bg-navy-800 rounded-[8px] bg-white shadow-3xl shadow-gray-500 rounded-primary relative mx-auto w-full max-w-[678px] bg-cover bg-clip-border dark:text-white dark:shadow-none">
      <div class="p-[21px]">
        <div class="relative flex h-32 md:h-36 w-full justify-center rounded-[8px] bg-cover banner">
          <div
            class="absolute -bottom-7 md:-bottom-12 md:left-12 h-[100px] md:h-[130px] w-[100px] md:w-[130px] flex justify-center rounded-full border-[4px] border-white">
            <img class="h-full w-full rounded-full object-fill" src="../assets/avatar.png" alt="Nguyen Tan Duy" />
          </div>
        </div>
        <div class="w-full flex justify-end p-3 mt-6 md:mt-0">
          <div class="w-full flex-col md:w-[70%]">
            <h4
              class="flex justify-center md:justify-normal items-center gap-2 text-navy-700 text-2xl text-center md:text-left font-bold dark:text-white">
              {{ props.name }}
              <svg viewBox="0 0 12 13" width="16" height="16" fill="currentColor" title="System verified"
                class="x19dipnz x1lliihq x1tzjh5l x1k90msu x2h7rmj x1qfuztq" style="color: #0866FF;">
                <title>System verified</title>
                <g fill-rule="evenodd" transform="translate(-98 -917)">
                  <path
                    d="m106.853 922.354-3.5 3.5a.499.499 0 0 1-.706 0l-1.5-1.5a.5.5 0 1 1 .706-.708l1.147 1.147 3.147-3.147a.5.5 0 1 1 .706.708m3.078 2.295-.589-1.149.588-1.15a.633.633 0 0 0-.219-.82l-1.085-.7-.065-1.287a.627.627 0 0 0-.6-.603l-1.29-.066-.703-1.087a.636.636 0 0 0-.82-.217l-1.148.588-1.15-.588a.631.631 0 0 0-.82.22l-.701 1.085-1.289.065a.626.626 0 0 0-.6.6l-.066 1.29-1.088.702a.634.634 0 0 0-.216.82l.588 1.149-.588 1.15a.632.632 0 0 0 .219.819l1.085.701.065 1.286c.014.33.274.59.6.604l1.29.065.703 1.088c.177.27.53.362.82.216l1.148-.588 1.15.589a.629.629 0 0 0 .82-.22l.701-1.085 1.286-.064a.627.627 0 0 0 .604-.601l.065-1.29 1.088-.703a.633.633 0 0 0 .216-.819">
                  </path>
                </g>
              </svg>
            </h4>
            <h5 className="text-base font-normal text-center md:text-left text-gray-600">
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
        <div class="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 icon-social">
          <a href="https://www.facebook.com/ntanduy03" target="_blank" class="flex gap-2 items-center">
            <i class='bx bxl-meta text-[28px] text-gray-700'></i>
            <span class="text-neutral-900 hover:text-cyan-600 transition duration-150">Facebook</span>
          </a>
          <a href="https://x.com/ng_tanduy" target="_blank" class="flex gap-2 items-center">
            <i class='bx bxl-twitter text-[28px] text-gray-700'></i>
            <span class="text-neutral-900 hover:text-cyan-600 transition duration-150">Twitter</span>
          </a>
          <a href="https://github.com/TanDuy03" target="_blank" class="flex gap-2 items-center">
            <i class='bx bxl-github text-[28px] text-gray-700'></i>
            <span class="text-neutral-900 hover:text-cyan-600 transition duration-150">Github</span>
          </a>
          <a href="https://www.instagram.com/ng.tanduy26" target="_blank" class="flex gap-2 items-center">
            <i class='bx bxl-instagram text-[28px] text-gray-700'></i>
            <span class="text-neutral-900 hover:text-cyan-600 transition duration-150">Instagram</span>
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
