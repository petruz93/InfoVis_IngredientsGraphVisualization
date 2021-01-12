<template>
  <div>
    <b-button variant="primary" v-b-toggle.sidebar-1>Search Filters</b-button>
    <b-sidebar id="sidebar-1" title="Filter your search!" shadow>
      <b-list-group>
        <b-list-group-item v-for="(list, letter) in alphabeticalCategories" :key=letter>
          <!-- <h3 class="text-left">{{ letter }}</h3> -->
          <!-- <b-list-group horizontal class="overflow-auto"> -->
            <b-list-group-item v-for="i in list" :key="i" class="inner-list-item">
              <a href="#" class="text-theme">
                <!-- <b-img-lazy :alt="i" :src="imageURL(i)" class="ingr-img d-block"></b-img-lazy> -->
                <div class="d-block">{{ i }}</div>
              </a>
            </b-list-group-item>
          <!-- </b-list-group> -->
        </b-list-group-item>
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
    meals: {
      required: true,
      type: Array,
      default: () => []
    }
  },
    data () {
    return {}
  },
  computed: {
    alphabeticalCategories () {
      const abCategories = new Object()
      for (const c of this.meals) {
        const catName = c.strCategory
        const initial = catName.charAt(0)
        if (!Object.prototype.hasOwnProperty.call(abCategories, initial)) {
          abCategories[initial] = []
        }
        if (!Object.values(abCategories).includes(catName)) {
          abCategories[initial].push(catName)
        }
      }
      return abCategories
    }
  }
}
</script>