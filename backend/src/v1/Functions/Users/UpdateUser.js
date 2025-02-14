const MemoryDatabase = require("../../Data/MemoryDatabase")

module.exports = (req, res) => {
    const { name, price, description, image } = req.body

    const status = MemoryDatabase.updateObjectById(Number(req.params.id), { name, price, description, image })

    if (!status) return res.status(404).send("Product not found");
    else return res.send({ message: "Product has been updated", data: status });
}