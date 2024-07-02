<template>
    <div>
        <h1>Hello, welcome to TanDuy03</h1>

        <span v-if="isLogin">
            <button @click="logout">Logout</button>
        </span>
    </div>
</template>

<script setup>
    import { ref, watchEffect } from 'vue' 
    import { getAuth, onAuthStateChanged, signOut  } from "firebase/auth"
    import { useRouter } from 'vue-router'

    const router = useRouter()
    const isLogin = ref(true)
    const auth = getAuth()

    onAuthStateChanged(auth, (user) => {
        if (user) {
            const uid = user.uid
            isLogin.value = true
        } else {
            isLogin.value = false
        }
    });

    const logout = () => {
        signOut(auth).then(() => {
            localStorage.removeItem('isLogin')
            router.push("/")
            // console.log("Logout successful")
        }).catch(() => {
            console.log("Logout fail");
        })
    }
</script>