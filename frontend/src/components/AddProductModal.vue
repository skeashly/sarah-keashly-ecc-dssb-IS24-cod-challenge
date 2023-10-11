<!-- AddProductModal.vue -->
<template>
  <div v-if="isOpen" class="modal">
    <div id='addProductModal' class="modal-content">
      <div id='addProductClose' class="close" @click="this.closeModal">&times;</div>

      <form @submit.prevent="submitForm">
        <label for="productName">Product Name:</label>
        <input type="text" v-model="formData.productName" required>

        <label for="scrumMasterName">Scrum Master:</label>
          <input type="text" v-model="formData.scrumMasterName" required>

          <label for="productOwnerName">Product Owner:</label>
          <input type="text" v-model="formData.productOwnerName" required>

          <label for="developer1">Developers:</label>
          <input type="text" v-model="formData.developers[0]" placeholder="Developer 1" required>

          <input type="text" v-model="formData.developers[1]" placeholder="Developer 2">

          <input type="text" v-model="formData.developers[2]" placeholder="Developer 3">

          <input type="text" v-model="formData.developers[3]" placeholder="Developer 4">

          <input type="text" v-model="formData.developers[4]" placeholder="Developer 5">

          <label for="startDate">Start Date:</label>
          <input type="date" v-model="formData.startDate" required>

          <label for="methodology">Methodology:</label>
          <select v-model="formData.methodology" required>
            <option value="Agile">Agile</option>
            <option value="Waterfall">Waterfall</option>
          </select>

        <button type="submit">Add Product</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isOpen: Boolean,
    addProduct: Function, 
    closeModal: Function, 
    newProduct: Object, 
  },
  data() {
    return {
      formData: { ...this.newProduct }, // Use a local copy for form data
    };
  },
  methods: {
    submitForm() {
      this.addProduct(this.formData); // Emit the form data to the parent
    },

  },
};
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

#addProductModal{
  background-color: rgb(207, 211, 211);
    padding: 22px;
    border-radius: 10px;
}

#addProductClose{
padding-bottom: 23px;
}

</style>
