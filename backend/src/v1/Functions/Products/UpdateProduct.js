const database = require('../../Data/Database.js');

module.exports = async(req, res) => {

    const auth = req.headers.authorization;

    const target = req.params.id;

    if (!target) {
        return res.status(400).send({ error: 'Missing product ID' });
    }

    if (!auth) {
        return res.status(401).send({ error: 'Unauthorized' });
    }

    if (!req.body.ProductName || !req.body.Description || !req.body.Price || !req.body.CategoryID) {
        return res.status(400).send({ error: 'Missing atleast 1 of the required fields' });
    }

    try {
        const connection = await database.connect();

        const [user] = await connection.query('SELECT * FROM `users` WHERE UserID = ?;', [Number.parseInt(auth)]);
        if (user[0].PriviledgeID !== 0) {
          await connection.end();
          return await res.status(401).send({error: 'Unauthorized'});
        }

        const product = await connection.query('UPDATE `products` SET ProductName = ?, Description = ?, Price = ?, CategoryID = ?, Image = ? WHERE ProductID = ?;', [req.body.ProductName, req.body.Description, req.body.Price, req.body.CategoryID, req.body.Image, Number.parseInt(target)]);
        await connection.end();
        await res.send(product[0]);
    } catch (error) {
        console.error('Error updating product:', error);
        res.status(500).send({ error: 'Error updating product' });
    }

}