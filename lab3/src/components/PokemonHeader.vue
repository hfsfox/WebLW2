<template>
  <header class="header">
    <h1 class="title">Pokemons</h1>
    <span class="counter-pokemons">
      {{ pokemonsCounter }} pokemons
    </span>
  </header>
</template>

<script>
  export default {
    computed: {
        pokemonsCounter(){
          return this.$store.getters['getCounterPokemons'];
        }
    }
  }
</script>
