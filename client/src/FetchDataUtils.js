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
async function getMealImage() {
  try {
    const res = await getBaseURL().get(``)
    return res.data.meals
  } catch (error) {
    console.log(error)
    throw error
  }
}

// https://www.themealdb.com/images/ingredients/Lime-Small.png
async function getIngredientImage() {
  try {
    const res = await getBaseURL().get(``)
    return res.data.meals
  } catch (error) {
    console.log(error)
    throw error
  }
}


export default {
  getMealsByIngredient,
  getAllCategories,
  getAllAreas, 
  getAllIngredients,
  getMealDetailsById,
  getMealImage,
  getIngredientImage
}