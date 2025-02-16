const database = require("../../Database/MemoryDatabase");

module.exports = async (req, res) => {
    const { name, email, pass, address } = req.body

    if (!name || !email || !pass || !address) return res.status(400).send("Missing required fields");

    try {

        const connection = database.connect();
        const [user] = await connection.query('SELECT * FROM `users` WHERE UserID = ?;', [req.params.id]);
        if (user[0].PriviledgeID !== 0) {
            await connection.end();
            return res.status(401).send({ error: 'Unauthorized' });
        }

        const userUpdate = await connection.query('UPDATE `users` SET Name = ?, Email = ?, Password = ?, Address = ? WHERE UserID = ?;', [name, email, Buffer.from(pass).toString("base64"), address, req.params.id]);
        await connection.end();
        
    } catch (error) {
        console.error('Error updating product:', error);
        return res.status(500).send({ error: 'Error updating product' });
    }

}