<script setup lang="ts">
import { ref } from 'vue';
import { client } from "./rpc";

const msg = ref('')

client.hi.get().then((res) => {
  msg.value = res.data || 'error'
})

// client.auth.register.post({
//     username: 'test',
//     email: 'test@gmail.com',
//     password: 'Super123456'
// }).then((res) => {
//   console.log(res)
// })

client.auth.login.post({
    email: 'test@gmail.com',
    password: 'Super123452'
}).then((res) => {
  console.log(res)
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
