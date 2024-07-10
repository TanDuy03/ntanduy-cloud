<template>
  <div class="min-h-screen bg-gray-100">
    <nav class="bg-white border-b border-gray-100">
      <!-- Primary Navigation Menu -->
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center sm:items-stretch h-16">
          <div class="flex">
            <!-- Logo -->
            <div class="shrink-0 flex items-center">
              <a href="/welcome">
                <img src="https://laravel.com/img/logomark.min.svg" alt="logo" class="block h-9 w-auto">
              </a>
            </div>

            <!-- Navigation Links -->
            <div class="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">
              <a class="inline-flex items-center px-1 pt-1 border-b-2 border-indigo-400 text-sm font-medium leading-5 text-gray-900 focus:outline-none focus:border-indigo-700 transition duration-150 ease-in-out"
                href="/welcome">
                Dashboard
              </a>
            </div>
          </div>

          <div class="sm:flex sm:items-center sm:ms-6">
            <!-- Settings Dropdown -->
            <div class="ms-3 relative">
              <div class="flex justify-center">
                <div x-data="{
                    open: false,
                    toggle() {
                        if (this.open) {
                            return this.close()
                        }

                        this.$refs.button.focus()

                        this.open = true
                    },
                    close(focusAfter) {
                        if (! this.open) return

                        this.open = false

                        focusAfter && focusAfter.focus()
                    }
                }" x-on:keydown.escape.prevent.stop="close($refs.button)"
                  x-on:focusin.window="! $refs.panel.contains($event.target) && close()" x-id="['dropdown-button']"
                  class="relative">
                  <!-- Button -->
                  <button x-ref="button" x-on:click="toggle()" :aria-expanded="open" id="dropdown-button" type="button"
                    class="flex items-center gap-2 px-5 rounded-md">
                    <img class="h-8 w-8 rounded-full object-cover"
                      :src="photoURL || 'https://ui-avatars.com/api/?name=D&color=7F9CF5&background=EBF4FF'" :alt="displayName" />

                    <!-- Heroicon: chevron-down -->
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" viewBox="0 0 20 20"
                      fill="currentColor">
                      <path fill-rule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clip-rule="evenodd" />
                    </svg>
                  </button>

                  <!-- Panel -->
                  <div x-ref="panel" x-show="open" x-transition.origin.top.left x-on:click.outside="close($refs.button)"
                    id="dropdown-button" style="display: none"
                    class="absolute right-0 mt-3.5 w-44 rounded-md ring-1 ring-black ring-opacity-5 bg-white shadow-md">
                    <span
                      class="flex items-center gap-2 font-bold w-full first-of-type:rounded-t-md last-of-type:rounded-b-md px-4 py-2.5 text-left text-sm hover:bg-gray-50 disabled:text-gray-500">
                      {{ displayName || 'Unknown' }}
                    </span>
                    <div class="border-t border-gray-200"></div>
                    <button v-if="isLoggedIn" @click="logout"
                      class="text-red-600 flex items-center gap-2 w-full first-of-type:rounded-t-md last-of-type:rounded-b-md px-4 py-2.5 text-left text-sm hover:bg-gray-50 disabled:text-gray-500">
                      Logout
                    </button>
                    <router-link v-else
                      class=" flex items-center gap-2 w-full first-of-type:rounded-t-md last-of-type:rounded-b-md px-4 py-2.5 text-left text-sm hover:bg-gray-50 disabled:text-gray-500"
                      to="/login">Login</router-link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>

    <!-- Page Heading -->
    <header class="bg-white shadow">
      <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <h2 class="font-semibold text-xl text-gray-800 leading-tight">
          Dashboard
        </h2>
      </div>
    </header>

    <!-- Page Content -->
    <main>
      <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div class="bg-white overflow-hidden shadow-xl sm:rounded-lg">
            <div class="p-6 lg:p-8 bg-white border-b border-gray-200">
              <div class="flex gap-3 items-center">
                <img src="https://laravel.com/img/logomark.min.svg" alt="logo" class="block h-12 w-auto">
                <h3 class="text-3xl text-[#6875F5] font-bold">TanDuy03's
                  <span class="text-3xl font-normal text-gray-900">web application</span>
                </h3>
              </div>

              <h1 class="mt-8 text-2xl font-normal text-gray-500">
                Welcome <span class="text-gray-900 font-medium"> {{ displayName }} </span> back to the application!
              </h1>

              <p class="mt-6 text-gray-500 leading-relaxed">
                Laravel Jetstream provides a beautiful, robust starting point
                for your next Laravel application. Laravel is designed to help
                you build your application using a development environment that
                is simple, powerful, and enjoyable. We believe you should love
                expressing your creativity through programming, so we have spent
                time carefully crafting the Laravel ecosystem to be a breath of
                fresh air. We hope you love it.
              </p>
            </div>

            <div class="bg-gray-200 bg-opacity-25 grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 p-6 lg:p-8">
              <div>
                <div class="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    class="w-6 h-6 stroke-gray-400">
                    <path stroke-linecap="round" stroke-linejoin="round"
                      d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                  </svg>
                  <h2 class="ms-3 text-xl font-semibold text-gray-900">
                    <a href="https://laravel.com/docs">Documentation</a>
                  </h2>
                </div>

                <p class="mt-4 text-gray-500 text-sm leading-relaxed">
                  Laravel has wonderful documentation covering every aspect of
                  the framework. Whether you're new to the framework or have
                  previous experience, we recommend reading all of the
                  documentation from beginning to end.
                </p>
              </div>

              <div>
                <div class="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    class="w-6 h-6 stroke-gray-400">
                    <path stroke-linecap="round" stroke-linejoin="round"
                      d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                  </svg>
                  <h2 class="ms-3 text-xl font-semibold text-gray-900">
                    Reset Password
                  </h2>
                </div>

                <div class="flex mt-5 gap-3 flex-col md:flex-row">
                  <input type="password" placeholder="New password" v-model="newPassword" class="md:flex-1 block rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 
                  ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset 
                  focus:ring-indigo-600 outline-none sm:text-sm sm:leading-6 ps-2">
                  <button :disabled="newPassword == '' || newPassword.length < 6" :class="{'disabled-button' : newPassword == '' || newPassword.length < 6 }"  @click="resetPassword" class="flex flex-end items-center justify-center rounded-md mt-1 md:mt-0 bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 outline-none">
                    <span class="block py-2 loader" v-if="loading"></span>
                    <span v-else>Change Password</span>
                  </button>
                </div>
              </div>

              <div>
                <div class="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    class="w-6 h-6 stroke-gray-400">
                    <path stroke-linecap="round"
                      d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z" />
                  </svg>
                  <h2 class="ms-3 text-xl font-semibold text-gray-900">
                    <a href="https://laracasts.com">Laracasts</a>
                  </h2>
                </div>

                <p class="mt-4 text-gray-500 text-sm leading-relaxed">
                  Laracasts offers thousands of video tutorials on Laravel, PHP,
                  and JavaScript development. Check them out, see for yourself,
                  and massively level up your development skills in the process.
                </p>

              </div>

              <div>
                <div class="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    class="w-6 h-6 stroke-gray-400">
                    <path stroke-linecap="round" stroke-linejoin="round"
                      d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                  </svg>
                  <h2 class="ms-3 text-xl font-semibold text-gray-900">
                    <a href="https://tailwindcss.com/">Tailwind</a>
                  </h2>
                </div>

                <p class="mt-4 text-gray-500 text-sm leading-relaxed">
                  Laravel Jetstream is built with Tailwind, an amazing utility
                  first CSS framework that doesn't get in your way. You'll be
                  amazed how easily you can build and maintain fresh, modern
                  designs with this wonderful framework at your fingertips.
                </p>
              </div>

            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
  import { ref } from "vue"
  import { getAuth, signOut, onAuthStateChanged, updatePassword  } from "firebase/auth"
  import { useRouter } from "vue-router"
  import { toast } from 'vue3-toastify'
  import 'vue3-toastify/dist/index.css'

  const router = useRouter();
  const isLoggedIn = ref(false)
  const open = ref(false)
  const auth = getAuth()
  const displayName = ref("")
  const photoURL = ref("")
  const newPassword = ref("")
  const user = auth.currentUser
  const errMsg = ref("")
  const loading = ref(false)

  onAuthStateChanged(auth, (user) => {
    if (user) {
      isLoggedIn.value = true
      displayName.value = user.displayName
      photoURL.value = user.photoURL
    } else {
      isLoggedIn.value = false
    }
  });

  const logout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem("checkLogin");
      router.push("/login");
    } catch (error) {
      // console.error('Logout error:', error);
      throw error;
    }
  }

  const checkLogin = JSON.parse(localStorage.getItem('checkLogin'))
  const currTime = new Date()

  if(checkLogin.time <= currTime.getTime()) {
    localStorage.removeItem("checkLogin")
    router.push("/login")
  } else {
    router.push("/welcome")
  }

  const resetPassword = () => {

    loading.value = true
    const user = auth.currentUser

    updatePassword(user, newPassword.value).then(() => {
      
      logout()
      newPassword.value = ""
      router.push("/login");

      setTimeout(() => {
        toast.success("Reset password successfully", {
          autoClose: 1600
        })
      }, 500)
    }).catch((error) => {
      if(error.code == 'auth/requires-recent-login') {

        logout()
        router.push("/login")
        setTimeout(() => {
          toast.warning("Please login again", {
            autoClose: 1600
          })
        }, 500)

      } else {
        switch (error.code) {
          case "auth/weak-password":
            errMsg.value = "Password is too short"
            break;
          default:
            errMsg.value = "Invalid login session"
            break;
        }
        toast.error(error.message, {
          autoClose: 1600
        })
      }
    })
    .finally(() => {
      loading.value = false
    })
  }
</script>
