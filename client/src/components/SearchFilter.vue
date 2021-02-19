<template>
  <div>
    <b-button variant="primary" v-b-toggle.sidebar-1>Search Filters</b-button>
    <b-sidebar id="sidebar-1" title="Filter your search!" shadow>
      <b-form-group
        label="Select the categories you are interested in!"
        v-slot="{ ariaDescribedby }"
      >
        <div v-if=searched>
          <b-form-checkbox-group
            align="left"
            v-model="selectedCategories"
            :options="searchMealCategories"
            :aria-describedby="ariaDescribedby"
            switches
            stacked
          ></b-form-checkbox-group>
          <b-form-checkbox-group
            align="left"
            :options="disabledCategories"
            :aria-describedby="ariaDescribedby"
            switches
            stacked
            disabled
          ></b-form-checkbox-group>
        </div>
        <div v-else>
          <b-form-checkbox-group
            align="left"
            v-model="selectedCategories"
            :options="allMealCategories"
            :aria-describedby="ariaDescribedby"
            switches
            stacked
          ></b-form-checkbox-group>
        </div>
      </b-form-group>
      
      <b-form-group
        label="Select the areas from which you want your recipes!"
        v-slot="{ ariaDescribedby }"
      >
        <div v-if=searched>
          <b-form-checkbox-group
            align="left"
            v-model="selectedAreas"
            :options="searchMealAreas"
            :aria-describedby="ariaDescribedby"
            switches
            stacked
          ></b-form-checkbox-group>
          <b-form-checkbox-group
            align="left"
            :options="disabledAreas"
            :aria-describedby="ariaDescribedby"
            switches
            stacked
            disabled
          ></b-form-checkbox-group>
        </div>
        <div v-else>
          <b-form-checkbox-group
            align="left"
            v-model="selectedAreas"
            :options="allMealAreas"
            :aria-describedby="ariaDescribedby"
            switches
            stacked
          ></b-form-checkbox-group>
        </div>
      </b-form-group>
    </b-sidebar>
  </div>
</template>

<script>
export default {
  name: 'SearchFilter',
  props: {
    searched: {
      type: Boolean,
      default: false
    },
    allMealCategories: {
      required: true,
      type: Array,
      default: () => []
    },
    allMealAreas: {
      required: true,
      type: Array,
      default: () => []
    },
    searchMealCategories: {
      required: true,
      type: Array,
      default: () => []
    },
    searchMealAreas: {
      required: true,
      type: Array,
      default: () => []
    },
  },
  data () {
    return {
      selectedCategories: [],
      selectedAreas: [],
      unselectedAreas: []
    }
  },
  computed: {
    disabledCategories () {
      return this.allMealCategories.filter(x => !this.searchMealCategories.includes(x))
    },
    disabledAreas () {
      return this.allMealAreas.filter(x => !this.searchMealAreas.includes(x))
    }
  },
  watch: {
    selectedCategories () {
      this.$emit('select-category', this.selectedCategories)
    },
    selectedAreas () {
      this.$emit('select-area', this.selectedAreas)
    }
  },
}
</script>