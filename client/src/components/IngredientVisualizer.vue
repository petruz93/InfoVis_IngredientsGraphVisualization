<template>
  <div>
    <div v-if="selectedIngredients!=={}">
      <v-for="i in selectedIngredients">
        
        {{this.selectedIngredients.strIngredient}}
    </div>
  </div>
</template>

<script>
export default {
  name: "IngredientVisualizer",
  props: {
    selectedIngredients: {
      required: true,
      type: Object,
      default: () => {},
    },
    selectedIngredientImgs: {},
  },
  data() {},
  computed: {
    prepareData() {
      selectedIngredients;
    },
  },
};
</script>
