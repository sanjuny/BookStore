const express = require("express");
const {create,login, createOrder, getOrders} = require("../controllers/customerController");
const router = express.Router();

router.post("/login", create);
router.post("/confirmlogin", login);
router.post("/orderdata", createOrder);
router.get("/getorder",getOrders);


module.exports = router;
