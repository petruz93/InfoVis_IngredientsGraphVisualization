<template>
  <b-container>
    <div v-if="meals.length==0">
      <em>Sorry, no meals found...<br>please try with different set of ingredients.</em>
    </div>
    <div v-else>
      <p>
        Meals found:<br>
        <ul>
          <li v-for="meal in meals" :key="meal.strMeal">
            <img :alt="meal.strMealThumb" :src="meal.strMealThumb" width="100px">
            {{meal.strMeal}}
          </li>
        </ul>
      </p>
    </div>
  </b-container>
</template>


<script>
export default {
  name: 'Result',

  props: {
    meals: {
      required: true,
      type: Array,
      default: () => []
    }
  },

  data () {
    return {}
  }
}
</script>