const database = require('../../Data/Database.js');


module.exports = async (req, res) => {

    const auth = req.headers.authorization;
  
    const target = req.params.id;
  
    if (!target ) {
      return res.status(400).send({error: 'Missing product ID'});
    }
  
    if (!auth) {
      return res.status(401).send({error: 'Unauthorized'});
    }

    try {
      const connection = await database.connect();
  
      const [user] = await connection.query('SELECT * FROM `users` WHERE UserID = ?;', [Number.parseInt(auth)]);
      if (user[0].PriviledgeID !== 0) {
        await connection.end();
        return res.status(401).send({error: 'Unauthorized'});
      }
      
      const [ordersConstraint] = await connection.query('DELETE FROM `orders` WHERE ProductID = ?;', [Number.parseInt(target)]);
      
      const [result] = await connection.query('DELETE FROM `products` WHERE ProductID = ?;', [Number.parseInt(target)]);
      await connection.end();
      await res.send(result[0]);
    } catch (error) {
      console.error('Error deleting user:', error);
      await res.status(500).send({error: 'Error deleting user'});
    }

};
