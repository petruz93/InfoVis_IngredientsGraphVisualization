<template>
<div>
  <b-container>
    <b-row cols="1" cols-sm="2" cols-md="12"  class="mb-2">
      <b-col cols="12" sm="8" md="9" align-self="center">
        <v-select multiple
          v-model="selectedIngredientsData"
          label="strIngredient"
          :reduce="i => i.strIngredient"
          :options="allIngredients"
          placeholder="Choose your ingredients"
        >
          <!--  
          @input="addToSelectedList"
          @input="submitData"
            -->
          <template #option="{ strIngredient }">
            <b-img-lazy :src="imageURL(strIngredient)"
                        rounded="circle"
                        blank-color="#FEFFA3"
                        width="55%"
                        class="mr-2 border border-dark bg-light"></b-img-lazy>
            <!-- <b-avatar :src="imageURL(strIngredient)"
                      icon="question"
                      variant="light"
                      size="lg"
                      class="mr-2 border border-dark"></b-avatar> -->
            <span class="mr-auto text-theme">{{ strIngredient }}</span>
          </template>
        </v-select>
      </b-col>
      <b-col cols="12" sm="4" md="3" align-self="center">
        <!-- <b-button variant="primary" @click="searchMeals(selectedIngredients)"> -->
        <b-button variant="primary" @click="onClickSearch(selectedIngredientsData)">
          <b-icon icon="search" class="mr-2"></b-icon>
          <span>Find Recipes</span>
        </b-button>
        <b-button variant="primary" class="ml-3" @click="onClickClear()"> 
          <span>Clear</span>
        </b-button>
      </b-col>
    </b-row>
    <b-row>
    </b-row>
    <SelectedIngredients v-if=selectedIngredientsData.length :selectedList=selectedIngredientsData></SelectedIngredients>
  </b-container>
  <!-- <SearchResult v-if="searched" :searching=searchFlag :meals=meals></SearchResult> -->
  <!-- <SearchFilter :meals=meals></SearchFilter> -->
</div>
</template>


<script>
import vSelect from 'vue-select'
// import 'vue-select/dist/vue-select.css'
import { getSmallIngrImageURL } from '@/themealdbConnector.js'

export default {
  name: 'SearchBar',

  components: {
    vSelect,
    SelectedIngredients: () => import('@/components/SelectedIngredients'),
    // SearchResult: () => import('@/components/SearchResult.vue'),
    // SearchFilter: () => import('@/components/SearchFilter')
  },

  props: {
    allIngredients: {
      required: true,
      type: Array,
      default: () => []
    },
    selectedIngredients: {
      type: Array,
      default: () => []
    }
  },

  data () {
    return {
      meals: [],
      searchFlag: false,
      selectedIngredientsData: this.selectedIngredients
    }
  },

  methods: {
    imageURL(ingr) {
      return getSmallIngrImageURL(ingr)
    },
    onClickSearch(selIngrs) {
        this.$emit('search-meals', selIngrs, "searched")
    },
    onClickClear() {
      this.selectedIngredientsData = []
      this.$emit('reset-filters')
    }
    // async searchMeals(selectedd) {
    //   this.searchFlag = true
    //   try {
    //     const ingrList = new Array(...selectedd)
    //     let i = ingrList.shift()
    //     let result = await getMealsByIngredient(i)
    //     while (ingrList.length) {
    //       i = ingrList.shift()
    //       let newMeals = await getMealsByIngredient(i)
    //       result = result.filter(x => newMeals.includes(x)) // intersection
    //     }
    //     if (result && result.length) {
    //       // for each meal it makes async and parallel requests for datails
    //       result = await Promise.all(result.map(x => getMealDetailsById(x.idMeal)))
    //       this.meals = result
    //       this.selectedIngredients = []
    //     } else {
    //       this.meals = []
    //     }
    //     setTimeout(() => {
    //       this.searchFlag = false
    //       this.searched = true
    //     })
    //   } catch (error) {
    //     console.log('Error on searchMeals function:', error)
    //   }
    // }
    // addToSelectedList(ingr) {
    //   this.$emit('add-ingredient', ingr)
    // }
  },

}
</script>

<style>
/* :root {
  --primary: #7391BC
} */
</style>