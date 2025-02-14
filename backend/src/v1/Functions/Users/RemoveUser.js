
const database = require('../../Data/Database.js');


module.exports = async (req, res) => {
  const auth = req.headers.authorization;

  const target = req.body.UserID;

  try {
    const connection = await database.connect();

    const [user] = await connection.query('SELECT * FROM `users` WHERE UserID = ?;', [Number.parseInt(auth)]);
    if (user[0].PriviledgeID !== 0) {
      await connection.end();
      return res.status(401).send('Unauthorized');
    }

    const [result] = await connection.query('DELETE FROM `users` WHERE UserID = ?;', [Number.parseInt(target)]);
    await connection.end();
    await res.send(result[0]);
  } catch (error) {
    console.error('Error deleting user:', error);
    await res.status(500).send('Error deleting user');
  }
};
