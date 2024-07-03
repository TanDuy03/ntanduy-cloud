<template>
  <div class="flex min-h-full flex-col justify-center px-6 py-10 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <router-link to="/">
        <img
            class="mx-auto h-10 w-auto"
            src="/vite.svg"
            alt="Nguyen Tan Duy"
        />
      </router-link>
      <h2
        class="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900"
      >
        Sign up to your account
      </h2>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-sm">
        <div class="mb-4">
          <label
            for="email"
            class="block text-sm font-medium leading-6 text-gray-900"
            >Email address</label
          >
          <div class="mt-2">
            <input
              id="email"
              name="email"
              type="email"
              autocomplete="email"
              required
              placeholder="example@gmail.com"
              class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 
              ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset 
              focus:ring-indigo-600 outline-none sm:text-sm sm:leading-6 ps-2"
              v-model="email"
            />
          </div>
        </div>

        <div class="mb-4">
          <div class="flex items-center justify-between">
            <label
              for="password"
              class="block text-sm font-medium leading-6 text-gray-900"
              >Password</label
            >
          </div>
          <div class="mt-2">
            <input
              id="password"
              name="password"
              type="password"
              autocomplete="current-password"
              required
              placeholder="Your password"
              class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 
              ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset 
              focus:ring-indigo-600 outline-none sm:text-sm sm:leading-6 ps-2"
              v-model="password"
            />
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
        <div class="mt-7 mb-3">
          <button
            @click="register"
            type="submit"
            class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 outline-none"
          >
            Sign up
          </button>
        </div>

        <p class="mt-6 text-center text-sm text-gray-500">
            Not a member?
            <router-link to="/login" class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">Start a 14 day free trial</router-link>
        </p>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref } from "vue"
  import { useRouter } from "vue-router"
  import { getAuth, createUserWithEmailAndPassword } from "firebase/auth"
  import { toast } from 'vue3-toastify'
  import 'vue3-toastify/dist/index.css'
  import VueTurnstile from 'vue-turnstile'

  const email = ref("")
  const password = ref("")
  const router = useRouter()
  const errMsg = ref()
  const token = ref("")
  const register = () => {
    const auth = getAuth()
    createUserWithEmailAndPassword(auth, email.value, password.value)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log(user)
            toast.success("Sign Up Success", {
              autoClose: 1600,
            }); 
            router.push("/welcome")
        })
        .catch((error) => {
          switch (error.code) {
            case 'auth/email-already-in-use':
              errMsg.value = 'Email already exists'
              break;
            case 'auth/invalid-email':
              errMsg.value = 'Email format is wrong'
              break;
            case 'auth/missing-email':
              errMsg.value = 'Email cannot be blank'
              break;
            case 'auth/missing-password':
              errMsg.value = 'Password cannot be blank'
              break;
            case 'auth/weak-password':
              errMsg.value = 'Password is too short'
              break;
            default:
              break;
          }
          toast.error(errMsg.value, {
            autoClose: 1600,
          });
        });
  };

  const siteKey = import.meta.env.VITE_CLOUDFLARE_SITE_KEY

</script>
