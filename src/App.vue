<script setup>
import MainComponent from './components/MainComponent.vue'
</script>

<template>
  <div>
      <img src="/vite.svg" class="logo" alt="Vite logo" width="36" />
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" width="36" />
  </div>
  <div>
    <img src="https://davideperrotta.files.wordpress.com/2023/02/1674320392926.jpeg?w=372" width="120" class="avatar" alt="avatar" />
  </div>
  <MainComponent msg="Davide Perrotta" />
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
