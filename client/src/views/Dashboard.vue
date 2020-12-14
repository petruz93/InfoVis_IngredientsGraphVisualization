<template>
  <b-container fluid="md">
    <!-- <div class="m-3 px-5">
      <label for="filt-ingr">Search meals</label><br>
      <b-input v-model="ingredient"
        id="filt-ingr"
        placeholder="Search your ingredients"
      ></b-input>
      <b-button @click="fetchData(ingredient)" class="my-3">Submit</b-button>
    </div> -->
    <!-- <SearchBar :ingredients=allIngredients @add-ingredient="updateList"></SearchBar> -->
    <SearchBar :ingredients=allIngredients></SearchBar>
    <!-- <select v-model="ingredient">
      <option value="" selected hidden>Select one ingredient</option>
      <option v-for="i in allIngredients"
        :key=i.idIngredient
        >{{ i.strIngredient }}</option>
    </select> -->

    <!-- <SelectedIngredients :selectedList="selectedIngredients"></SelectedIngredients> -->

    <!-- <Result 
      :meals=mealData>
    </Result> -->

<!-- visualizzazione degli ingredienti in ordine alfabetico -->
    <hr>
    <IngredientVisualizer :ingredients=allIngredients></IngredientVisualizer>

<!-- visualizzazione degli ingredienti. provvisoria. -->
    <!-- <hr>
    <div>
      <div v-if="!filteredIngredients.length && allIngredients.length">
        <em>No ingredients found...</em>
      </div>
      <ul>
        <li v-for="i in filteredIngredients" :key="i.idIngredient"
            @click="updateList(i.strIngredient)">
          <div>
            {{ i.strIngredient }}
          </div>
          <div>
            <img :alt="i.strIngredient" :src="imageURL(i.strIngredient)"
                class="ingr-img border border-secondary">
          </div>
        </li>
      </ul>
    </div> -->
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
    IngredientVisualizer: () => import('@/components/IngredientVisualizer')
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