const express = require('express');
const bodyParser = require('body-parser');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');
const cors = require('cors');

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

// ... existing routes ...

// Sample data
const products = [
  {
    "productId": "c7524f22-5748-4122-babd-2d56171b810c",
    "productName": "Rustic Steel Gloves",
    "productOwnerName": "Randy Gerhold",
    "developers": [
      "Mrs. Madeline Littel",
      "Dr. Mercedes Howe",
      "Jo Goyette",
      "Jesus Lebsack",
      "Julius Anderson"
    ],
    "scrumMasterName": "Guadalupe Morissette",
    "startDate": "2023-01-16",
    "methodology": "Waterfall",
    "location": "https://github.com/bcgov/sequi"
  },
  {
    "productId": "5339b0b0-7a5d-4b59-b16e-cbec40775acf",
    "productName": "Sleek Plastic Computer",
    "productOwnerName": "Kevin Stoltenberg",
    "developers": [
      "Jill Windler",
      "Emmett Legros",
      "Omar Pfeffer DVM",
      "Miranda Rohan",
      "Miss Eva Kassulke"
    ],
    "scrumMasterName": "Devin Jacobs",
    "startDate": "2023-01-09",
    "methodology": "Waterfall",
    "location": "https://github.com/bcgov/magnam"
  },
  {
    "productId": "27036f08-0998-4633-a0f4-e11d7996a492",
    "productName": "Tasty Wooden Ball",
    "productOwnerName": "Howard Corwin",
    "developers": [
      "Nathaniel Jacobi Jr.",
      "Gilbert Littel",
      "Sabrina Jones",
      "Noah Schultz",
      "Michelle Schowalter"
    ],
    "scrumMasterName": "Mr. Freda Ratke",
    "startDate": "2023-03-10",
    "methodology": "Waterfall",
    "location": "https://github.com/bcgov/necessitatibus"
  },
  {
    "productId": "2f5d178c-3f18-4b24-958d-7385af0fff38",
    "productName": "Refined Frozen Tuna",
    "productOwnerName": "Devin Larkin",
    "developers": [
      "Raquel Johns",
      "Terrence Ernser",
      "Judith Bernhard",
      "Jeffery Conn",
      "Antoinette Borer"
    ],
    "scrumMasterName": "Eric Kozey",
    "startDate": "2022-10-25",
    "methodology": "Agile",
    "location": "https://github.com/bcgov/inventore"
  },
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
