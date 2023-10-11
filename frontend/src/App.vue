<template>
  <div id="app">
    
  <!-- Modal form for adding a product --> 
    <add-product-modal
    :is-open="isModalOpen"
    :add-product="addProduct"
    :close-modal="closeModal"
    :new-product="newProduct"
    ></add-product-modal>
    
    
    <h1>Product List</h1>
    <!-- Button to open the modal -->
    <button @click="openModal" id="addProductBtn">Add Product</button>
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
            {{ product.developers[0] }}
          </tr>
          <tr>
            {{ product.developers[1] }}
          </tr>
          <tr>
            {{ product.developers[2] }}
          </tr>
          <tr>
            {{ product.developers[3] }}
          </tr>
          <tr>
            {{ product.developers[4] }}
          </tr>
        </td>
        <td>{{ product.startDate}}</td>
        <td>{{ product.methodology}}</td>
        <td>{{ product.location}}</td>
        <td><button @click="openEditModal(product.productId)">Edit</button></td>
      </tr>
      <tr><br></tr>
      <tr>
        Total Product Amount: {{ count }}

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
      // Find the product in the array based on productId
      const productToEdit = this.products.find(product => product.productId === productId);

      // Set the editedProduct to the found product
      this.editedProduct = { ...productToEdit };

      this.isEditModalOpen = true;
    },

    closeModal() {
      this.isModalOpen = false;
      this.isEditModalOpen = false;
    },
    
    addDeveloper() {
      const newDeveloperName = ["developer1", "developer2", "developer3","developer4","developer5"]; 

      // Push the new developer name into the array
      this.newProduct.developers.push(newDeveloperName);
    },

    addProduct(newProduct) {
    // POST request to add the new product to the server
    this.$axios.post('/api/products', newProduct)
      .then(response => {
        // Add the new product to the local array
        this.products.push(response.data);

        // Close the modal
        this.closeModal();

        // Clear the form fields
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

<style>
#app {
 width: 100vw;
 height: 100vh;
 z-index: -1;
}

body {
  margin: 0;
  padding: 0;
}

h1 {
  display: flex;
  justify-content: center;
  font-family: Helvetica, sans-serif;
}

table{
border-collapse:collapse;
border:1px solid black;
color: black;
background-color:rgb(238, 238, 249);
margin: 10px;
font-family: Helvetica, sans-serif;
}

table td{
border:1px solid black;
padding: 5px;
}

button {
  border: 2px solid lightgreen;
  border-radius: 2px;
  background-color: rgb(104, 223, 104);
  font-family: Helvetica, sans-serif;
  color: grey;
}

button:hover{
  background-color:rgb(184, 238, 184)
}

#addProductBtn {
  margin: 10px;
}

</style>
