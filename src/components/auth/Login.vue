<template>
    <div class="flex min-h-full flex-col justify-center px-6 py-10 lg:px-8">
        <div class="sm:mx-auto sm:w-full sm:max-w-sm">
            <router-link to="/">
                <img class="mx-auto h-10 w-auto" src="/vite.svg" alt="Nguyen Tan Duy" />
            </router-link>
            <h2 class="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                Sign in to your account
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

            <div class="mb-4">
                <div class="flex items-center justify-between">
                    <label for="password" class="block text-sm font-medium leading-6 text-gray-900">Password</label>
                    <div class="text-sm">
                        <router-link to="/reset-password" class="font-semibold text-indigo-600 hover:text-indigo-500">
                            Forgot password?
                        </router-link>
                    </div>
                </div>
                <div class="mt-2">
                    <input id="password" name="password" type="password" autocomplete="current-password" required
                        placeholder="Your password" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 
              ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset 
              focus:ring-indigo-600 outline-none sm:text-sm sm:leading-6 ps-2" v-model="password"/>
                </div>
            </div>

            <div class="mb-4">
                <label
                    for="email"
                    class="block text-sm font-medium leading-6 text-gray-600"
                    >Let us know you're human</label
                >
                <div class="mt-2">
                    <vue-turnstile :site-key="siteKey" v-model="token" />
                </div>
            </div>

            <div class="mt-4 mb-3">
                <button type="submit" @click="login" :disabled="token === '' || token === undefined"
                    :class="{'disabled-button' : token === '' || token === undefined}"
                    class="flex w-full gap-3 justify-center items-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 outline-none">
                    <span class="block py-2 loader" v-if="loading"></span>
                    <span v-else>Sign in</span>
                </button>
            </div>

            <p class="mt-6 text-center text-sm text-gray-500">
                Not a member?
                <router-link to="/register" class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                    Register an account
                </router-link>
            </p>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { ref } from "vue"
    import { useRouter } from "vue-router"
    import { getAuth, signInWithEmailAndPassword } from "firebase/auth"
    import { toast } from 'vue3-toastify'
    import 'vue3-toastify/dist/index.css'
    import VueTurnstile from 'vue-turnstile'

    const email = ref("")
    const password = ref("")
    const router = useRouter()
    const errMsg = ref("")
    const token = ref("")
    const loading = ref(false)
    const siteKey = process.env.VITE_CLOUDFLARE_SITE_KEY || ''

    const login = () => {
        loading.value = true
        const timeLogin = new Date();
        const expLogin = timeLogin.getTime() + (24 * 60 * 60 * 1000)
        const auth = getAuth();
        signInWithEmailAndPassword(auth, email.value, password.value)
        .then(() => {
            const checkLogin = {
                time: expLogin,
                isLoggedIn: true,
            }
            localStorage.setItem('checkLogin', JSON.stringify(checkLogin))
            router.push('/welcome');
        })
        .catch((error) => {
            switch (error.code) {
                case 'auth/invalid-email':
                    errMsg.value = 'Invalid email'
                    break
                case 'auth/user-not-found':
                    errMsg.value = 'No account with that email was found'
                    break
                case 'auth/wrong-password':
                    errMsg.value = 'Incorrect password'
                    break
                default:
                    errMsg.value = 'Email or password was incorrect'
                    break
            }
            toast.error(errMsg.value, {
              autoClose: 1600,
            });
        })
        .finally(() => {
            loading.value = false
        })
    }

</script>