<template>
    <div class="w-full bg-[#18254F] mt-10 rounded-lg px-4 py-6 sm:px-6 lg:px-8 lg:py-10 mx-auto overflow-hidden">
        <div class="lg:grid lg:grid-cols-12 lg:gap-16 lg:items-center lg:justify-between">
            <div class="lg:col-span-6 lg:col-start-1">
                <div class="mb-10">
                    <h2
                        class="mb-2 text-3xl sm:text-4xl lg:text-5xl text-white font-bold dark:text-neutral-200 slide-up">
                        The passion that drives me forward
                    </h2>
                    <p class="text-gray-500 text-sm dark:text-neutral-400 slide-left">
                        I am a programmer from Vietnam, I specialize in programming web applications using Laravel,
                        Vuejs,
                        Tailwindcss, etc. My strong passion for programming drives me to create powerful,
                        high-performance web
                        applications with the most modern technologies and contribute to the development of open
                        source.
                    </p>
                </div>

                <blockquote class="relative">
                    <svg class="absolute top-0 icon-social left-[5px] transform -translate-x-5 -translate-y-6 size-8 text-gray-200 dark:text-neutral-800"
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
                                    v-lazy="'https://ik.imagekit.io/odbmay3h6/avatar.jpg?updatedAt=1724846688735'">
                            </div>
                            <div class="grow">
                                <div class="font-semibold text-white dark:text-neutral-200 slide-up">{{ name }}</div>
                                <div class="text-xs text-white dark:text-neutral-500 slide-down">{{ description }}</div>
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
                                    xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                    fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                    stroke-linejoin="round">
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
                                    xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                    fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                    stroke-linejoin="round">
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
</template>

<script>
import CountUp from 'vue-countup-v3'
export default {
    components: {
        CountUp
    },
    props: {
        name: {
            type: String,
            default: "Nguyen Tan Duy"
        },
        description: {
            type: String,
            default: "Software Developer"
        }
    }
}
</script>