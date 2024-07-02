<template>
  <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <router-link to="/">
        <img
            class="mx-auto h-10 w-auto"
            src="/vite.svg"
            alt="Nguyen Tan Duy"
        />
      </router-link>
      <h2
        class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900"
      >
        Sign in to your account
      </h2>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <div class="mb-5">
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
              class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 
              ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset 
              focus:ring-indigo-600 outline-none sm:text-sm sm:leading-6 ps-2"
              v-model="email"
            />
          </div>
        </div>

        <div class="mb-5">
          <div class="flex items-center justify-between">
            <label
              for="password"
              class="block text-sm font-medium leading-6 text-gray-900"
              >Password</label
            >
            <div class="text-sm">
              <a
                href="#"
                class="font-semibold text-indigo-600 hover:text-indigo-500"
                >Forgot password?</a
              >
            </div>
          </div>
          <div class="mt-2">
            <input
              id="password"
              name="password"
              type="password"
              autocomplete="current-password"
              required
              class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 
              ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset 
              focus:ring-indigo-600 outline-none sm:text-sm sm:leading-6 ps-2"
              v-model="password"
            />
          </div>
        </div>

        <div class="mt-7 mb-3">
          <button
            @click="register"
            type="submit"
            class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Sign in
          </button>
        </div>

        <p class="mt-8 text-center text-sm text-gray-500">
            Not a member?
            <a
            href="#"
            class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >Start a 14 day free trial</a
            >
        </p>
    </div>
  </div>
</template>

<script setup>
    import { ref } from "vue";
    import { useRouter } from "vue-router";
    import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
    const email = ref("");
    const password = ref("");
    const router = useRouter();
    const register = () => {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email.value, password.value)
        .then((userCredential) => {
            const user = userCredential.user;
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(error);
        });
    };
</script>
