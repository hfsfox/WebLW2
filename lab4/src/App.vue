<template>
  <div id="app">
    <header class="header" @mouseup="mouseup">
      <div class="filters">
        <div class="filter-bo">
          <ul class="folters-list">
            <li class="filters-item" v-for="(filterElement, index) in categories" :key="index">
              <input type="checkbox" :id="'fc' + index" @input="filterTrigger({ id: index, name: filterElement.category })">
              <label :for="'#fc' + index" class="filter-input-label">
                {{ filterElement.name }}
              </label>
            </li>
          </ul>
        </div>
      </div>
    </header>
    <div class="area" @mousedown="mousedown" @mousemove="mousemove" @mouseup="mouseup">
      <NoteBox v-for="(note, index) in filteredNotes" :key="note.id" :note-index="index" :id="note.id"
        :style="'left: ' + note.coords.x + 'px; top: ' + note.coords.y + 'px;'" />

      <div class="no-notes-alarm" v-if="!filteredNotes.length">Select filter or add a new note</div>
      <div class="actions">
        <button class="btn" @click="addNote">Add</button>
      </div>
    </div>
  </div>
</template>

<script>
import NoteBox from './components/NoteBox.vue';
import store from './store';


export default {
  name: "App",
  store,

  components: {
    NoteBox
  },

  data() {
    return {
      // index: -1,
      startCoords: {
        x: 0,
        y: 0
      },
      currentCoords: {
        x: 0,
        y: 0
      },
      currentNoteIndex: null,
      action: false,
      SelectedFilters: [],
    };
  },

  methods: {

    addNote() {
      const categories = this.$store.getters.getCategories;
      this.$store.dispatch('addNote', {
        coords: {
          x: 10,
          y: 100
        },
        text: '',
        id: Date.now().toString(),
        category: categories[0].category
      });
    },


    mousedown(event) {
      if (event.target.classList.contains('moveBare')) {
        this.action = true;
        this.currentNoteIndex = event.target.parentNode.getAttribute('note-index');
        this.startCoords.x = event.pageX;
        this.startCoords.y = event.pageY;
      }
    },
    mouseup() {
      if (this.action) {
        this.action = false;
        this.filteredNotes[this.currentNoteIndex].coords.x = this.currentCoords.x;
        this.filteredNotes[this.currentNoteIndex].coords.y = this.currentCoords.y;
        this.$store.dispatch('updateNote', this.notes[this.currentNoteIndex]);
      }
    },
    mousemove(event) {
      if (this.action) {
        this.currentCoords.x = this.notes[this.currentNoteIndex].coords.x + (event.pageX - this.startCoords.x);
        this.currentCoords.y = this.notes[this.currentNoteIndex].coords.y + (event.pageY - this.startCoords.y);

        document.querySelector('.note[note-index="' + this.currentNoteIndex + '"]').style.left = this.currentCoords.x + 'px';
        document.querySelector('.note[note-index="' + this.currentNoteIndex + '"]').style.top = this.currentCoords.y + 'px';
      }
    },
    filterTrigger(category) {
      const elementIndex = this.SelectedFilters.indexOf(category.name);
      elementIndex !== -1
        ? (this.SelectedFilters.splice(elementIndex, 1), document.querySelector(`#fc${category.id}`).checked = false)
        : (this.SelectedFilters.push(category.name), document.querySelector(`#fc${category.id}`).checked = true)
    },
  },
  computed: {
    notes() {
      return this.$store.getters.getNotes;
    },

    categories() {
      return this.$store.getters.getCategories;
    },

    filteredNotes() {
      return this.SelectedFilters.length
      ? this.notes.filter((note) => {
        return ~this.SelectedFilters.indexOf(note.category);
      })
      : this.notes;
    }
  },

  created() {
    this.$store.dispatch('fetchCategories');
    this.$store.dispatch('fetchNotes').then(() => {
      this.notes = this.$store.getters.getNotes;
    });
  }
};
</script>

<style lang="less">
@import './assets/less/app.css';
</style>