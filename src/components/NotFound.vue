<template>
    <div class="min-h-screen h-ful w-full flex justify-center items-center flex-col" x-data>
        <h4 class="text-[25px] text-[#444444] font-medium" x-text="$store.page.title"></h4>
        <router-link to="/" class="underline text-blue-600">Home</router-link>
    </div>
</template>