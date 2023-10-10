<template>
      <div v-if="isOpen" class="modal">
      <div class="modal-content">
        <span class="close" @click="closeModal">&times;</span>
        <h2>Edit Product</h2>
        <!-- Form for editing a product -->
        <form @submit.prevent="submitForm">
          <label for="productName">Product Name:</label>
          <input type="text" v-model="formData.productName">

          <label for="scrumMasterName">Scrum Master:</label>
          <input type="text" v-model="formData.scrumMasterName">

          <label for="productOwnerName">Product Owner:</label>
          <input type="text" v-model="formData.productOwnerName" >

          <label for="developer1">Developer 1:</label>
          <input type="text" v-model="formData.developers[0]" placeholder="Developer 1">

          <label for="developer2">Developer 2:</label>
          <input type="text" v-model="formData.developers[1]" placeholder="Developer 2">

          <label for="developer3">Developer 3:</label>
          <input type="text" v-model="formData.developers[2]" placeholder="Developer 3">

          <label for="developer4">Developer 4:</label>
          <input type="text" v-model="formData.developers[3]" placeholder="Developer 4">

          <label for="developer5">Developer 5:</label>
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
    saveEdit: Function, // Pass the saveEdit method as a prop
    closeModal: Function, // Pass the closeModal method as a prop
    editedProduct: Object, // Pass the editedProduct object as a prop
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

<style>

</style>