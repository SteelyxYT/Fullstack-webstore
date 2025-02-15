const database = require('../../Data/Database.js');

module.exports = async (req, res) => {

    const auth = req.headers.authorization;

    try {
        const connection = await database.connect();

        const [user] = await connection.query('SELECT * FROM `users` WHERE UserID = ?;', [Number.parseInt(auth)]);
        if (user[0].PriviledgeID !== 2) {
          await connection.end();
          return res.status(401).send({error: 'Unauthorized'});
        }

        if (!req.body.ProductName || !req.body.Description || !req.body.Price || !req.body.CategoryID) {
            await connection.end();
            console.log(req.body);
            return res.status(400).send({error: 'Missing atleast 1 of the required fields'});
        }
        const product = await connection.query('INSERT INTO `products` (ProductName, Description, Price, CategoryID) VALUES (?, ?, ?, ?);', [req.body.ProductName, req.body.Description, req.body.Price, req.body.CategoryID]);
        await connection.end();
        res.status(201).send(product[0]);
    } catch (error) {
        console.error('Error creating product:', error);
        res.status(500).send({error: 'Error creating product'});
    }
}