<template>
  <div>
    <p>
      Meals founded:<br>
      <ul>
        <li v-for="meal in meals" :key="meal.strMeal">
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