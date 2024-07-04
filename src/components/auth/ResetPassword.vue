<template>
    <div class="flex min-h-full flex-col justify-center px-6 py-10 lg:px-8">
        <div class="sm:mx-auto sm:w-full sm:max-w-sm">
            <router-link to="/">
                <img class="mx-auto h-10 w-auto" src="/vite.svg" alt="Nguyen Tan Duy" />
            </router-link>
            <h2 class="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                Reset Password
            </h2>
        </div>

        <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <div class="mb-4">
                <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Email address</label>
                <div class="mt-2">
                    <input id="email" name="email" type="email" autocomplete="email" required v-model="email"
                        placeholder="example@gmail.com" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 
              ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset 
              focus:ring-indigo-600 outline-none sm:text-sm sm:leading-6 ps-2" />
                </div>
            </div>

            <div class="mt-7 mb-3">
                <button type="submit" @click="reset"
                    class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 outline-none">
                    Reset Password
                </button>
            </div>

            <p class="mt-6 text-center text-sm text-gray-500">
                Enter your recovery email -
                <router-link to="/login" class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                    Log in to your account?
                </router-link>
            </p>
        </div>
    </div>
</template>

<script setup>
    import { ref } from "vue"
    import { useRouter } from "vue-router"
    import { getAuth, sendPasswordResetEmail } from "firebase/auth"
    import { toast } from 'vue3-toastify'
    import 'vue3-toastify/dist/index.css'

    const email = ref("")
    const msg = ref("")

    const auth = getAuth()
    const reset = () => {
        sendPasswordResetEmail(auth, email.value)
        .then(() => {
            toast.success("Password reset email sent!", {
                autoClose: 1500
            })
        })
        .catch((error) => {
            const errorCode = error.code;
            switch (errorCode) {
                case "auth/missing-email":
                    msg.value = "Please enter email"
                    break;
                case "auth/invalid-email":
                    msg.value = "Invalid email"
                    break;
                default:
                    msg.value = "Email was incorrect"
                    break;
            }

            toast.error(msg, {
                autoClose: 1500
            })
        });
    }
</script>