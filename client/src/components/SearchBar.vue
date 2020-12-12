<template>
  <b-container>
    <div class="m-3 px-5">
      <!-- <label for="filt-ingr">Search meals</label><br>
      <b-input v-model="selectedIngredients"
        id="filt-ingr"
        placeholder="Search your ingredients"
      ></b-input> -->
      <v-select
        multiple
        v-model="selectedIngredients"
        label="strIngredient"
        :reduce="selectedIngredients=> selectedIngredients.strIngredient"
        :options="ingredients"
        @input="submitData"
        >
        <!--  
                multiple  -->
      <!-- <option value="selected hidden">Select one ingredient</option>
      <option v-for="i in allIngredients"
        :key=i.idIngredient
        >{{ i.strIngredient }}</option> 
                @search="fetchOptions"
        @input="submitData"
        -->
      </v-select>
      <!-- <b-button @click="submitData(selectedIngredients)" class="my-3">Submit</b-button> -->
    </div>
    <Result :meals=mealData />
  </b-container>
</template>

<script>
import { getMealsByIngredient } from '@/themealdbConnector.js'
import vSelect from 'vue-select'
import 'vue-select/dist/vue-select.css';

export default {
  name: 'SearchBar',
  props: {
    ingredients: {
      required: true,
      type: Array,
      default: () => {}
    }
  },
  components: { 
    Result: () => import('@/components/Result.vue'),
    vSelect
  },
  data () {
    return {
      mealData: [],
      selectedIngredients: '',
      prova: ['aaa','bbb','ccc']
    }
  },
  methods: {
    async submitData (ingredient) {
      try {
      this.mealData = await getMealsByIngredient(ingredient)
      } catch(error) {
        this.error = error.message
      }
    },
    async fetchOptions (search) {
       return this.ingredients[search]
    }
  }
}
</script>