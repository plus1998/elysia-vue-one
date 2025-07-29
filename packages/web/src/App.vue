<script setup lang="ts">
import { ref } from 'vue';
import { client } from "./rpc";
import { authClient } from './lib/auth';

const msg = ref('')

client.hi.get().then((res) => {
  msg.value = res?.data || 'error'
})

authClient.signIn.email({
  email: 'admin@plus.com',
  password: 'public'
}).then((res) => {
  console.log(res)
  client.demo.get({
    query: {
      name: 'demo'
    }
  }).then((res) => {
    console.log(res)
  })
})


</script>

<template>
  <div>
    <a href="https://vite.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
  </div>
  {{ msg }}
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
