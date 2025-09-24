const axios = require('axios');
const { app, sequelize, Product, PORT } = require('./app');
let server;

const BASE_URL = `http://localhost:${PORT}`;
beforeAll(async () => {
  // Start Express server and initialize DB
  server = app.listen(PORT);
  await sequelize.sync({ force: true });
});

afterAll(async () => {
  // Close DB connection and server
  await sequelize.close();
  server.close();
});

afterEach(async () => {
  // Clear product data after each test
  // Use truncate to empty the table
  // Reset auto-incrementing IDs
  await Product.destroy({ truncate: true, restartIdentity: true });
});

test('GET /products returns empty array initially', async () => {
  const res = await axios.get(`${BASE_URL}/products`);
  expect(res.status).toBe(200);
});

test('POST /products creates a new product', async () => {
  const newProduct = {
    name: 'Banana', productTypeId: 2, colourIds: [1, 2]
  };
  const res = await axios.post(`${BASE_URL}/products`, newProduct);
  expect(res.status).toBe(201);
  expect(res.data.name).toBe('Banana');
});

test('GET /products/:id returns the created product', async () => {
  const newProduct = {
    name: 'Banana', productTypeId: 4, colourIds: [3, 4]
  };
  const res1 = await axios.post(`${BASE_URL}/products`, newProduct);

  const productId = res1.data.id;
  const res2 = await axios.get(`${BASE_URL}/products/${productId}`);
  expect(res2.status).toBe(200);
  expect(res2.data.name).toBe('Banana');
  expect(res2.data.ProductType.id).toBe(4);
  expect(res2.data.Colours.length).toBe(2);
});

test('GET /products/:id returns 404 for non-existent product', async () => {
  try {
    await axios.get(`${BASE_URL}/products/1`);
  } catch (error) {
    expect(error.response.status).toBe(404);
    expect(error.response.data.error).toBe('Product not found');
  }
});
