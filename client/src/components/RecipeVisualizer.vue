<template>
  <b-container fluid="lg">
    <b-card-group deck class="d-block">
      <b-card no-body class="my-3">
        <b-card-title style="color: var(--green-theme)">{{ meal.strMeal }}</b-card-title>
        <b-card-sub-title class="mb-2"><em>&mdash; {{ meal.strCategory }}</em></b-card-sub-title>
        <b-card-img :src="meal.strMealThumb" left width="100%" class="crop"></b-card-img>
        <div>To make this recipe you will need:</div>
          <b-list-group align="left">
            <b-list-item v-for="ingr in ingredientURLs" :key=ingr>
              <b-row no-gutters class="border-bottom border-primary">
              <b-col cols="12" sm="6" md="5" align-self="center" class="border-right border-primary">
                <b-img :src="ingr.url"
                  rounded="circle"
                  blank-color="#FEFFA3"
                  width="50%"
                  class="ml-2 mr-2 border border-dark"
                ></b-img>
                {{ingr.name}}
              </b-col>
              <b-col cols="12" sm="6" md="7">
                <b-card-body class="text-left">
                  <div class = "ml-2">{{ingr.measure}}</div>
                </b-card-body>
              </b-col>
            </b-row>  
            </b-list-item>
          </b-list-group>
          
        <b-card-text align="left" class="ml-2 mr-2 mb-2">
          <div>
            {{ instructions }}
          </div>
        </b-card-text>
        <div>
          <br>
          <b-card-text align="left" class="ml-2 mr-2 mb-2">
            Check the video recipe!
          </b-card-text>
        </div>
        <div align="left" class = "ml-2 mb-2">
          <a :href=this.meal.strYoutube target="_blank">
          <img alt="App logo" src="@/assets/youtube_icon.png">
          </a>
        </div>  
      </b-card>
    </b-card-group>
  </b-container>
</template>

<script>
import { getSmallIngrImageURL } from '@/themealdbConnector.js'

export default {
  name: 'RecipeVisualizer',
  props: {
    meal: {
      required: true,
      type: Object,
      default: () => {}
    },
  },
  data () {
    return  {

    }
  },
  computed: {
    ingredientURLs () {
      const result = []
      let i = 0
      while (i < 20) {   // 20 is the max num of ingredients for any meal
        let currIngr = 'strIngredient' + (i + 1)
        let currMeasure = 'strMeasure' + (i + i)
        let name = this.meal[currIngr]
        if (name===null || name.length==0) {  // if name of ingr is null or empty
          break
        } 
        result[i] = { 
          'measure': (
            this.meal[currMeasure]===undefined ||
            this.meal[currMeasure]===null || 
            this.meal[currMeasure].trim()==="") ? "n/a" : this.meal[currMeasure],
          'name': name,
          'url': getSmallIngrImageURL(this.meal[currIngr]),
        }
        i++
      }
      return result
    },
    instructions () {
      return this.meal.strInstructions.replaceAll('. ', '.\n')
    }
  }
}
</script>

<style scoped>
.crop {
  height: 300px;
  object-fit: cover;
}
</style>