<template>
  <input class="search" type="text" v-model="searchQuery" placeholder="Enter the Pokemon!">
</template>

<script>
export default {
  data() {
    return {
      searchQuery: '',
    };
  },
};
</script>
