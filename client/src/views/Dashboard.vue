<template>
  <div class="">
    <!-- <form method="POST" action="">
      <label for="search">Search meals</label><br>
      <input type="text" id="search" name="search"><br>
      <input type="submit" value="Submit" 
        @click="fetchData">
    </form> -->
    <label for="search">Search meals</label><br>
    <input type="text" id="search" name="search" placeholder="search by ingredient"
      v-model="ingredient"><br>
    <button @click="fetchData(ingredient)">Submit</button>

    <Result 
      :meals=mealData>
    </Result>
    <!-- <Result meals="{{mealData}}"/> -->
  </div>
</template>


<script>
// import Result from '@/components/Result.vue'
import getMealsByIngredient from '@/FetchDataUtils.js'

export default {
  name: 'Dashboard',
  components: {
    Result: () => import('@/components/Result.vue')
  },
  data () {
    return {
      mealData: []
    }
  },
  created () {
    console.log('App loaded')
  },
  methods: {
    async fetchData (ingredient) {
      this.mealData = await getMealsByIngredient(ingredient)
    }
  }
}
/*
Search meal by name
https://www.themealdb.com/api/json/v1/1/search.php?s=Arrabiata

Lookup full meal details by id
https://www.themealdb.com/api/json/v1/1/lookup.php?i=52772

List all meal categories
https://www.themealdb.com/api/json/v1/1/categories.php

List all Categories, Area, Ingredients
https://www.themealdb.com/api/json/v1/1/list.php?a=list
https://www.themealdb.com/api/json/v1/1/list.php?i=list

Filter by main ingredient
https://www.themealdb.com/api/json/v1/1/filter.php?i=chicken_breast

Filter by Category
https://www.themealdb.com/api/json/v1/1/filter.php?c=Seafood

Filter by Area
https://www.themealdb.com/api/json/v1/1/filter.php?a=Canadian


Meal Thumbnail Images
Add /preview to the end of the meal image URL
https://www.themealdb.com/images/media/meals/llcbn01574260722.jpg/preview

Ingredient Thumbnail Images
https://www.themealdb.com/images/ingredients/Lime.png
https://www.themealdb.com/images/ingredients/Lime-Small.png
*/
</script>


<style>

</style>