<template>
  <div id="app">
    <a role="button" aria-pressed="true">
    <!-- <a role="button" aria-pressed="true" href="">
      <img alt="App logo" src="@/assets/recipes-icon.png"> -->
      <img alt="App logo" src="@/assets/recipes-icon.png" @click="changeSearchState('idle')">
    </a>
    <SearchView 
      :state=searchState
      @search-state-change=changeSearchState>
    </SearchView>
  </div>
</template>

<script>
import SearchView from '@/views/SearchView.vue'

export default {
  name: 'App',
  components: {
    SearchView
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
