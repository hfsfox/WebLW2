<template>
    <div class="about">
        <div class="pokeInfoContainer">
            <div class="pokeImgContainer">
                <img :src="'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/' + this.$route.params.id + '.png'" alt="pokemon" class="pokemon-img"/>
            </div>
            <div class="statsContainer">
                <div class="Poke4x2">
                    <div class="Poke2x2">
                        
                        <div class="itemStatsPokemon nameContainer">
                            <h1 class="pokemonName">Name: {{ pokemon.name }}
                            </h1>
                        </div>
                        <div class="itemStatsPokemon">Weight: 
                            <span class="characteristicsWalue"> {{ pokemon.weight }} </span>
                        </div>

                    </div>
                    <div class="Poke2x2">

                        <div class="itemStatsPokemon">Height:
                            <span class="characteristicsWalue"> {{ pokemon.height }}</span>
                        </div>
                        <div class="itemStatsPokemon">Base experience:
                            <span class="characteristicsWalue"> {{ pokemon.base_experience }}</span>
                        </div>
                    </div>

                </div>
                <div class="Poke4x2">
                    <div class="Poke2x2">

                        <div class="itemStatsPokemon">HP: 
                            <span class="characteristicsWalue"> {{ pokemon.stats[0].base_stat }}</span>
                        </div>
                        <div class="itemStatsPokemon">Attack:
                            <span class="characteristicsWalue"> {{ pokemon.stats[1].base_stat }}</span>
                        </div>

                    </div>
                    <div class="Poke2x2">

                        <div class="itemStatsPokemon">Defense:
                            <span class="characteristicsWaluee"> {{ pokemon.stats[2].base_stat }}</span>
                        </div>
                        <div class="itemStatsPokemon">Speed:
                            <span class="characteristicsWalue"> {{ pokemon.stats[5].base_stat }}</span>
                        </div>

                    </div>

                </div>

            </div>
            <div class="buttonsContainer">
                <div class="deleteButtonContainer">
                    <button class="deleteButton" @click="deletePokemon()">Delete</button>
                </div>
                <div class="backButtonContainer">
                    <button class="backButton" @click="backToHome()">Back</button>
                </div>
            </div>
        </div>
    </div>
  </template>
  
  <script>
import router from '@/router';
  
  export default {
      computed: {
        pokemon() {
            return this.$store.getters.getPokemonById(this.$route.params.id);
        }
      },
      methods: {
        deletePokemon() {
            this.$store.commit('deletePokemonById', this.pokemon.id);
            router.push('/');
        },
        backToHome(){
            router.push('/');
        }
      }
  }
  </script>