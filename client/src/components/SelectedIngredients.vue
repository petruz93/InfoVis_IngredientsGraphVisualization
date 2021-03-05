<template>
  <div class="overflow-auto">
    <b-list-group horizontal>
      <b-list-group-item v-for="i in selectedList" :key="i" class="inner-list-item">
        <img :alt="i" :src="imageURL(i)" class="ingr-img d-block">
        <b-button-close text-variant="danger" class="d-block btn-close"
          @click="removeElem(i)">&times;</b-button-close>
      </b-list-group-item>
    </b-list-group>
  </div>
</template>


<script>
import { getSmallIngrImageURL } from "@/themealdbConnector.js"

export default {
  name: 'SelectedIngredients',

  props: {
    selectedList: {
      type: Array
    }
  },

  methods: {
    imageURL(ingr) {
      return getSmallIngrImageURL(ingr)
    },
    removeElem(ingr) {
      this.selectedList.splice(this.selectedList.indexOf(ingr), 1)
    }
  }
}
</script>


<style scoped>
.ingr-img {
  height: 100px;
  width: 100px;
}

.inner-list-item {
  background-color: var(--black-474747);
}

.btn-close {
  opacity: 1;
}
</style>