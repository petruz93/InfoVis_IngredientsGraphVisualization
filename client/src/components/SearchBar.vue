<template>
  <b-container>
    <b-row cols="1" cols-sm="2" cols-md="12"  class="mb-2">
      <b-col cols="12" sm="8" md="9" lg="10" align-self="center">
        <v-select multiple
          v-model="selectedIngredients"
          label="strIngredient"
          :reduce="i => i.strIngredient"
          :options="ingredients"
          placeholder="Choose your ingredients">
          <!--  
          @input="addToSelectedList"
          @input="submitData"
            -->
          <template #option="{ strIngredient }">
            <b-img-lazy :src="imageURL(strIngredient)"
                        rounded="circle"
                        blank-color="#f8f9fa"
                        width="55%"
                        class="mr-2 border border-dark bg-light"></b-img-lazy>
            <!-- <b-avatar :src="imageURL(strIngredient)"
                      icon="question"
                      variant="light"
                      size="lg"
                      class="mr-2 border border-dark"></b-avatar> -->
            <span class="mr-auto">{{ strIngredient }}</span>
          </template>
        </v-select>
      </b-col>
      <b-col cols="12" sm="4" md="3" lg="2" align-self="center">
        <b-button variant="success" @click="searchMeals(selectedIngredients)">
          <b-icon icon="search" class="mr-2"></b-icon>
          <span>Search</span>
        </b-button>
      </b-col>
    </b-row>
      
    <SelectedIngredients v-if="selectedIngredients.length" :selectedList="selectedIngredients"></SelectedIngredients>
    <Result v-if="searchFlag" :meals=meals></Result>
  </b-container>
</template>


<script>
import vSelect from 'vue-select'
import 'vue-select/dist/vue-select.css'
import { getSmallIngrImageURL, getMealsByIngredient } from '@/themealdbConnector.js'

export default {
  name: 'SearchBar',

  components: {
    vSelect,
    SelectedIngredients: () => import('@/components/SelectedIngredients'),
    Result: () => import('@/components/Result.vue')
  },

  props: {
    ingredients: {
      required: true,
      type: Array,
      default: () => []
    }
  },

  data () {
    return {
      selectedIngredients: [],
      meals: [],
      searchFlag: false
    }
  },

  methods: {
    imageURL(ingr) {
      return getSmallIngrImageURL(ingr)
    },
    async searchMeals(selectedd) {
      try {
        const ingrList = new Array(...selectedd)
        let i = ingrList.shift()
        let result = await getMealsByIngredient(i)
        while (ingrList.length) {
          i = ingrList.shift()
          let newMeals = await getMealsByIngredient(i)
          result = result.filter(x => newMeals.includes(x)) // intersection
        }
        if (result && result.length) {
          this.meals = result
          this.selectedIngredients = []
        } else {
          this.meals = []
        }
        this.searchFlag = true
      } catch (error) {
        console.log('Error on searchMeals function:', error)
      }
    }
    // addToSelectedList(ingr) {
    //   this.$emit('add-ingredient', ingr)
    // }
  }
}
</script>