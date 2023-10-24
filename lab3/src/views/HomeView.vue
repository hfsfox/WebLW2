<template>
  <div class="home">
      <PokemonHeader></PokemonHeader>
      <PokemonList></PokemonList>
  </div>
</template>

<script>

import PokemonHeader from '@/components/PokemonHeader.vue';
import PokemonList from '@/components/PokemonList.vue';

export default {
  name: 'HomeView',
  components: {
    PokemonHeader,
    PokemonList
  }
}

</script>