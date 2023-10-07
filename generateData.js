const faker = require('faker');

const generateRandomProduct = () => {
  const product = {
    productId: faker.datatype.uuid(),
    productName: faker.commerce.productName(),
    productOwnerName: faker.name.findName(),
    developers: Array.from({ length: 5 }, () => faker.name.findName()),
    scrumMasterName: faker.name.findName(),
    startDate: faker.date.past().toISOString().split('T')[0],
    methodology: faker.random.arrayElement(['Agile', 'Waterfall']),
    location: `https://github.com/bcgov/${faker.lorem.word()}`, // Replace with actual GitHub repository link logic
  };

  return product;
};

const generateRandomProducts = (count) => {
  const products = [];
  for (let i = 0; i < count; i++) {
    products.push(generateRandomProduct());
  }
  return products;
};

module.exports = generateRandomProducts(40);
