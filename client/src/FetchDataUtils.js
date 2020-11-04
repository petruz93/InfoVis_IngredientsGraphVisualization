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

export default getMealsByIngredient