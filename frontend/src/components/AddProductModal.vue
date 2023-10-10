<!-- AddProductModal.vue -->
<template>
  <div v-if="isOpen" class="modal">
    <div class="modal-content">
      <span class="close" @click="this.closeModal">&times;</span>

      <form @submit.prevent="submitForm">
        <label for="productName">Product Name:</label>
        <input type="text" v-model="formData.productName" required>

        <label for="scrumMasterName">Scrum Master:</label>
          <input type="text" v-model="formData.scrumMasterName" required>

          <label for="productOwnerName">Product Owner:</label>
          <input type="text" v-model="formData.productOwnerName" required>

          <label for="developer1">Developer 1:</label>
          <input type="text" v-model="formData.developers[0]" placeholder="Developer 1" required>

          <label for="developer2">Developer 2:</label>
          <input type="text" v-model="formData.developers[1]" placeholder="Developer 2">

          <label for="developer3">Developer 3:</label>
          <input type="text" v-model="formData.developers[2]" placeholder="Developer 3">

          <label for="developer4">Developer 4:</label>
          <input type="text" v-model="formData.developers[3]" placeholder="Developer 4">

          <label for="developer5">Developer 5:</label>
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
/* Add your modal styles here */
</style>
