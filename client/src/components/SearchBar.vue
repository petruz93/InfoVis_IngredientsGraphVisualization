<template>
  <b-container fluid>
    <b-row cols="1" cols-sm="2" cols-md="12" class="mb-2">
      <b-col cols="12" sm="12" md="8" align-self="center" class="mt-1">
        <v-select multiple
          v-model="privateSelIngrs"
          label="strIngredient"
          :reduce="i => i.strIngredient"
          :options="allIngredients"
          placeholder="Choose your ingredients"
        >
          <!--  
          @input="addToSelectedList"
          @input="submitData"
            -->
          <template #option="{ strIngredient }">
            <b-img-lazy :src="imageURL(strIngredient)"
                        rounded="circle"
                        blank-color="#FEFFA3"
                        width="55%"
                        class="mr-2 border border-dark bg-light"></b-img-lazy>
            <span class="mr-auto text-theme">{{ strIngredient }}</span>
          </template>
        </v-select>
      </b-col>
      <b-col cols="12" sm="12" md="4" align-self="center" class="mt-1">
        <!-- <b-button variant="primary" @click="searchMeals(selectedIngredients)"> -->
        <b-button variant="primary" @click="onClickSearch(privateSelIngrs)">
          <b-icon icon="search" class="mr-2"></b-icon>
          <span>Find Recipes</span>
        </b-button>
        <b-button variant="primary" class="ml-3" @click="onClickClear()"> 
          <span>Clear</span>
        </b-button>
      </b-col>
    </b-row>
    <b-row>
    </b-row>
    <SelectedIngredients v-if=privateSelIngrs.length :selectedList=privateSelIngrs></SelectedIngredients>
  </b-container>
</template>


<script>
import vSelect from 'vue-select'
import { getSmallIngrImageURL } from '@/themealdbConnector.js'

export default {
  name: 'SearchBar',

  components: {
    vSelect,
    SelectedIngredients: () => import('@/components/SelectedIngredients'),
  },

  props: {
    allIngredients: {
      required: true,
      type: Array,
      default: () => []
    },
    selectedIngredients: {
      type: Array,
      default: () => []
    }
  },

  data () {
    return {
      meals: [],
      searchFlag: false,
      privateSelIngrs: []
    }
  },

  watch: {
    selectedIngredients () {
      this.privateSelIngrs = Array.from(this.selectedIngredients)
    }
  },

  methods: {
    imageURL(ingr) {
      return getSmallIngrImageURL(ingr)
    },
    onClickSearch(selIngrs) {
        this.$emit('search-meals', selIngrs, 'searched')
    },
    onClickClear() {
      this.$emit('clear')
    }
  },

}
</script>


<style>
/* :root {
  --primary: #7391BC
} */
</style>