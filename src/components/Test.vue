<script lang="ts">
import VueTurnstile from 'vue-turnstile';

export default {
  components: { VueTurnstile },

  data() {
    return {
      token: '',
    };
  },
};
</script>

<template>
  <div>
    <vue-turnstile site-key="1x00000000000000000000AA" v-model="token" />
    <div>Token: {{ token }}</div>
  </div>
</template>