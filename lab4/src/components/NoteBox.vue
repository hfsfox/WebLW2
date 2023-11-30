<template>
  <div class="note">
    <div class="moveBare">
      <select class="form-control" v-model="category" @change="changeCategory">
        <option v-for="option in categories" :key="option.category" :value="option.category">{{ option.name }}</option>
      </select>
      <button class="delete-btn" @click="deleteNote()">Delete</button>
    </div>
    <textarea placeholder="Enter your note" @input="changeNoteText()" v-model="text"></textarea>
  </div>
</template>

<script>
export default {
  data() {
    return {
      category: '',
      text: '',
    }
  },
  props: ["id"],

  methods: {
    deleteNote() {
      this.$store.dispatch('deleteNote', this.id);
    },
    changeNoteText() {
      this.note.text = this.text;
      this.$store.dispatch("updateNote", this.note);
    },
    changeCategory() {
      this.note.category = this.category;
      this.$store.dispatch("updateNote", this.note);
    },
  },
  
  computed: {
    categories() {
      return this.$store.getters.getCategories;
    },
    note() {
      return this.$store.getters.getNoteById(this.id);
    },
  },
  created() {
    this.text = this.$store.getters.getNoteById(this.id).text;
    this.category = this.$store.getters.getNoteById(this.id).category;
  },
}
</script>

<style lang="less">
  @import '../assets/less/notebox.css';
</style>
