<template>
  <div id="app">
    <a role="button" aria-pressed="true">
      <img alt="App logo" src="@/assets/recipes-icon.png" @click="changeSearchState('idle')">
    </a>
    <Dashboard 
      :state=searchState
      @search-state-change=changeSearchState>
    </Dashboard>
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
      state: "startup",
      searchState: "idle"
    }
  },
  methods: {
    changeSearchState(state) {
      this.searchState = state
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
