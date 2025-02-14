const router = require("express").Router()
const CreateUser = require("../Functions/Users/CreateUser")
const GetUser = require("../Functions/Users/GetUser")

router.post("/register", CreateUser)

router.post("/login")

router.get("/me", GetUser)

module.exports = router