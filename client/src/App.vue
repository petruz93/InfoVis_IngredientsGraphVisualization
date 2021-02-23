<template>
  <div id="app">
    <a role="button" aria-pressed="true">
      <img alt="App logo" src="@/assets/recipes-icon.png" @click="onClickReset('idle')">
    </a>
    <Dashboard :state=state></Dashboard>
  </div>
</template>

<script>
import Dashboard from './views/Dashboard.vue'

export default {
  name: 'App',
  components: {
    Dashboard
  },
  data() {
    return {
      state: "idle"
    }
  },
  methods: {
    onClickReset(state) {
      this.state = ''
      this.state = state
    }
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
