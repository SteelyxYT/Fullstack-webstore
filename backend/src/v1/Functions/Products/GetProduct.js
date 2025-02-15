const database = require('../../Data/Database');

async function GetProduct(req, res) {
  try {
    const connection = await database.connect();
    const products = await connection.query('SELECT * FROM products;');
    await connection.end();
    res.send(products[0]);
  } catch (error) {
    console.error('Error getting products:', error);
    res.status(500).send('Error getting products');
  }
}

async function GetProductId(req, res) {
  try {
    const connection = await database.connect();
    const products = await connection.query('SELECT * FROM products WHERE ProductID = ?;', [Number.parseInt(req.params.id)]);
    await connection.end();
    res.send(products[0]);
  } catch (error) {
    console.error('Error getting products:', error);
    res.status(500).send('Error getting products');
  }
}

async function GetProductName(req, res) {
  try {
    if (!req.params.name) {
      return res.status(400).send('Missing name parameter');
    }
    const connection = await database.connect();
    const products = await connection.query('SELECT * FROM products WHERE ProductName LIKE ?;', ["%"+req.params.name+"%"]);
    await connection.end();
    res.send(products[0]);
  } catch (error) {
    console.error('Error getting products:', error);
    res.status(500).send({error: 'Error getting products'});
  }
}

module.exports = {GetProduct, GetProductId, GetProductName};