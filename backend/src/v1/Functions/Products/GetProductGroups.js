const database = require('../../Data/Database');

async function GetCategories(req, res) {
  try {
    const connection = await database.connect();
    const categories = await connection.query('SELECT * FROM categories;');
    await connection.end();
    res.send(categories[0]);
  } catch (error) {
    console.error('Error getting categories:', error);
    res.status(500).send({error: 'Error getting categories'});
  }
}

module.exports = {GetCategories};