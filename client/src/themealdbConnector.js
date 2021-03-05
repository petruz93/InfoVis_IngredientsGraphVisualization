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
    return res.data.meals[0]
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