<template>
  <b-container>
    <b-row class="justify-content-sm-center">
      <b-col md="8">
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
            <b-avatar :src="imageURL(strIngredient)"
                      icon="question"
                      variant="light"
                      size="lg"
                      class="mr-2 border border-dark"></b-avatar>
            <span class="mr-auto">{{ strIngredient }}</span>
          </template>
        </v-select>
      </b-col>
    </b-row>
      <!-- <b-button @click="submitData(selectedIngredients)" class="my-3">Submit</b-button> -->
    <SelectedIngredients :selectedList="selectedIngredients"></SelectedIngredients>
    <Result :meals=mealData />
  </b-container>
</template>


<script>
import vSelect from 'vue-select'
import 'vue-select/dist/vue-select.css'
import { getSmallIngrImageURL } from '@/themealdbConnector.js'

export default {
  name: 'SearchBar',

  components: {
    SelectedIngredients: () => import('@/components/SelectedIngredients'),
    Result: () => import('@/components/Result.vue'),
    vSelect
  },

  props: {
    ingredients: {
      required: true,
      type: Array,
      default: () => {}
    }
  },

  data () {
    return {
      mealData: [],
      selectedIngredients: []
    }
  },

  methods: {
    imageURL(ingr) {
      return getSmallIngrImageURL(ingr)
    }
    // async submitData (ingredient) {
    //   try {
    //   this.mealData = await getMealsByIngredient(ingredient)
    //   } catch(error) {
    //     console.log('Error on submitData function:', error)
    //   }
    // },
    // addToSelectedList(ingr) {
    //   this.$emit('add-ingredient', ingr)
    // },
    // async fetchOptions (search) {
    //    return this.ingredients[search]
    // }
  }
}
</script>