const express = require('express');
const cors = require("cors");

const { Sequelize, DataTypes } = require('sequelize');
const { readSampleData } = require('./utils');

const path = require('path');

const app = express();

// For development only, to allow requests from the React frontend
app.use(cors({
  origin: "*"
}));
// Parse incoming request bodies as JSON
app.use(express.json());

// Load environment variables from .env file if present
require('dotenv').config({ path: path.resolve(__dirname, './.env') });

// Setup SQLite and create a new Sequelize instance
// The database file path can be configured via the DB_FILE environment variable
// Default to /tmp/products.db if not set
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: process.env.DB_FILE || '/tmp/products.db',
  logging: false
});

// Models
const ProductType = sequelize.define('ProductType', {
  name: { type: DataTypes.STRING, allowNull: false, unique: true }
});

const Colour = sequelize.define('Colour', {
  name: { type: DataTypes.STRING, allowNull: false, unique: true }
});

const Product = sequelize.define('Product', {
  name: { type: DataTypes.STRING, allowNull: false }
});

// Relationships
Product.belongsTo(ProductType); // Product.productTypeId
Product.belongsToMany(Colour, { through: 'ProductColour' });
Colour.belongsToMany(Product, { through: 'ProductColour' });

// Initialize DB and sample data
async function initSqlDatabase() {
  await sequelize.sync({ force: true }); // drops and recreates tables

  // Read sample data from a text file (one product name per line)
  const sampleProductTypeFilePath = path.join(__dirname, './testdata/product-type.txt');
  const productTypeData = readSampleData(sampleProductTypeFilePath);

  // Insert product types to database table
  if (productTypeData.length > 0) {
    await ProductType.bulkCreate(productTypeData.map(name => ({ name })));
  } else {
    console.warn(`No sample data found in: ${sampleProductTypeFilePath}`);
  }

  // Read sample data from a text file (one colour name per line)
  const sampleColourFilePath = path.join(__dirname, './testdata/colour.txt');
  const colourData = readSampleData(sampleColourFilePath);

  // Insert colours to database table
  if (colourData.length > 0) {
    await Colour.bulkCreate(colourData.map(name => ({ name })));
  } else {
    console.warn(`No sample data found in: ${sampleColourFilePath}`);
  }

  console.log('Database initialized with sample data.');
}

// Endpoints/routes
app.get('/products', async (req, res) => {
  const products = await Product.findAll();
  res.json(products);
}); // Returns empty list if no products found

app.get('/products/:id', async (req, res) => {
  const product = await Product.findByPk(req.params.id, {
    include: [ProductType, Colour]
  });
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ error: 'Product not found' });
  }
});

app.post('/products', async (req, res) => {
  const { name, productTypeId, colourIds } = req.body;
  try {
    // NOTE: Sequelize will automatically add the foreign key ProductTypeId
    const product = await Product.create({ name, ProductTypeId: productTypeId });
    if (colourIds && colourIds.length) {
      const colours = await Colour.findAll({
        where: { id: colourIds }
      });
      await product.addColours(colours);
    }
    res.status(201).json(product);
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Start server
const PORT = process.env.PORT || 3000;

initSqlDatabase().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
});

module.exports = { app, sequelize, ProductType, Product, Colour, PORT };
