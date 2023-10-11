// test/api.test.js

//npm test to run testing suite

const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../server'); // Adjust the path based on your project structure

const { expect } = chai;
chai.use(chaiHttp);

describe('API Endpoints', () => {
  describe('GET /api/health', () => {
    it('should return status 200 and "API is healthy"', (done) => {
      chai
        .request(app)
        .get('/api/health')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.text).to.equal('API is healthy');
          done();
        });
    });
  });

  describe('GET /api/products', () => {
    it('should return status 200 and an array of products', (done) => {
      chai
        .request(app)
        .get('/api/products')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('array');
          done();
        });
    });
  });

  describe('POST /api/products', () => {
    it('should add a new product and return status 201', (done) => {
      const newProduct = {
        // Provide data for your new product
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
      };

      chai
        .request(app)
        .post('/api/products')
        .send(newProduct)
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.body).to.deep.equal(newProduct);
          done();
        });
    });
  });

  describe('PUT /api/products/:productId', () => {
    it('should edit an existing product and return status 200', (done) => {
      // Get an existing product ID (you need to replace 'yourProductId' with an actual ID)
    const productId = 'c7524f22-5748-4122-babd-2d56171b810c';


    // Update any of the below Object items, and it will update the data.json
    const updatedProductData = {
       "productId": "c7524f22-5748-4122-babd-2d56171b810c",
        "productName": "Rustic Steel Gloves",
        "productOwnerName": "Randy Gerhold",
        "developers": [
          "Mrs. Madeline Littel",
          "Dr. Mercedes Howe",
          "Jo Goyette",
          "Jesus Lebsack",
          "Julius Sanderson"
        ],
        "scrumMasterName": "Guadalupe Morissette",
        "startDate": "2023-01-16",
        "methodology": "Waterfall",
        "location": "https://github.com/bcgov/sequi" 
    };

      chai
        .request(app)
        .put(`/api/products/${productId}`)
        .send(updatedProductData)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.deep.equal(updatedProductData);
          done();
        });
    });
  });

  describe('DELETE /api/products/:productsId', () => {
    const productId = '532cf829-96c0-46ad-b780-78e498d2010b';

    it('should delete a product and return status 200', (done) => {
      const existingProduct = {
        "productId": "532cf829-96c0-46ad-b780-78e498d2010b",
        "productName": "Rustic Rubber Sausages",
        "productOwnerName": "Kristy Koepp",
        "developers": [
          "Leigh Kertzmann",
          "Carl Stoltenberg",
          "Carrie Leannon",
          "Marian Collier",
          "Lena Ward"
        ],
        "scrumMasterName": "Darrel Conroy",
        "startDate": "2023-10-07",
        "methodology": "Waterfall",
        "location": "https://github.com/bcgov/consequatur"
      }

      chai
        .request(app)
        .delete(`/api/products/${productId}`)
        .send(existingProduct)
        .end((err, res) => {
          expect(res).to.have.status(200);
          done();
        });
    });
  });

});

