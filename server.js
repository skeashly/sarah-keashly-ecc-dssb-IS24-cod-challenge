const express = require('express');
const bodyParser = require('body-parser');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');
const cors = require('cors');
const fs = require('fs');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

// Swagger definition
const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'ECC Products API',
    version: '1.0.0',
    description: 'API for managing ECC products',
  },
};

// Options for the swagger docs
const options = {
  swaggerDefinition,
  apis: ['./server.js'], // Point to the file that contains the routes
};

// Initialize swagger-jsdoc
const swaggerSpec = swaggerJSDoc(options);

// Serve Swagger documentation
app.use('/api/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));


// Read the products from the JSON file
const productsFilePath = './data.json';
let products = [];

try {
  const productsData = fs.readFileSync(productsFilePath, 'utf-8');
  products = JSON.parse(productsData);
} catch (error) {
  console.error('Error reading products file:', error);
}

// Health endpoint
app.get('/api/health', (req, res) => {
  res.status(200).send('API is healthy');
});

// Get all products
app.get('/api/products', (req, res) => {
  res.json(products);
});


// Add a new product
app.post('/api/products', (req, res) => {
  const newProduct = req.body;
  products.push(newProduct);

  // Save updated data to the JSON file
  fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2));

  res.status(201).json(newProduct);
});

// Edit a product
app.put('/api/products/:productId', (req, res) => {
  const productId = req.params.productId;
  const updatedProduct = req.body;

  // Find the index of the product to update
  const index = products.findIndex(p => p.productId === productId);

  if (index !== -1) {
    // Update the product
    products[index] = updatedProduct;

    try {
      // Save updated data to the JSON file
      fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2));
      res.status(200).json(updatedProduct);
    } catch (error) {
      console.error('Error writing to file:', error);
      res.status(500).send('Internal Server Error');
    }
  } else {
    res.status(404).send('Product not found');
  }
});

// Delete a product // Tested via curl - curl -X DELETE http://localhost:3000/api/products/{productId}
app.delete('/api/products/:productId', (req, res) => {
  const productId = req.params.productId;
  // Find the index of the product
  const index = products.findIndex(p => p.productId === productId);
  if (index !== -1) {
    // Remove the product from the array
    products.splice(index, 1);
    fs.writeFileSync('data.json', JSON.stringify(products, null, 2), 'utf-8');
    res.status(200).send('Product deleted');
  } else {
    res.status(404).send('Product not found');
  }
});


// Load data from file on server start
function loadDataFromFile() {
  try {
    const data = fs.readFileSync('data.json', 'utf-8');
    products = JSON.parse(data);
  } catch (error) {
    console.error('Error reading data from file:', error.message);
  }
}

// Load initial data from file on server start
loadDataFromFile();

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
