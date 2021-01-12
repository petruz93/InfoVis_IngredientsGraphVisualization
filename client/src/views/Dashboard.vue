<template>
  <b-container fluid="lg">
    <!-- <SearchBar :ingredients=allIngredients @add-ingredient="updateList"></SearchBar> -->
    <SearchBar :ingredients=allIngredients></SearchBar>

    <!-- <SelectedIngredients :selectedList="selectedIngredients"></SelectedIngredients> -->
    <!-- <Result 
      :meals=mealData>
    </Result> -->

    <hr>
    <!-- visualizzazione degli ingredienti in ordine alfabetico -->
    <IngredientVisualizer :ingredients=allIngredients></IngredientVisualizer>
  </b-container>
</template>


<script>
import { getAllIngredients } from '@/themealdbConnector.js' 

export default {
  name: 'Dashboard',
  
  components: {
    SearchBar: () => import('@/components/SearchBar'),
    // SelectedIngredients: () => import('@/components/SelectedIngredients'),
    // Result: () => import('@/components/Result.vue'),
    IngredientVisualizer: () => import('@/components/IngredientVisualizer'),
  },

  data () {
    return {
      // mealData: [],
      allIngredients: [],
      // selectedIngredients: [],
      // ingredient: ''
    }
  },

  created () {
    console.log('App loaded'),
    this.fetchIngredients()
  },

  methods: {
    // async fetchData (ingredient) {
    //   try {
    //   this.mealData = await getMealsByIngredient(ingredient)
    //   } catch(error) {
    //     console.log('Error on fetchData function:', error)
    //   }
    // },
    async fetchIngredients() {
      try {
        this.allIngredients = await getAllIngredients()
        this.allIngredients.sort((a,b) => a.strIngredient.localeCompare(b.strIngredient))
      } catch(error) {
        console.log('Error on fetchIngredients function:', error)
      }
    },
  //   imageURL(ingr) {
  //     return getSmallIngrImageURL(ingr)
  //   },
  //   updateList(ingr) {
  //     if (!this.selectedIngredients.includes(ingr))
  //       this.selectedIngredients.push(ingr)
  //     // else this.selectedIngredients.splice(this.selectedIngredients.indexOf(ingr), 1)
  //   }
  },

  // computed: {
  //   filteredIngredients () {
  //     return this.allIngredients.filter(i => {
  //       return i.strIngredient.toLowerCase().includes(this.ingredient.toLowerCase())
  //     })
  //   }
  // }
}
</script>


<style scoped>
  .ingr-img {
    height: 100px;
    width: 100px;
  }
</style>
<style>
  /* ul {
    list-style-type: none;
    margin: 20;
    padding: 0;
    overflow: hidden;
    display: inline-block;
  }

  li {
    float: left;
    color: black;
    text-align: center;
    padding: 16px;
    width: 20%;
    min-width: 100px;
    text-decoration: none;
  }

  li:hover {
    background-color: #f5f1f1;
  } */
</style>