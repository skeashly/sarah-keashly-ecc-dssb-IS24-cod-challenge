<template>
  <div id="app">

    <!-- Button to open the modal -->
    <button @click="openModal">Add Product</button>

    <add-product-modal
      :is-open="isModalOpen"
      :add-product="addProduct"
      :close-modal="closeModal"
      :new-product="newProduct"
    ></add-product-modal>

    <h1>Product List</h1>
    <table>
      <!-- Table headers -->
      <tr>
        <th>Product Number</th>
        <th>Product Name</th>
        <th>Scrum Master</th>
        <th>Product Owner</th>
        <th>Developer Names</th>
        <th>Start Date</th>
        <th>Methodology</th>
        <th>Location</th>
        <th>Edit</th>
      </tr>

      <!-- Table rows -->
      <tr v-for="product in products" :key="product.productId">
        <td>{{ product.productId }}</td>
        <td>{{ product.productName }}</td>
        <td>{{ product.scrumMasterName}}</td>
        <td>{{ product.productOwnerName}}</td>
        <td>
          <tr>
            <td>{{ product.developers[0] }}</td>
          </tr>
          <tr>
            <td>{{ product.developers[1] }}</td>
          </tr>
          <tr>
            <td>{{ product.developers[2] }}</td>
          </tr>
          <tr>
            <td>{{ product.developers[3] }}</td>
          </tr>
          <tr>
            <td>{{ product.developers[4] }}</td>
          </tr>
        </td>
        <td>{{ product.startDate}}</td>
        <td>{{ product.methodology}}</td>
        <td>{{ product.location}}</td>
        <td><button @click="openEditModal(product.productId)">Edit</button></td>
        <!-- ... other cells ... -->
      </tr>
      <tr><br></tr>
      <tr>
        <td>Total Product Amount:</td>
        <td>{{ count }}</td>
      </tr>
    </table>

  
    <!-- Modal form for editing a product --> 

    <edit-product-modal
    :is-open="isEditModalOpen"
    :save-edit="saveEdit"
    :close-modal="closeModal"
    :edited-product="editedProduct"
  ></edit-product-modal>
  </div>
</template>

<script>
import AddProductModal from './components/AddProductModal.vue';
import EditProductModal from './components/EditProductModal.vue'
export default {
  components: { AddProductModal, EditProductModal },
  data() {
    return {
      isModalOpen: false,
      isEditModalOpen: false,
      newProduct: {
        productId: Math.random().toString(36).substr(2, 9),
        productName: '',
        scrumMasterName: '',
        productOwnerName: '',
        developers: [],
        startDate: '',
        methodology: 'Agile',
      },
      editedProduct: {
        productId: '',
        productName: '',
        scrumMasterName: '',
        productOwnerName: '',
        developers: [],
        startDate: '',
        methodology: 'Agile',
        location: '',
      },
      products: [],
    };
  },
  mounted() {
    // Fetch data from the backend on component mount
    this.fetchProducts();
  },
  computed: {

    count(){
      return this.products.length;
    }
    
  },
  methods: {
    async fetchProducts() {
      try {
        // Fetch products from the backend
        const response = await this.$axios.get('/api/products');
        this.products = response.data;
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    },

    openModal() {
      this.isModalOpen = true;
    },
    openEditModal(productId) {
      console.log(productId)
      // Find the product in the array based on productId
      const productToEdit = this.products.find(product => product.productId === productId);

      console.log("producttoEdit",productToEdit);
      // Set the editedProduct to the found product
      this.editedProduct = { ...productToEdit };

      this.isEditModalOpen = true;
    },
    closeModal() {
      this.isModalOpen = false;
    },

    addDeveloper() {
      const newDeveloperName = ["developer1", "developer2", "developer3","developer4","developer5"]; 

      // Push the new developer name into the array
      this.newProduct.developers.push(newDeveloperName);
    },

    // newProduct being emitted from AddProductModal component
    addProduct(newProduct) {
    // Add validation logic here if needed

    // Make a POST request to add the new product to the server
    this.$axios.post('/api/products', newProduct)
      .then(response => {
        // Add the new product to the local array
        this.products.push(response.data);

        // Close the modal
        this.closeModal();

        // Optionally, you can clear the form fields
        this.newProduct = {
          productName: '',
          scrumMasterName: '',
          productOwnerName: '',
          developers: [],
          startDate: '',
          methodology: 'Agile',
        };
      })
      .catch(error => {
        console.error('Error adding product:', error);
      });
    },

    saveEdit(editedProduct){

      console.log("editedProduct",editedProduct);
      // Add validation logic here if needed

      // Make a PUT request to edit the product on the server
      this.$axios.put(`/api/products/${this.editedProduct.productId}`, editedProduct)
      .then(response => {
      // Update the local array with the updated product
      const index = this.products.findIndex(p => p.productId === editedProduct.productId);

      if (index !== -1) {
        this.$set(this.products, index, response.data);
      }

      // Close the modal
      this.isEditModalOpen = false;
      this.editedProduct = null;

      })
      .catch(error => {
        console.error('Error editing product:', error);
      });
    },

    

    
      
  },

};
</script>
