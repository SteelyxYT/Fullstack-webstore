const database = require('../../Data/Database.js');

async function GetUser(req, res) {

  const auth = req.headers.authorization;

  try {
    const connection = await database.connect();
    const [result] = await connection.query('SELECT * FROM users WHERE UserID = ?;', [Number.parseInt(auth)]);
    await connection.end();
    await res.send(result[0]);
  } catch (error) {
    console.error('Error getting user:', error);
    await res.status(500).send('Error getting user');
  }
}

module.exports = GetUser;
