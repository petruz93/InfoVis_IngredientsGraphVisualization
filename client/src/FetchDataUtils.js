import axios from 'axios'


const getBaseURL = function () {
  return axios.create({
    baseURL: 'https://www.themealdb.com/api/json/v1/1/'
  })
}

async function getMealsByIngredient(ingredient) {
  try {
    const res = await getBaseURL().get(`filter.php?i=${ingredient}`)
    return res.data.meals
  } catch (error) {
    console.log(error)
    throw error
  }
}

async function getMealDetailsById(id) {
  try {
    const res = await getBaseURL().get(`lookup.php?i=${id}`)
    return res.data.meals
  } catch (error) {
    console.log(error)
    throw error
  }
}

async function getAllCategories() {
  try {
    const res = await getBaseURL().get(`list.php?c=list`)
    return res.data.meals
  } catch (error) {
    console.log(error)
    throw error
  }
}

async function getAllAreas() {
  try {
    const res = await getBaseURL().get(`list.php?a=list`)
    return res.data.meals
  } catch (error) {
    console.log(error)
    throw error
  }
}

async function getAllIngredients() {
  try {
    const res = await getBaseURL().get(`list.php?i=list`)
    return res.data.meals
  } catch (error) {
    console.log(error)
    throw error
  }
}

// https://www.themealdb.com/images/media/meals/llcbn01574260722.jpg/preview
// async function getMealImage() {
//   try {
//     const res = await getBaseURL().get(``)
//     return res.data.meals
//   } catch (error) {
//     console.log(error)
//     throw error
//   }
// }

// https://www.themealdb.com/images/ingredients/Lime-Small.png
function getIngrImageURL(ingr) {
  return `https://www.themealdb.com/images/ingredients/${ingr}.png`
}

function getSmallIngrImageURL(ingr) {
  return `https://www.themealdb.com/images/ingredients/${ingr}-small.png`
}


export {
  getMealsByIngredient,
  getAllCategories,
  getAllAreas, 
  getAllIngredients,
  getMealDetailsById,
  getIngrImageURL,
  getSmallIngrImageURL
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