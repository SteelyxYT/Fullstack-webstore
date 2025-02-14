const router = require("express").Router()
const CreateProduct = require("../Functions/Products/CreateProduct")
const { GetProduct, GetProductId, GetProductName } = require("../Functions/Products/GetProduct")
const { GetCategories } = require("../Functions/Products/GetProductGroups")
const RemoveProduct = require("../Functions/Products/RemoveProduct")
const UpdateProduct = require("../Functions/Products/UpdateProduct")

router.post("/", CreateProduct)

router.get("/search/:name", GetProductName)

router.get("/", GetProduct)

router.get("/categories", GetCategories)

router.get("/:id", GetProductId)

router.delete("/:id", RemoveProduct)

router.put("/:id", UpdateProduct)

module.exports = router