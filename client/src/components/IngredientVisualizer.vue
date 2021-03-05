<template>
  <div>
    <b-list-group>
      <b-list-group-item v-for="(list, letter) in alphabeticalIngredients" :key=letter>
        <h3 class="text-left">{{ letter }}</h3>
        <b-list-group horizontal class="overflow-auto">
          <b-list-group-item v-for="i in list" :key="i" class="inner-list-item" align="center">
              <a @click=searchByIngredient(i) role="button" aria-pressed="true" class="text-theme">
                <b-img-lazy :alt="i" :src="imageURL(i)" class="ingr-img d-block"></b-img-lazy>
              </a>
              <div class="d-block">
                <a @click=searchByIngredient(i) role="button" aria-pressed="true">{{ i }}</a>
              </div>
          </b-list-group-item>
        </b-list-group>
      </b-list-group-item>
    </b-list-group>
    <hr class="my-5">
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
  },
  methods: {
    imageURL(ingr) {
      return getSmallIngrImageURL(ingr)
    },
    searchByIngredient(ingr) {
      this.$emit('ingr-search', ingr, "searched")
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
</style>  