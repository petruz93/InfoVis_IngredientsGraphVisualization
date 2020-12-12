<template>
  <div class="overflow-auto">
    <b-list-group horizontal>
      <b-list-group-item v-for="i in selectedList" :key="i" class="container-img">
        <img :alt="i" :src="imageURL(i)" class="ingr-img d-block">
        <b-button-close text-variant="danger" class="d-block"
          @click="removeElem(i)">&times;</b-button-close>
      </b-list-group-item>
    </b-list-group>
  </div>
</template>


<script>
import { getSmallIngrImageURL } from "@/themealdbConnector.js";

export default {
  name: 'SelectedIngredients',

  props: {
    selectedList: {
      type: Array
    }
  },

  data () {
    return {}
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

/* b-list-group {
  overflow-x: scroll;
}

.container-img {
  position: relative;
}

.container-img:hover .ingr-img {
  opacity: 0.5;
}

.overlay {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  height: 100%;
  width: 100%;
  opacity: 0;
  transition: .5s ease;
}

.container-img:hover .overlay {
  opacity: 1;
}

.text {
  color: black;
  font-size: 20px;
  position: absolute;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  text-align: center;
} */
</style>