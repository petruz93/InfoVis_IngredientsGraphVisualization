<template>
  <b-container fluid="lg">
    <SearchBar 
      :allIngredients=allIngredients
      :selectedIngredients=selectedIngredients 
      @search-meals=searchMeals
      @reset-filters=resetFilters>
    </SearchBar>
    <SearchFilter
      :allMealCategories=allMealCategories 
      :allMealAreas=allMealAreas 
      :searchMealCategories=searchMealCategories
      :searchMealAreas=searchMealAreas
      :state=state
      @click=updateMealData 
      @select-category=selectCategory
      @select-area=selectArea>
    </SearchFilter>
    <RecipeVisualizer
      v-if="privateState==='expanded'" 
      :meal=selectedMeal
      :state=state>
    </RecipeVisualizer>
    <SearchResult
      v-if="privateState==='searched'"
      :searching=searchFlag
      :meals=meals 
      :selectedCategories=selectedMealCategories 
      :selectedAreas=selectedMealAreas
      :selectedIngrs=selectedIngredients
      @expand-recipe=selectMeal>
    </SearchResult>

    <hr>
    <!-- visualizzazione degli ingredienti in ordine alfabetico -->
    <IngredientVisualizer
      v-if="state==='idle'"
      :ingredients=allIngredients
      @ingr-search=selectIngr>
    </IngredientVisualizer>
  </b-container>
</template>


<script>
import { getMealsByIngredient, getMealDetailsById, getAllIngredients, getAllCategories, getAllAreas } from '@/themealdbConnector.js'
import isEqual from 'lodash.isequal'

export default {
  name: 'Dashboard',
  
  components: {
    SearchBar: () => import('@/components/SearchBar'),
    // SelectedIngredients: () => import('@/components/SelectedIngredients'),
    IngredientVisualizer: () => import('@/components/IngredientVisualizer'),
    SearchResult: () => import('@/components/SearchResult.vue'),
    SearchFilter: () => import('@/components/SearchFilter.vue'),
    RecipeVisualizer: () => import('@/components/RecipeVisualizer.vue'),
  },

  props: {
    state: {
      required: true,
      type: String
    }
  },

  data () {
    return {
      // mealData: [],
      allIngredients: [],
      searchFlag: false,
      searched: false,
      meals: [],
      selectedMeal: {},
      allMealCategories: [],
      selectedMealCategories: [],
      allMealAreas: [],
      selectedMealAreas: [],
      selectedIngredients: [],
      privateState: 'idle'
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
    },
  },
  watch: {
    state: {
      deep: true,
      handler: function(newState) { this.updateState(newState)}
    },
    privateState() {
      if(this.privateState==="idle") {
        this.meals = []
        this.selectedIngredients.splice(0)
      // } else if(this.privateState==="searched") {
      // } else if(this.privateState==="expanded") {
      // }
      }
    }
  },
  methods: {
    reset() {
      this.meals = []
      this.selectedIngredients = []
      this.updateState('idle')
    },
    async fetchAllIngredients() {
      try {
        this.allIngredients = await getAllIngredients()
        this.allIngredients.sort((a,b) => a.strIngredient.localeCompare(b.strIngredient))
      } catch(error) {
        console.log('Error on fetchIngredients function:', error)
      }
    },
    async searchMeals(selIngrs, state) {
      this.searchFlag = true
      try {
        this.selectedIngredients = new Array(...selIngrs)
        const ingredients = new Array(...selIngrs)
        let i = ingredients.shift()
        let result = await getMealsByIngredient(i)
        while (ingredients.length) {
          i = ingredients.shift()
          let newMeals = await getMealsByIngredient(i)
          result = result.filter(x => {
            const found = newMeals.find(el => el.idMeal == x.idMeal)
            return isEqual(x, found)
          }) // intersection
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
          this.updateState(state)
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
    selectMeal(selectedMeal, state) {
      this.selectedMeal = selectedMeal
      this.privateState = state
    },
    selectIngr(selectedIngr, state) {
      this.selectedIngredients = []
      this.selectedIngredients.push(selectedIngr)
      this.searchMeals(this.selectedIngredients, state)
    },
    resetFilters () {
      this.reset()
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
    updateState(state) {
      this.privateState = state
      this.$emit('search-state-change', state)
    }
  },
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