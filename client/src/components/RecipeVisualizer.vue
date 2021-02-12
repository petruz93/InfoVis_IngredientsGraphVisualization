<template>
    
</template>

<script>
export default {
  name: 'RecipeVisualizer',
  props: {
    meals: {
      required: true,
      type: Array,
      default: () => []
    },
  }

}
</script>