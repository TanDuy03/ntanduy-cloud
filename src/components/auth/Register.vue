<template>
  <div class="flex min-h-full flex-col justify-center px-6 py-8 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <router-link to="/">
        <img
            class="mx-auto h-10 w-auto"
            src="/vite.svg"
            alt="Nguyen Tan Duy"
        />
      </router-link>
      <h2
        class="mt-4 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900"
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
        <div class="mt-7 mb-2">
          <button
            @click="register" :disabled="token === '' || token === undefined"
            :class="{'disabled-button' : token === '' || token === undefined}"
            type="submit"
            class="flex mb-3 w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 outline-none"
          >
            Sign up
          </button>
          <button
            type="submit" @click="signInGoogle"
            class="flex gap-3 w-full justify-center rounded-md transition-all duration-100 ease-in border border-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-indigo-600 shadow-sm hover:bg-indigo-600 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 outline-none"
          >
            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24" height="24" viewBox="0 0 48 48">
              <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
            </svg>
            Sign in with Google
          </button>
        </div>

        <p class="mt-4 text-center text-sm text-gray-500">
            Not a member?
            <router-link to="/login" class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">Start a 14 day free trial</router-link>
        </p>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref } from "vue"
  import { useRouter } from "vue-router"
  import { getAuth, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider  } from "firebase/auth"
  import { toast } from 'vue3-toastify'
  import 'vue3-toastify/dist/index.css'
  import VueTurnstile from 'vue-turnstile'

  const email = ref("")
  const password = ref("")
  const router = useRouter()
  const errMsg = ref()
  const token = ref("")
  const auth = getAuth()
  const register = () => {
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

  const signInGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
    .then((result) => {
      // // This gives you a Google Access Token. You can use it to access the Google API.
      // const credential = GoogleAuthProvider.credentialFromResult(result);
      // const token = credential.accessToken;
      // // The signed-in user info.
      localStorage.setItem('isLoggedIn', 'true')
      const user = result.user;
      console.log(user)
      router.push('/welcome')
      
    }).catch((error) => {
      // // Handle Errors here.
      const errorCode = error.code;
      // const errorMessage = error.message;
      console.log(errorCode)
      // // The email of the user's account used.
      // const email = error.customData.email;
      // // The AuthCredential type that was used.
      // const credential = GoogleAuthProvider.credentialFromError(error);
    });
  }

  const siteKey = import.meta.env.VITE_CLOUDFLARE_SITE_KEY

</script>
