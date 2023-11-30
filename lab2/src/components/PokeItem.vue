<template>
  <li>
    <span class="image"><img :src="pokemon.pokePic" /></span>
    <span class="name">{{ pokemon.name }}</span>
    <span class="type">{{ pokemon.types }}</span>
    <span class="ability">{{ pokemon.abilities }}</span>
    <span class="delete" @click="$emit('delete')">Delete</span>
  </li>
</template>

<script>
export default {
  emits:[],
  props: {
    pokemon: Object,
  },
};
</script>
