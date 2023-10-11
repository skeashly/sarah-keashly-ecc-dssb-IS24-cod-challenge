<template>
      <div v-if="isOpen" class="modal">
      <div id='editProductModal' class="modal-content">
        <span id='editProductClose' class="close" @click="this.closeModal">&times;</span>
        <h2>Edit Product</h2>
        <!-- Form for editing a product -->
        <form @submit.prevent="submitForm">
          <label for="productName">Product Name:</label>
          <input type="text" v-model="formData.productName">

          <label for="scrumMasterName">Scrum Master:</label>
          <input type="text" v-model="formData.scrumMasterName">

          <label for="productOwnerName">Product Owner:</label>
          <input type="text" v-model="formData.productOwnerName" >

          <label for="developer1">Developers:</label>
          <input type="text" v-model="formData.developers[0]" placeholder="Developer 1">

          <input type="text" v-model="formData.developers[1]" placeholder="Developer 2">

          <input type="text" v-model="formData.developers[2]" placeholder="Developer 3">

          <input type="text" v-model="formData.developers[3]" placeholder="Developer 4">

          <input type="text" v-model="formData.developers[4]" placeholder="Developer 5">

          <label for="startDate">Start Date:</label>
          <input type="date" v-model="formData.startDate" >

          <label for="methodology">Methodology:</label>
          <select v-model="formData.methodology" >
            <option value="Agile">Agile</option>
            <option value="Waterfall">Waterfall</option>
          </select>

          <label for="location">location:</label>
          <input type="link" v-model="formData.location" >

          <button type="submit">Save</button>
        </form>
      </div>
    </div>
</template>

<script>
export default {
  props:{
    isOpen: Boolean,
    saveEdit: Function, 
    closeModal: Function, 
    editedProduct: Object, 
  },
  data() {
    return {
      formData: {},
    };
  },
  watch: {
    // Watch for changes in the editedProduct prop
    editedProduct: {
      handler(newVal) {
        // Copy non-empty values from editedProduct to formData
        for (const key in newVal) {
          if (newVal[key] !== null && newVal[key] !== undefined) {
            this.$set(this.formData, key, newVal[key]);
          }
        }
      },
      immediate: true, // Trigger the watch handler immediately on component mount
    },
  },
  methods: {
    submitForm() {
      this.saveEdit(this.formData); // Emit the edited product to the parent
      this.closeModal();
    },
  },
}
</script>

<style scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5); 
  display: flex;
  align-items: center;
  justify-content: center;
};

.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  z-index: 1000; 
}

h2{
  font-family: Helvetica, sans-serif;
}

form{
  font-family: Helvetica, sans-serif;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding-top: 5px;
}

input, select{
  padding-top:2px;
  margin: 6px;
}

#editProductModal{
  background-color: rgb(207, 211, 211);
    padding: 22px;
    border-radius: 10px;
}

#addProductClose{
padding-bottom: 23px;
}

</style>
