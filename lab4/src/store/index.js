import { initializeApp } from 'firebase/app';
import { 
  getDoc, 
  getDocs, 
  collection, 
  doc, 
  getFirestore, 
  setDoc, 
  deleteDoc 
} from 'firebase/firestore';

import { createStore } from 'vuex';

const APP = initializeApp({
  apiKey: "AIzaSyBle1xNYbf9WTJ5PggHNNmD_Ma1-kWrCFE",
  authDomain: "weblab4-62364.firebaseapp.com",
  projectId: "weblab4-62364",
  storageBucket: "weblab4-62364.appspot.com",
  messagingSenderId: "718242784383",
  appId: "1:718242784383:web:bf27b310bc8b3f76f30b4a"
  //measurementId: "G-E6WW7L6H9L"
});

const DB = getFirestore(APP);

function getDocFromDB(c, d) {
  return getDoc(doc(DB, c, d));
}

function getCollectionDB(c) {
  return getDocs(collection(DB, c));
}

export default createStore({
  state: {
    notes: [],
    categories: [],
  },
  getters: {
    getNotes: (state) => state.notes,
    getNoteById: (state) => (id) => {
      return state.notes.find((note) => note.id === id);
    },
    getCategories: (state) => state.categories,
  },
  mutations: {
    SET_NOTES(state, notes) {
      state.notes = notes;
    },
    
    DELETE_NOTE(state, id) {
      const index = state.notes.findIndex((note) => note.id === id);
      if (index !== -1) {
        state.notes.splice(index, 1);
      }
    },
    
    SET_CATEGORIES(state, categories) {
      state.categories = categories;
      console.log(categories);
    },
  },
  actions: {
    
    fetchNotes({ commit }) {
      getCollectionDB('Notes')
      .then((response) => {
        const notes = response.docs.map((doc) => doc.data());
        commit('SET_NOTES', notes);
      });
    },
    fetchCategories({ commit }) {
      getDocFromDB('Categories', 'data')
      .then((response) => {
        const categories = response.data();
        commit('SET_CATEGORIES', categories);
      });
    },
    deleteNote({ commit }, id) {
      commit('DELETE_NOTE', id);
      deleteDoc(doc(DB, 'Notes', id));
    },
    
    addNote(context, note) {
      context.state.notes.push(note);
      return setDoc(doc(DB, 'Notes', note.id), note);
    },
    updateNote(context, note) {
      context.state.notes[context.state.notes.findIndex(item => item.id == note.id)] = note;
      return setDoc(doc(DB, 'Notes', note.id), note);
    },
  },
});



