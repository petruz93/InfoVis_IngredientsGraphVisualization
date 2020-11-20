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

<style>
  ul {
    list-style-type: none;
    margin: 20;
    padding: 0;
    overflow: hidden;
  }

  li {
    float: left;
    display: block;
    color: black;
    text-align: center;
    padding: 16px;
    width: 20%;
    min-width: 100px;
    max-width: 200px;
    text-decoration: none;
  }

  li:hover {
    background-color: #f5f1f1;
  }

  .ingr-img {
    border: 1px solid;
  }
</style>