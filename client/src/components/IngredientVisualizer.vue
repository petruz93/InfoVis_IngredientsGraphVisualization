<template>
  <div>
    <b-list-group flush>
      <b-list-group-item v-for="(list, letter) in alphabeticalIngredients" :key=letter>
        <h3 class="text-left">{{ letter }}</h3>
        <b-list-group horizontal class="overflow-auto">
          <b-list-group-item v-for="i in list" :key="i">
            <a href="#" class="text-dark">
              <img :alt="i" :src="imageURL(i)" class="ingr-img d-block">
              <div class="d-block">{{ i }}</div>
            </a>
          </b-list-group-item>
        </b-list-group>
      </b-list-group-item>
    </b-list-group>
  </div>
</template>


<script>
import { getSmallIngrImageURL } from "@/themealdbConnector.js";

export default {
  name: "IngredientVisualizer",

  props: {
    ingredients: {
      required: true,
      type: Array,
      default: () => [],
    }
  },

  data() {
    return {}
  },

  methods: {
    imageURL(ingr) {
      return getSmallIngrImageURL(ingr)
    }
  },

  computed: {
    alphabeticalIngredients () {
      const abIngredients = new Object()
      for (const c of this.ingredients) {
        const ingrName = c.strIngredient
        const initial = ingrName.charAt(0)
        if (!Object.prototype.hasOwnProperty.call(abIngredients, initial)) {
          abIngredients[initial] = []
        }
        abIngredients[initial].push(ingrName)
      }
      return abIngredients
    }
  }
}
</script>


<style scoped>
.ingr-img {
  height: 100px;
  width: 100px;
}
</style>