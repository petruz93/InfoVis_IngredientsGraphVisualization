<template>
  <div v-if="meals.length">
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
</template>

<script>
export default {
  name: 'Result',
  props: {
    meals: {
      required: true,
      type: Array,
      default: () => {}
    }
  },
  data () {
    return {
    }
  }
}
</script>