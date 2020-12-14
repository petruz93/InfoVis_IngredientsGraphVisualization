<template>
  <b-container>
    <div class="m-3 px-5">
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
      </v-select>
      <!-- <b-button @click="submitData(selectedIngredients)" class="my-3">Submit</b-button> -->
    </div>
    <SelectedIngredients :selectedList="selectedIngredients"></SelectedIngredients>
    <Result :meals=mealData />
  </b-container>
</template>


<script>
import { getMealsByIngredient } from '@/themealdbConnector.js'
import vSelect from 'vue-select'
import 'vue-select/dist/vue-select.css';

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
    async submitData (ingredient) {
      try {
      this.mealData = await getMealsByIngredient(ingredient)
      } catch(error) {
        console.log('Error on submitData function:', error)
      }
    }
    // addToSelectedList(ingr) {
    //   this.$emit('add-ingredient', ingr)
    // },
    // async fetchOptions (search) {
    //    return this.ingredients[search]
    // }
  }
}
</script>