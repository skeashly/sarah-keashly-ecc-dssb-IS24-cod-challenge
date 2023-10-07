const express = require('express');
const bodyParser = require('body-parser');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');

const app = express();
const port = 3000;

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

// ... existing routes ...

// Sample data
const products = [
  // ... your sample products here
];

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
  // Add validation and generate product number here
  products.push(newProduct);
  res.status(201).json(newProduct);
});

// Edit a product
app.put('/api/products/:productId', (req, res) => {
  const productId = req.params.productId;
  const updatedProduct = req.body;
  // Add validation and update logic here
  res.status(200).json(updatedProduct);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
