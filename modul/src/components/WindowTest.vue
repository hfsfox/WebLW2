<template>
   <header class="main">
      <div class="window">
          <div class="up">
            <ul>
              <li><a class="red"></a></li>
              <li><a class="yellow"></a></li>
              <li><a class="green"></a></li>
            </ul>
          </div>


      <div class="container">
        <div class="input-group ">
          <div class="input-group-prepend">
            <span class="input-group-text">Filter prefix: </span>
          </div>
          <input type="text" class="form-control" v-model="prefix" @input="filterNames" />
        </div>

        <div class="form-group-name">
          <label for="inputName"> <p>Name: </p></label>
          <input type="text" class="form-control-name" id="inputName" v-model="firstName" />
        </div>

        <div class="form-group-surname">
          <label for="inputSurname"> <p>Surname: </p></label>
          <input type="text" class="form-control-surname" id="inputSurname" v-model="lastName" />
        </div>

        <div class="form-group-list">
          <select v-model="selectedName" class="form-control-list" size="5">
            <option v-for="name in filteredNames" :key="name" :value="name">{{ name }}</option>
          </select>
        </div>

        <div class="btns">
          <button class="btn btn-primary" @click="addName">Create</button>
          <button class="btn btn-primary" @click="updateName" :disabled="!selectedName">Update</button>
          <button class="btn btn-danger" @click="deleteName" :disabled="!selectedName">Delete</button>
        </div>
        
        <div class="form-group">
          <label><p>Status: </p></label>
          <div>{{ status }}</div>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  data() {
    return {
      prefix: '',
      firstName: '',
      lastName: '',
      names: [],
      selectedName: '',
      status: ''
    };
  },
  computed: {
    filteredNames() {
      return this.names.filter(name => name.startsWith(this.prefix));
    }
  },
  methods: {
    filterNames() {
      this.selectedName = '';
    },
    addName() {
      if (!this.firstName || !this.lastName) {
        this.status = 'You need to enter a first and last name';
        return;
      }
      const newName = `${this.firstName} ${this.lastName}`;
      if (this.names.includes(newName)) {
        this.status = 'Such a name already exists';
        return;
      }
      this.names.push(newName);
      this.status = 'The name has been added to the list!';
    },
    updateName() {
      if (!this.firstName || !this.lastName) {
        this.status = 'You need to enter your first and last name';
        return;
      }
      const newName = `${this.firstName} ${this.lastName}`;
      if (this.names.includes(newName)) {
        this.status = 'Such a name already exists';
        return;
      }
      const index = this.names.indexOf(this.selectedName);
      if (index !== -1) {
        //this.names[index] = newName;
        this.$set(this.names,index, newName);
        this.status = 'Name has been updated!';
      }
    },
    deleteName() {
      const index = this.names.indexOf(this.selectedName);
      if (index !== -1) {
        this.names.splice(index, 1);
        this.selectedName = '';
        this.status = 'Name has been removed from the list!';
      }
    }
  }
};

</script>
<style>
.container {
  margin: 20px;
}