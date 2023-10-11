# Sarah Keashly ECC DSSB IS24 Code Challenge - Backend

## Description
This repository contains the backend code for the Sarah Keashly ECC DSSB IS24 Code Challenge. The backend is built with Express, and it includes API endpoints for managing products. Additionally, Swagger documentation is integrated for easy API exploration.

## Prerequisites
Before you begin, ensure you have Node.js and npm installed on your machine.

## Installation
Clone the repository:

git clone https://github.com/your-username/sarah-keashly-ecc-dssb-is24-cod-challenge.git

## Navigate to the project directory:

cd sarah-keashly-ecc-dssb-is24-cod-challenge

## Install dependencies:

npm install

## Running the Backend
To start the backend server, run:

npm start

This will start the server at http://localhost:3000. You can explore the Swagger documentation at http://localhost:3000/api/api-docs.

## Running Tests
The project uses Mocha and Chai for testing. To run the tests, use:

npm test

**Please note that these tests will add, edit and remove products from the data.json file, so the product information would need to be updated if you run it more than once. I have left comments in the api.test.js file if you wish to play around with it. 

### Using the generateData.js Script
The generateData.js script is used to generate random product data. To run the script, use:

node generateData.js

This script uses the Faker library to generate random product information, including product names, owner names, developers, start dates, methodologies, and GitHub repository links. The generated data is logged to the console in JSON format.

# Sarah Keashly ECC DSSB IS24 Code Challenge - Frontend

## Description
This respository contains the frontend code for the Sarah Keashly ECC DSSB IS24 Code Challenge. The frontend is built out with Vue.js(v2) framework with components for both add and edit modals. The table component was left in the app.vue file. With more time, I would have created a better looking UI with CSS.  I also want to note that with more time I would have refactored the add and edit modals into one component using v-if to separate out whether or not the component was for the edit or add, however I felt that a working product with Swagger documentation and testing on all endpoints was something I wanted to finish for you.

I was unable to get to the two bonus stories, however would have loved to try to tackle them and might just in the future to complete the whole exercise on my own time. 

## Prerequisites
Before you begin, ensure you have the following installed:

Node.js
Vue CLI

## Open a new Change to the frontend directory:

cd frontend

## Install dependencies:

npm install

## Run the development server:

npm run serve

The application will be accessible at http://localhost:8080 by default.

## Building for Production
To build the application for production:

npm run build
This will generate a dist folder with the compiled and minified files.

## Linting
To lint the project:

npm run lint


## Dependencies
axios: Promise-based HTTP client for the browser and Node.js.
core-js: Modular standard library for JavaScript. Includes polyfills for ECMAScript up to 2023.
swagger-jsdoc: Generates Swagger/OpenAPI documentation from JSDoc comments.
swagger-ui-express: Swagger UI Express middleware for serving Swagger UI.

## Development Dependencies
@babel/core: Babel compiler core.
@babel/eslint-parser: A parser that allows Babel to be used as an ESLint parser.
@vue/cli-plugin-babel: Vue CLI plugin for Babel.
@vue/cli-plugin-eslint: Vue CLI plugin for ESLint.
@vue/cli-service: Vue CLI service for building and serving the app.
eslint: Pluggable JavaScript linter.
eslint-plugin-vue: Official ESLint plugin for Vue.js.
vue-template-compiler: Template compiler for Vue.js.