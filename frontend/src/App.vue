<template>
  <div id="app">
    <h1>Product List</h1>
    <table>
      <!-- Table headers -->
      <tr>
        <th>Product Number</th>
        <!-- ... other headers ... -->
      </tr>

      <!-- Table rows -->
      <tr v-for="product in products" :key="product.productId">
        <td>{{ product.productId }}</td>
        <td>{{ product.productName }}</td>
        <!-- ... other cells ... -->
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      products: [],
    };
  },
  mounted() {
    // Fetch data from the backend on component mount
    this.fetchProducts();
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
  },
};
</script>
