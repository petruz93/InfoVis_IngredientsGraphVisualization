<template>
  <b-container fluid="lg">
    <b-card-group deck class="d-block">
      <b-card no-body class="my-3">
        <b-card-title title-tag="h2" style="color: var(--green-theme)">{{ meal.strMeal }}</b-card-title>
        <b-card-sub-title sub-title-tag="h5" class="mb-2"><em>&mdash; {{ meal.strCategory }}</em></b-card-sub-title>
        <b-card-img :src="meal.strMealThumb" left width="100%" class="crop"></b-card-img>
        <div align="left" class="mt-3 ml-3">
          <h4>You will need:</h4>
        </div>
          <b-list-group align="left">
            <b-list-item v-for="ingr in ingredientURLs" :key=ingr>
              <b-row no-gutters class="border-bottom border-primary">
              <b-col cols="12" sm="6" md="5" align-self="center" class="border-right border-primary">
                <b-img :src="ingr.url"
                  rounded="circle"
                  blank-color="#FEFFA3"
                  width="50%"
                  class="ml-4 mr-2 border border-dark"
                ></b-img>
                {{ingr.name}}
              </b-col>
              <b-col cols="12" sm="6" md="7">
                <b-card-body>
                  <div class="ml-2 text-left">{{ingr.measure}}</div>
                </b-card-body>
              </b-col>
            </b-row>  
            </b-list-item>
          </b-list-group>
          
        <b-card-text align="left" class="m-3">
          <div>
            <h4>Instructions:</h4>
            <!-- {{ instructions }} -->
            {{ meal.strInstructions }}
          </div>
          <div>
            <br><br>
            <h5>Check out the video recipe!</h5>
            <a :href=meal.strYoutube target="_blank">
              <img alt="Youtube logo" src="@/assets/youtube_icon.png">
            </a>
          </div>
        </b-card-text>
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
    // instructions () {
    //   return this.meal.strInstructions.replaceAll('. ', '.\n')
    // }
  }
}
</script>

<style scoped>
.crop {
  height: 300px;
  object-fit: cover;
}
</style>