const express = require("express")
const cors = require("cors")
const app = express()

app.use(cors())
app.use(express.json())
app.use("/api/v1/products", require("./v1/Routes/productRoutes"))
app.use("/api/v1/users", require("./v1/Routes/userRoutes"))


module.exports = app