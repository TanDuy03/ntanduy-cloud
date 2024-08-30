<template>
    <footer class="bg-[#18254F] rounded-lg mt-10">
        <div class="w-full max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-4 md:pt-8 md:pb-5">
            <div class="sm:flex sm:items-center sm:justify-between">
                <a href="https://pinkary.com/@TanDuy03" target="_blank"
                    class="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse slide-up">
                    <img v-lazy="'https://flowbite.com/docs/images/logo.svg'" class="h-8" :alt="name" />
                    <span class="self-center text-2xl font-semibold whitespace-nowrap text-white">{{ userID
                        }}</span>
                </a>
                <ul class="flex flex-wrap items-center gap-3 mb-6 text-sm font-medium text-white sm:mb-0 slide-up">
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
                    href="https://pinkary.com/@TanDuy03" class="hover:underline">{{ userID }}</a>. All Rights
                Reserved -
                Your current IP: {{ ipAddress || 'No data' }} - {{ city || 'No data' }}.</small>
        </div>
    </footer>
</template>

<script>
    export default {
        props: {
            ipAddress: {
                type: String,
                default: 'No data'
            },
            city: {
                type: String,
                default: 'No data'
            },
            name: {
                type: String,
                default: "Nguyen Tan Duy"
            },
            userID: {
                type: String,
                default: 'TanDuy03'
            }
        }
    }
</script>