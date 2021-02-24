<template>
  <b-container>
    <b-overlay :show="searching" variant="dark" class="my-4">
      <div>
        <div v-if="meals.length==0">
          <em>Sorry, no meals found...<br>please try with different set of ingredients.</em>
        </div>
        <div v-else>

          <!-- <p>
            Meals found:<br>
            <ul>
              <li v-for="meal in meals" :key="meal.strMeal">
                <img :alt="meal.strMealThumb" :src="meal.strMealThumb" width="100px">
                {{meal.strMeal}}
              </li>
            </ul>
          </p> -->

          <h4>Meals found:</h4>
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
                    <!-- <b-row>
                      <b-col>
                        <b-card-title>{{ meal.strMeal }}</b-card-title>
                        <b-card-sub-title><em>&#8212; {{ meal.strCategory }}</em></b-card-sub-title>
                        </b-col>
                      <b-col cols="2" class="text-right border">Veg</b-col>
                    </b-row> -->
                    <b-card-title style="color: var(--green-theme)"><a @click=expandRecipe(meal) role="button" aria-pressed="true">{{ meal.strMeal }}</a></b-card-title>
                    <b-card-sub-title class="mb-2"><em>&mdash; {{ meal.strCategory }}</em></b-card-sub-title>
                    <b-card-text>
                      <div>
                        {{ meal.strInstructions.substring(0,120) }}{{ (meal.strInstructions.length>120)?'&hellip;':'' }}
                      </div>
                      <!-- Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
                      sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                      Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris 
                      nisi ut aliquip ex ea commodo consequat.  -->
                      <!-- Duis aute irure dolor in reprehenderit in voluptate velit esse 
                      cillum dolore eu fugiat nulla pariatur. 
                      Excepteur sint occaecat cupidatat non proident, 
                      sunt in culpa qui officia deserunt mollit anim id est laborum. -->
                    </b-card-text>
                    <div>To make this recipe you need:</div>
                    <div>
                      <b-list-group horizontal class="overflow-auto">
                        <b-list-item v-for="i in getIngredientURLs(meal)" :key="i">
                          <b-img :src="i.url"
                            rounded="circle"
                            blank-color="#FEFFA3"
                            width="50%"
                            class="mr-2 border"
                            :class="i.isSelected ? 'border-primary' : 'border-danger'"
                          ></b-img>
                        </b-list-item>
                      </b-list-group>
                    </div>
                    <div class="text-right text-danger"><strong>{{ meal.missing }}</strong> missing ingredients</div>
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
    // state: {
    //   required: true,
    //   type: String,
    //   default: () => "idle"
    // }
  },

  data () {
    return {
      mealIngredients: {
        type: Object,
        default: () => []
      }
    }
  },
  computed: {
    filteredMeals () {
      // if any filter is empty that filter is not applied
      return this.meals.filter(x => 
        (this.selectedCategories.length? this.selectedCategories.includes(x.strCategory) : true) &&
        (this.selectedAreas.length? this.selectedAreas.includes(x.strArea) : true)
      )
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
      meal.missing = result.length - this.selectedIngrs.length
      this.mealIngredients = result
      return result
    },
    isSelected(x) {
      // const capitalized = x
      //   .toLowerCase()
      //   .split(' ')
      //   .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      //   .join(' ')
      return this.selectedIngrs.includes(x)
    },
    expandRecipe(meal) {
      this.$emit('expand-recipe', meal, "expanded")
    },
  }
}
</script>