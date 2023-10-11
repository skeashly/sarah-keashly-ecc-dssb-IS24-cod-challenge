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
/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Get all products
 *     description: Returns a list of all products.
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             example:
 *               - productId: 1
 *                 productName: "Product 1"
 *                 productOwnerName: "Name"
 *                 developers:
 *                   - "Developer1"
 *                   - "Developer2"
 *                   - "Developer3"
 *                   - "Developer4"
 *                   - "Developer5"
 *                 scrumMasterName: "Name"
 *                 startDate: "2023-01-16"
 *                 methodology: "Waterfall"
 *               - productId: 2
 *                 productName: "Product 2"
 *                 productOwnerName: "Name"
 *                 developers:
 *                   - "Developer1"
 *                   - "Developer2"
 *                   - "Developer3"
 *                   - "Developer4"
 *                   - "Developer5"
 *                 scrumMasterName: "Name"
 *                 startDate: "2023-01-16"
 *                 methodology: "Agile"
 */
app.get('/api/products', (req, res) => {
  res.json(products);
});



// Add a new product
/**
 * @swagger
 * /api/products:
 *   post:
 *     summary: Create a new product
 *     description: Add a new product to the server
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *               - productId: 3
 *                 productName: "Product 3"
 *                 productOwnerName: "Name"
 *                 developers:
 *                   - "Developer1"
 *                   - "Developer2"
 *                   - "Developer3"
 *                   - "Developer4"
 *                   - "Developer5"
 *                 scrumMasterName: "Name"
 *                 startDate: "2023-01-16"
 *                 methodology: "Agile"
 *     responses:
 *       '201':
 *         description: The newly created product
 *         content:
 *           application/json:
 *             example:
 *               - productId: 3
 *                 productName: "Product 3"
 *                 productOwnerName: "Name"
 *                 developers:
 *                   - "Developer1"
 *                   - "Developer2"
 *                   - "Developer3"
 *                   - "Developer4"
 *                   - "Developer5"
 *                 scrumMasterName: "Name"
 *                 startDate: "2023-01-16"
 *                 methodology: "Agile"
 */
app.post('/api/products', (req, res) => {
  const newProduct = req.body;
  products.push(newProduct);

  // Save updated data to the JSON file
  fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2));

  res.status(201).json(newProduct);
});

// Edit a product
/**
 * @swagger
 * /api/products/{productId}:
 *   put:
 *     summary: Edit a product
 *     description: Edit a product on the server
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         description: ID of the product to edit
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             productId: 3
 *             productName: "Product 3"
 *             productOwnerName: "Name"
 *             developers:
 *               - "Developer1"
 *               - "Developer2"
 *               - "Developer3"
 *               - "Developer4"
 *               - "Developer5"
 *             scrumMasterName: "Name"
 *             startDate: "2023-01-16"
 *             methodology: "Agile"
 *     responses:
 *       '200':
 *         description: The updated product
 *         content:
 *           application/json:
 *             example:
 *               productId: 3
 *               productName: "Product 3"
 *               productOwnerName: "Name"
 *               developers:
 *                 - "Developer1"
 *                 - "Developer2"
 *                 - "Developer3"
 *                 - "Developer4"
 *                 - "Developer5"
 *               scrumMasterName: "Name"
 *               startDate: "2023-01-16"
 *               methodology: "Agile"
 *       '404':
 *         description: Product not found
 */
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
/**
 * @swagger
 * /api/products/{productId}:
 *   delete:
 *     summary: Delete a product
 *     description: Delete a product on the server
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         description: ID of the product to delete
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             productId: 3
 *             productName: "Product 3"
 *             productOwnerName: "Name"
 *             developers:
 *               - "Developer1"
 *               - "Developer2"
 *               - "Developer3"
 *               - "Developer4"
 *               - "Developer5"
 *             scrumMasterName: "Name"
 *             startDate: "2023-01-16"
 *             methodology: "Agile"
 *     responses:
 *       '200':
 *         description: Product deleted
 *       '404':
 *         description: Product not found
 */
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

module.exports = app;
