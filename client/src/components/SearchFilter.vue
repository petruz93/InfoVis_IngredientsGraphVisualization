<template>
  <div>
    <b-button variant="link" v-b-toggle.sidebar-1 class="text-decoration-none text-primary">
      <b-icon icon="filter-square"></b-icon>
    </b-button>
    <b-sidebar id="sidebar-1" title="Filter your search!" shadow backdrop align="left">
      <b-form-group
        label="By Category"
        v-slot="{ ariaDescribedby }"
        class="ml-3"
      >
        <div v-if="state==='searched'">
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
      
      <hr width="90%">

      <b-form-group
        label="By Geographical Area"
        v-slot="{ ariaDescribedby }"
        class="ml-3"
      >
        <div v-if="state==='searched'">
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

      <div v-if="state==='searched'">
        <hr width="90%">
        <b-form-group
          label="Sort your search by... "
          v-slot="{ ariaDescribedby }"
          class="ml-3"
        >
          <b-form-radio-group
            align="left"
            v-model="selectedSortOption"
            :options="sortOptions"
            :aria-describedby="ariaDescribedby"
            stacked
          ></b-form-radio-group>
        </b-form-group>
      </div>
    </b-sidebar>
  </div>
</template>

<script>
export default {
  name: 'SearchFilter',
  props: {
    state: {
      required: true,
      type: String
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
      type: Array
    },
    searchMealAreas: {
      required: true,
      type: Array
    },
  },
  data () {
    return {
      selectedCategories: [],
      selectedAreas: [],
      selectedSortOption: {},
      sortOptions: 
        [{
          text: 'Missing Ingredients - ascending', value: 'ascending'
        },
        {
          text: 'Missing Ingredients - descending', value: 'descending'
        }
      ]}
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
    searchMealCategories () {
      if (this.state==='cleanSearch' || this.state==='idle') {
        this.selectedCategories = []
      }
      if (this.selectedCategories.length==0 && 
          this.searchMealCategories!=this.allMealCategories ||
          this.searchMealCategories.length==0) {
        this.selectedCategories = this.searchMealCategories
      }
    },
    searchMealAreas () {
      if (this.state==='cleanSearch') {
        this.selectedAreas = []
      }
      if (this.selectedAreas.length==0 && 
          this.searchMealAreas!=this.allMealAreas ||
          this.searchMealAreas.length==0) {
        this.selectedAreas = this.searchMealAreas
      }
    },
    selectedCategories () {
      this.$emit('select-category', this.selectedCategories)
    },
    selectedAreas () {
      this.$emit('select-area', this.selectedAreas)
    },
    selectedSortOption() {
      if(this.selectedSortOption.includes('ascending')) {
        this.$emit('miss-ingr-sort', true)
      }
      else if(this.selectedSortOption.includes('descending')) {
        this.$emit('miss-ingr-sort', false)
      }
      else
        this.$emit('miss-ingr-sort', false)
    }
  },
}
</script>