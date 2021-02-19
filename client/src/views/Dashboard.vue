<template>
  <b-container fluid="lg">
    <!-- <SearchBar :ingredients=allIngredients @add-ingredient="updateList"></SearchBar> -->
    <SearchBar :ingredients=allIngredients @search-meals="searchMeals"></SearchBar>
    <SearchFilter @click="updateMealData" 
      :allMealCategories=allMealCategories 
      :allMealAreas=allMealAreas 
      :searchMealCategories=searchMealCategories
      :searchMealAreas=searchMealAreas
      :searched=searched
      @select-category="selectCategory"
      @select-area="selectArea">
    </SearchFilter>
    <SearchResult v-if="searched" 
      :searching=searchFlag :meals=meals 
      :selectedCategories=selectedMealCategories 
      :selectedAreas=selectedMealAreas
      :selectedIngrs=selectedIngredients>
    </SearchResult>
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
import { getMealsByIngredient, getMealDetailsById, getAllIngredients, getAllCategories, getAllAreas } from '@/themealdbConnector.js'

export default {
  name: 'Dashboard',
  
  components: {
    SearchBar: () => import('@/components/SearchBar'),
    // SelectedIngredients: () => import('@/components/SelectedIngredients'),
    IngredientVisualizer: () => import('@/components/IngredientVisualizer'),
    SearchResult: () => import('@/components/SearchResult.vue'),
    SearchFilter: () => import('@/components/SearchFilter.vue'),
  },

  data () {
    return {
      // mealData: [],
      allIngredients: [],
      searchFlag: false,
      searched: false,
      meals: [],
      allMealCategories: [],
      selectedMealCategories: [],
      allMealAreas: [],
      selectedMealAreas: [],
      selectedIngredients: [],
      // ingredient: ''
    }
  },
  created () {
    console.log('App loaded'),
    this.fetchAllIngredients(),
    this.updateMealData()
  },
  computed: {
    searchMealCategories () {
      const categorySet = new Set(this.meals.map(x => x.strCategory))
      return Array.from(categorySet).sort((a,b) => a.localeCompare(b))
    },
    searchMealAreas () {
      const areaSet = new Set(this.meals.map(x => x.strArea))
      return Array.from(areaSet).sort((a,b) => a.localeCompare(b))
    }
  },
  methods: {
    async fetchAllIngredients() {
      try {
        this.allIngredients = await getAllIngredients()
        this.allIngredients.sort((a,b) => a.strIngredient.localeCompare(b.strIngredient))
      } catch(error) {
        console.log('Error on fetchIngredients function:', error)
      }
    },
    async searchMeals(selIngrs) {
      this.searchFlag = true
      try {
        console.log('selIngrs: ', selIngrs)
        this.selectedIngredients = new Array(...selIngrs)
        const ingredients = new Array(...selIngrs)
        let i = ingredients.shift()
        let result = await getMealsByIngredient(i)
        while (ingredients.length) {
          i = ingredients.shift()
          let newMeals = await getMealsByIngredient(i)
          result = result.filter(x => newMeals.includes(x)) // intersection
        }
        if (result && result.length) {
          // for each meal it makes async and parallel requests for its datails
          result = await Promise.all(result.map(x => getMealDetailsById(x.idMeal)))
          this.meals = result
          // this.selectedIngredients = []
        } else {
          this.meals = []
        }
        setTimeout(() => {
          this.searchFlag = false
          this.searched = true
        })
      } catch (error) {
        console.log('Error on searchMeals function:', error)
      }
    },
    // Child event handling
    selectCategory (selectedCategories) {
      this.selectedMealCategories = selectedCategories
    },
    selectArea (selectedAreas) {
      this.selectedMealAreas = selectedAreas
    },
    async updateMealData() {
      try {
        const categories = await getAllCategories()
        const areas = await getAllAreas()
        const categorySet = new Set(categories.map(x => x.strCategory))
        const areaSet = new Set(areas.map(x => x.strArea))
        this.allMealCategories = Array.from(categorySet).sort((a,b) => a.localeCompare(b))
        this.allMealAreas = Array.from(areaSet).sort((a,b) => a.localeCompare(b))
      } catch (error) {
        console.log('Error while fetching category list\n', error)
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