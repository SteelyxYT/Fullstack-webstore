const database = require('../../Data/Database.js');

module.exports = async (req, res) => {

    try {
        if (!req.body.Name || !req.body.Email || !req.body.Password || !req.body.Address) {
            return res.status(400).send('Missing required fields');
        }
        const connection = await database.connect();
        const user = await connection.query('INSERT INTO `users` (Name, PriviledgeID, Email, Password, Address) VALUES (?, ?, ?, ?, ?);', [req.body.Name, 0, req.body.Email, btoa(req.body.Password), req.body.Address]);
        await connection.end();
        console.log(user);
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).send('Error creating user');
    }

}