<template>
  <div class="background">
    <div class="upper">
      <h1>Pokemons!</h1>
      <h2 class="count-of-pokemon">{{ filteredPokemons.length }} pokemons</h2>
    </div>
    <div class="search-wrapper">
      <SearchBar v-model="searchQuery" />
    </div>
    <div class="poke-list">
      <div v-if="filteredPokemons.length > 0">
        <ul>
          <PokeItem
            v-for="(pokemon, index) in filteredPokemons"
            :key="index"
            :pokemon="pokemon"
            @delete="deletePokemon(index)"
          ></PokeItem>
        </ul>
      </div>
      <div v-else>
        <h1 class="NF">Not Found!</h1>
      </div>
    </div>
  </div>
</template>

<script>
import PokeItem from "@/components/PokeItem.vue";
import SearchBar from "@/components/SearchBar.vue";

const API = "https://pokeapi.co/api/v2/pokemon/";

export default {
  components: {
    SearchBar,
    PokeItem,
  },
  data() {
    return {
      searchQuery: "",
      pokemons: [],
      API: "https://pokeapi.co/api/v2/pokemon/",
      filteredPokemons: [],
    };
  },

  mounted() {
    if (!localStorage.getItem("pokemons")) {
      this.updateLS();
    } else {
      this.pokemons = this.getLS("pokemons");
      this.filteredPokemons = this.pokemons;
    }
  },

  methods: {
    setLS(key, value) {
      localStorage.setItem(key, JSON.stringify(value));
    },

    getLS(key) {
      return JSON.parse(localStorage.getItem(key));
    },

    updateLS() {
      fetch(API)
        .then((response) => response.json())
        .then((data) => {
          const promises = data.results.map((pokemon) => {
            return fetch(pokemon.url)
              .then((response) => response.json())
              .then((data) => {
                return {
                  name: pokemon.name,
                  pokePic: data.sprites.front_default,
                  height: data.height,
                  weight: data.weight,
                  element: data.types[0].type.name,
                };
              });
          });
          return Promise.all(promises);
        })
        .then((pokemons) => {
          this.setLS("pokemons", pokemons);
          this.pokemons = pokemons;
          this.filteredPokemons = pokemons;
        })
        .catch((error) => console.log(error));
    },

    deletePokemon(index) {
      this.pokemons.splice(index, 1);
      localStorage.setItem("pokemons", JSON.stringify(this.pokemons));
      this.filteredPokemons = this.pokemons;
    },

    filterPokemons() {
      const query = this.searchQuery.toLowerCase();
      this.filteredPokemons = this.pokemons.filter((pokemon) => {
        return pokemon.name.toLowerCase().includes(query);
      });
    },
  },

  watch: {
    searchQuery: function () {
      this.filterPokemons();
    },
  },
};
</script>

<style lang="less">
@import "./assets/less/index.less";
</style>
