<template>
  <div id="app">

    <!-- Button to open the modal -->
    <button @click="openModal">Add Product</button>

        <!-- Modal form for adding new product -->
        <div v-if="isModalOpen" class="modal">
      <div class="modal-content">
        <span class="close" @click="closeModal">&times;</span>

        <!-- Form for adding a new product -->
        <form @submit.prevent="addProduct">
          <label for="productName">Product Name:</label>
          <input type="text" v-model="newProduct.productName" required>

          <label for="scrumMasterName">Scrum Master:</label>
          <input type="text" v-model="newProduct.scrumMasterName" required>

          <label for="productOwnerName">Product Owner:</label>
          <input type="text" v-model="newProduct.productOwnerName" required>

          <label for="developer1">Developer 1:</label>
          <input type="text" v-model="newProduct.developers[0]" placeholder="Developer 1" required>

          <label for="developer2">Developer 2:</label>
          <input type="text" v-model="newProduct.developers[1]" placeholder="Developer 2">

          <label for="developer3">Developer 3:</label>
          <input type="text" v-model="newProduct.developers[2]" placeholder="Developer 3">

          <label for="developer4">Developer 4:</label>
          <input type="text" v-model="newProduct.developers[3]" placeholder="Developer 4">

          <label for="developer5">Developer 5:</label>
          <input type="text" v-model="newProduct.developers[4]" placeholder="Developer 5">

          <label for="startDate">Start Date:</label>
          <input type="date" v-model="newProduct.startDate" required>

          <label for="methodology">Methodology:</label>
          <select v-model="newProduct.methodology" required>
            <option value="Agile">Agile</option>
            <option value="Waterfall">Waterfall</option>
          </select>

          <button type="submit">Add Product</button>
        </form>
      </div>
    </div>

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
    <div v-if="isEditModalOpen" class="modal">
      <div class="modal-content">
        <span class="close" @click="closeModal">&times;</span>
        <h2>Edit Product</h2>
        <!-- Form for editing a product -->
        <form @submit.prevent="saveEdit">
          <label for="productName">Product Name:</label>
          <input type="text" v-model="editedProduct.productName">

          <label for="scrumMasterName">Scrum Master:</label>
          <input type="text" v-model="editedProduct.scrumMasterName">

          <label for="productOwnerName">Product Owner:</label>
          <input type="text" v-model="editedProduct.productOwnerName" >

          <label for="developer1">Developer 1:</label>
          <input type="text" v-model="editedProduct.developers[0]" placeholder="Developer 1">

          <label for="developer2">Developer 2:</label>
          <input type="text" v-model="editedProduct.developers[1]" placeholder="Developer 2">

          <label for="developer3">Developer 3:</label>
          <input type="text" v-model="editedProduct.developers[2]" placeholder="Developer 3">

          <label for="developer4">Developer 4:</label>
          <input type="text" v-model="editedProduct.developers[3]" placeholder="Developer 4">

          <label for="developer5">Developer 5:</label>
          <input type="text" v-model="editedProduct.developers[4]" placeholder="Developer 5">

          <label for="startDate">Start Date:</label>
          <input type="date" v-model="editedProduct.startDate" >

          <label for="methodology">Methodology:</label>
          <select v-model="editedProduct.methodology" >
            <option value="Agile">Agile</option>
            <option value="Waterfall">Waterfall</option>
          </select>

          <button type="submit">Save</button>
        </form>
      </div>
    </div>
  </div> 
</template>

<script>
export default {
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
      console.log("open modal")
      this.isModalOpen = true;
    },
    openEditModal(productId) {
      console.log("open edit modal")

      // Find the product in the array based on productId
      const productToEdit = this.products.find(product => product.productId === productId);

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

    addProduct() {
    // Add validation logic here if needed

    // Make a POST request to add the new product to the server
    this.$axios.post('/api/products', this.newProduct)
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

    saveEdit(){
      console.log("saveEdit");
      // Add validation logic here if needed

      // Make a PUT request to edit the product on the server
      this.$axios.put(`/api/products/${this.editedProduct.productId}`, this.editedProduct)
      .then(response => {
      // Update the local array with the updated product
      const index = this.products.findIndex(p => p.productId === this.editedProduct.productId);

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
