<template>
  <div class="container">
    <div class="search-field">
      <img src="../assets/6051806.png">
      <input class="field" placeholder="Enter the Pokemon!" v-model="query"/>
    </div>
    <ul class="pokemons-list">
      <li class="pokemon-element" v-for="pokemon in filteredPokemons" :key="pokemon.id">
        <div class="list-pokemons-container">
          <div class="list-pokemons-element element-flex">
            <img :src="'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/' + pokemon.id + '.png'" alt="pokemon" class="pokemon-img"/>
            <span class="pokemon-name">{{ pokemon.name }}</span>
          </div>
          <div class="list-pokemons-element">
            <span class="pokemon-experience"> Base experience: {{ pokemon.base_experience }} </span>
          </div>
          <div class="list-pokemons-element">
            <span class="pokemon-weight"> Weight: {{ pokemon.weight }} </span>  
          </div> 
          <div class="list-pokemons-element">
            <router-link class="about-pokemon-button" :to="'/about/' + pokemon.id">
              <a class="aboutButton"> Info </a> 
            </router-link>
          </div>
          
        </div>
      </li>
      <li v-if="!filteredPokemons.length" class="not-found">
        Not found!
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        query: ""
      }
    },
    computed: {
      pokemonsList() {
        return this.$store.getters['getAllPokemons']
      },
      filteredPokemons() {
        return this.pokemonsList.filter((pokemon) => {
          return ~pokemon.name.toLowerCase().indexOf(this.query.toLowerCase());
        })
      },
    }
  };
</script>

