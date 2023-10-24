import Vue from 'vue'
import Vuex from 'vuex'

const API = 'https://pokeapi.co/api/v2/pokemon/';

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        pokemons: []
    },
    getters: {
        getAllPokemons(state) {
            return state.pokemons;
        },
        getCounterPokemons(state){
            return state.pokemons.length;
        },
        getPokemonById: (state) => (id) =>{
            return state.pokemons[state.pokemons.findIndex(pokemon => pokemon.id == id)]
        }
    },
    actions: {
        deletePokemonById(context, id) {
            const index = context.state.pokemons.findIndex(pokemon => pokemon.id == id);
                if (index !== -1) {
                    context.state.pokemons.splice(index, 1);
                }
            localStorage.setItem("pokemons", JSON.stringify(context.state.pokemons));
        },
        fetchPokemons(context) {
          if (
            JSON.parse(localStorage.getItem("pokemons")) == null ||
            JSON.parse(localStorage.getItem("pokemons")).length == 0
          ) {
            fetch(API)
              .then((response) => {
                return response.json();
              })
              .then((data) => {
                context.state.pokemons = [];
                data.results.forEach((element) => {
                  fetch(element.url)
                    .then((response) => {
                      return response.json();
                    })
                    .then((data) => {
                      context.state.pokemons.push(data);
                      localStorage.setItem(
                        "pokemons",
                        JSON.stringify(context.state.pokemons)
                      );
                    });
                });
              });
          } else {
            context.state.pokemons = JSON.parse(localStorage.getItem("pokemons"));
          }
        },
      },
      
})
