<template>
  <div class="">
    <label for="search">Search meals</label><br>
    <input type="text" id="search" placeholder="search by ingredient"
      v-model="ingredient">
    <br>
    <select v-model="ingredient">
      <option value="" selected hidden>Select one ingredient</option>
      <option v-for="i in ingredientData"
        :key=i.idIngredient
        >{{ i.strIngredient }}</option>
    </select>
    <p v-if="error">{{ error }}</p>
    <button @click="fetchData(ingredient)">Submit</button>
    <div>selected ingredients: {{ selectedIngredients }}</div>

    <Result v-if="mealData.length"
      :meals=mealData>
    </Result>

    <hr>
    <div>
      <ul>
        <li v-for="i in ingredientData" :key=i.idIngredient
            @click="updateList(i.strIngredient)">
          <div>
            {{ i.strIngredient }}
          </div>
          <div>
            <img :alt="i.strIngredient" :src="imageURL(i.strIngredient)"
                width="100px" class="ingr-img">
          </div>
          
        </li>
      </ul>
    </div>
  </div>
</template>


<script>
// import Result from '@/components/Result.vue'
import {getMealsByIngredient, getAllIngredients, getSmallIngrImageURL} from '@/FetchDataUtils.js' 

export default {
  name: 'Dashboard',
  components: {
    Result: () => import('@/components/Result.vue')
  },

  data () {
    return {
      mealData: [],
      ingredientData: [],
      selectedIngredients: [],
      ingredient: '',
      error: null
    }
  },

  created () {
    console.log('App loaded'),
    this.fetchIngredients()
  },

  methods: {
    async fetchData (ingredient) {
      try {
      this.mealData = await getMealsByIngredient(ingredient)
      } catch(error) {
        this.error = error.message
      }
    },
    async fetchIngredients() {
      try {
        this.ingredientData = await getAllIngredients()
        this.ingredientData.sort((a,b) => a.strIngredient.localeCompare(b.strIngredient))
      } catch(error) {
        this.error = error.message
      }
    },
    imageURL(ingr) {
      return getSmallIngrImageURL(ingr)
    },
    updateList(ingr) {
      if (!this.selectedIngredients.includes(ingr))
        this.selectedIngredients.push(ingr)
    }
  }
}
</script>


<style>
  ul {
    list-style-type: none;
    margin: 20;
    padding: 0;
    overflow: hidden;
  }

  li {
    float: left;
    display: block;
    color: black;
    text-align: center;
    padding: 16px;
    width: 20%;
    min-width: 100px;
    max-width: 200px;
    text-decoration: none;
  }

  li:hover {
    background-color: #f5f1f1;
  }

  .ingr-img {
    border: 1px solid;
  }
</style>