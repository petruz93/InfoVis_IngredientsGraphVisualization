<template>
  <div>
    <b-button variant="primary" v-b-toggle.sidebar-1>Search Filters</b-button>
    <b-sidebar id="sidebar-1" title="Filter your search!" shadow>


    <!-- <b-form-group
      label="Inline switch style checkboxes"
      v-slot="{ ariaDescribedby }"
    >
    <div v-for="(list, letter) in alphabeticalCategories" :key=letter>
      <b-form-checkbox-group
        v-model="selected"
        :options="alphabeticalCategories.key"
        :aria-describedby="ariaDescribedby"
        switches
      ></b-form-checkbox-group>
      </b-form-group>
    </div> -->
    <b-form-group
      label="Stacked (vertical) switch style checkboxes"
      v-slot="{ ariaDescribedby }"
    >
      <b-form-checkbox-group
        v-model="mealCategorySelected"
        :options="mealCategories"
        :aria-describedby="ariaDescribedby"
        switches
        stacked
      ></b-form-checkbox-group>
      </b-form-group>


      <b-list-group>
        <!-- <b-list-group-item v-for="(list, letter) in alphabeticalCategories" :key=letter> -->
          <!-- <h3 class="text-left">{{ letter }}</h3> -->
          <!-- <b-list-group horizontal class="overflow-auto"> -->
            <b-list-group-item v-for="i in mealCategories" :key="i" class="inner-list-item">
              <a href="#" class="text-theme">
                <!-- <b-img-lazy :alt="i" :src="imageURL(i)" class="ingr-img d-block"></b-img-lazy> -->
                <div class="d-block">{{ i }}</div>
              </a>
            </b-list-group-item>
          <!-- </b-list-group> -->
        <!-- </b-list-group-item> -->
      </b-list-group>
    </b-sidebar>
  </div>
</template>

<script>
export default {
  name: 'SearchFilter',
  props: {
    searching: {
      type: Boolean,
      default: false
    },
    mealCategories: {
      required: true,
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      selected: [], // Must be an array reference!
      options: [
        { text: 'Red', value: 'red' },
        { text: 'Green', value: 'green' },
        { text: 'Yellow (disabled)', value: 'yellow', disabled: true },
        { text: 'Blue', value: 'blue' }
      ]
    }
  },
  computed: {
  },
  methods: {
    mealCategorySelected () {
      const switchOptions = this.mealCategories
      return switchOptions
    }
  }
}
</script>