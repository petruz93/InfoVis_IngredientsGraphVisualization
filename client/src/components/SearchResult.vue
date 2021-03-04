<template>
  <b-container fluid="md">
    <b-overlay :show="searching" variant="dark" class="my-4">
      <div>
        <div v-if="filteredMeals.length==0">
          <em>Sorry, no meals were found...<br>please try with different set of ingredients or filters.</em>
        </div>
        <div v-else>
          <h3>Meals found:</h3>
          <b-card-group deck class="d-block">
            <b-card v-for="meal in filteredMeals" :key="meal.strMeal"
              no-body class="my-3"
            >
              <b-row no-gutters>
                <b-col cols="12" sm="6" md="5">
                  <a @click=expandRecipe(meal) role="button" aria-pressed="true">
                    <b-card-img :src="meal.strMealThumb" left width="100%" class="rounded-0"></b-card-img>
                  </a>
                </b-col>
                <b-col cols="12" sm="6" md="7">
                  <b-card-body class="text-left">
                    <b-card-title style="color: var(--green-theme)">
                      <a @click=expandRecipe(meal) role="button" aria-pressed="true">{{ meal.strMeal }}</a>
                    </b-card-title>
                    <b-card-sub-title class="mb-2"><em>&mdash; {{ meal.strCategory }}, {{ meal.strArea }}</em></b-card-sub-title>
                    <b-card-text class="mb-0">
                      <div>
                        {{ meal.strInstructions.substring(0,120) }}{{ (meal.strInstructions.length>120)?'&hellip;':'' }}
                      </div>
                    </b-card-text>
                    <div>
                      <b-list-group horizontal class="overflow-auto">
                        <b-list-group-item v-for="(i, index) in getIngredientURLs(meal)" :key="index" class="border-0 p-0">
                            <b-img :src="i.url" v-b-tooltip.hover.top :title="i.name"
                              rounded="circle"
                              blank-color="#FEFFA3"
                              width="50%"
                              class="m-1 border mt-5"
                              :class="i.isSelected ? 'border-primary' : 'border-danger'"
                            ></b-img>
                        </b-list-group-item>
                      </b-list-group>
                    </div>
                    <div class="text-right text-danger mt-3"><strong>{{ meal.missing }}</strong> Ingredients Missing</div>
                  </b-card-body>
                </b-col>
              </b-row>
            </b-card>
          </b-card-group>
        </div>
      </div>
    </b-overlay>
  </b-container>
</template>


<script>
import { getSmallIngrImageURL } from '@/themealdbConnector.js'

export default {
  name: 'SearchResult',

  props: {
    searching: {
      type: Boolean,
      default: false
    },
    meals: {
      required: true,
      type: Array,
      default: () => []
    },
    selectedCategories: {
      type: Array,
      default: () => []
    },
    selectedAreas: {
      type: Array,
      default: () => []
    },
    selectedIngrs: {
      type: Array,
      default: () => []
    },
  },

  data () {
    return {
      mealIngredients: {
        type: Array,
        default: () => []
      },
    }
  },

  computed: {
    filteredMeals () {
      // if any filter is empty that filter is not applied
      return this.meals.filter(x => 
        (this.selectedCategories.length? this.selectedCategories.includes(x.strCategory) : true) &&
        (this.selectedAreas.length? this.selectedAreas.includes(x.strArea) : true) )
    },
  },

  methods: {
    getIngredientURLs(meal) {
      const selSet = new Set()
      const missSet = new Set()
      const selArray = []
      const missArray = []
      let i = 1
      while (i <= 20) {   // 20 is the max num of ingredients for any meal
        let currIngr = 'strIngredient' + i
        let name = meal[currIngr]
          .toLowerCase()
          .split(' ')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ')
        if (name===null || name.length==0) {  // if name of ingr is null or empty, stop
          break
        }
        let temp = {}
        temp['name'] = name
        temp['url'] = getSmallIngrImageURL(name)
        if (this.isSelected(name)) {
          if (!selSet.has(name)) {
            selSet.add(name)
            temp['isSelected'] = true
            selArray.push(temp)
          }
        } else {
          if (!missSet.has(name)) {
            missSet.add(name)
            temp['isSelected'] = false
            missArray.push(temp)
          }
        }
        i++
      }
      const result = new Array(...selArray, ...missArray)
      // const selectedNum = this.selectedIngrs.length
      // meal.missing = result.length - selectedNum
      meal.missing = missArray.length
      this.mealIngredients = result
      return result
    },
    isSelected(x) {
      return this.selectedIngrs.includes(x)
    },
    expandRecipe(meal) {
      this.$emit('expand-recipe', meal, "expanded")
    }
  }
}
</script>