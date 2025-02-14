const database = require('../../Data/Database.js');

module.exports = async (req, res) => {

    const auth = req.headers.authorization;

    try {
        const connection = await database.connect();

        const [user] = await connection.query('SELECT * FROM `users` WHERE UserID = ?;', [Number.parseInt(auth)]);
        if (user[0].PriviledgeID !== 2) {
          await connection.end();
          return res.status(401).send('Unauthorized');
        }

        if (!req.body.ProductName || !req.body.Description || !req.body.Price || !req.body.Stock || !req.body.CategoryID) {
            await connection.end();
            return res.status(400).send('Missing fields');
        }
        const product = await connection.query('INSERT INTO `products` (ProductName, Description, Price, Stock) VALUES (?, ?, ?, ?);', [req.body.ProductName, req.body.Description, req.body.Price, req.body.Stock, req.body.CategoryID]);
        await connection.end();
        res.send(product[0]);
    } catch (error) {
        console.error('Error creating product:', error);
        res.status(500).send('Error creating product');
    }
}