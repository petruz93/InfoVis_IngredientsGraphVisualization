<template>
  <div id="app">
    <a href="/">
      <img alt="App logo" src="@/assets/recipes-icon.png">
    </a>
    <Dashboard msg="Welcome to RecipAdvisor"></Dashboard>
  </div>
</template>

<script>
import Dashboard from './views/Dashboard.vue'

export default {
  name: 'App',
  components: {
    Dashboard
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  /* color: #FEFFA3;
  background: #151515; */
}
</style>
