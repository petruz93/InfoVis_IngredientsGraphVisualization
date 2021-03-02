<template>
  <b-container fluid="lg">
    <SearchFilter
      class="ml-3"
      align="left"
      :allMealCategories=allMealCategories 
      :allMealAreas=allMealAreas 
      :searchMealCategories=searchMealCategories
      :searchMealAreas=searchMealAreas
      :state=state
      @click=updateMealData 
      @select-category=selectCategory
      @select-area=selectArea
      @miss-ingr-sort=sortMealsByMissIngr>
    </SearchFilter>
    <SearchBar 
      :allIngredients=allIngredients
      :selectedIngredients=selectedIngredients 
      @search-meals=searchMeals
      @clear=clear>
    </SearchBar>
    <RecipeVisualizer
      v-if="privateState==='expanded' || privateState==='cleanExpanded'"
      :meal=selectedMeal>
    </RecipeVisualizer>
    <SearchResult
      v-if="privateState==='searched' || privateState==='cleanSearch'"
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
      v-if="privateState==='idle'"
      :ingredients=allIngredients
      @ingr-search=selectIngr>
    </IngredientVisualizer>
  </b-container>
</template>


<script>
import { getMealsByIngredient, getMealDetailsById, getAllIngredients, getAllCategories, getAllAreas } from '@/themealdbConnector.js'
// import isEqual from 'lodash.isequal'

export default {
  name: 'SearchView',
  
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
      // searched: false,
      meals: [],
      selectedMeal: {},
      allMealCategories: [],
      selectedMealCategories: [],
      searchMealCategories: [],
      allMealAreas: [],
      selectedMealAreas: [],
      searchMealAreas: [],
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
    // searchMealCategories () {
    //   const categorySet = new Set(this.meals.map(x => x.strCategory))
    //   return Array.from(categorySet).sort((a,b) => a.localeCompare(b))
    // },
    // searchMealAreas () {
    //   const areaSet = new Set(this.meals.map(x => x.strArea))
    //   return Array.from(areaSet).sort((a,b) => a.localeCompare(b))
    // },
  },
  watch: {
    state: {
      deep: true,
      handler: function(newState) { 
        // if(this.state==='idle') {
        //   this.meals = []
        //   this.selectedIngredients.splice(0)
          this.updateSearchState(newState)
          // }
      }
    },
    privateState() {
      if(this.privateState==="idle") {
        this.meals = []
        this.selectedIngredients.splice(0)
    // } else if(this.privateState==="searched") {
    // } else if(this.privateState==="expanded") {
    // }
      }
    },
    meals () {
      const categorySet = new Set(this.meals.map(x => x.strCategory))
      this.searchMealCategories = Array.from(categorySet).sort((a,b) => a.localeCompare(b))
        // .map(cat => {
        //   const obj = {}
        //   obj.text = cat
        //   obj.value = cat
        //   return obj
        // })
      const areaSet = new Set(this.meals.map(x => x.strArea))
      this.searchMealAreas = Array.from(areaSet).sort((a,b) => a.localeCompare(b))
    }
  },
  methods: {
    reset() {
      // this.meals = []
      // this.selectedIngredients = []
      this.updateSearchState('idle')
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
            return found != undefined
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
          this.updateSearchState(state)
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
    clear () {
      console.log('lalala');
      // this.meals = []
      this.searchMealCategories = this.allMealCategories
      this.searchMealAreas = this.allMealAreas
      this.selectedIngredients.splice(0)
      if (this.privateState === 'searched') {
        // this.privateState = 'cleanSearch'
        this.updateSearchState('cleanSearch')
      } else if (this.privateState === 'expanded') {
        this.updateSearchState('cleanExpanded')
      }
      // this.updateSearchState(state)
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
    sortMealsByMissIngr(ascending) {
      if(ascending)
        this.meals.sort((a,b) => a.missing - b.missing)
      else
        this.meals.sort((a,b) => b.missing - a.missing)
    },
    updateSearchState(state) {
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