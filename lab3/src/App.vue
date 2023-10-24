<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>

export default {
  created() {
      this.$store.dispatch('fetchPokemons');
  }
}
</script>

<style lang="sass">
  @import './assets/style/index.css'
</style>