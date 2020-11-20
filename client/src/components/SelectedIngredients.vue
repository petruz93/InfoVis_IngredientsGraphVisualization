<template>
  <div>
    selected ingredients: {{ selectedList }}
    <div>
      <b-list-group horizontal>
        <b-list-group-item v-for="i in selectedList" :key="i">{{i}}</b-list-group-item>
        <b-list-group-item>blaba</b-list-group-item>
        <b-list-group-item>blaba</b-list-group-item>
        <b-list-group-item>blaba</b-list-group-item>
        <b-list-group-item>blaba</b-list-group-item>
        <b-list-group-item>blaba</b-list-group-item>
        <b-list-group-item>blaba</b-list-group-item>
        <b-list-group-item>blaba</b-list-group-item>
        <b-list-group-item>blaba</b-list-group-item>
        <b-list-group-item>blaba</b-list-group-item>
        <b-list-group-item>blaba</b-list-group-item>
        <b-list-group-item>blaba</b-list-group-item>
        <b-list-group-item>blaba</b-list-group-item>
        <b-list-group-item>blaba</b-list-group-item>
        <b-list-group-item>blaba</b-list-group-item>
        <b-list-group-item>blaba</b-list-group-item>
        <b-list-group-item>blaba</b-list-group-item>
      </b-list-group>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SelectedIngredients',

  props: {
    selectedList: {
      type: Array
    }
  },

  data () {
    return {}
  }
}
</script>

<style>

</style>