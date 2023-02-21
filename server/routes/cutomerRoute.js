const express = require("express");
const router = express.Router();
const { verifyJwt } = require("../middleware/jwtAuth");

const {
  create,
  login,
  createOrder,
  getOrders,
  refreshToken
} = require("../controllers/customerController");

router.post("/login", create);
router.post("/confirmlogin", login);
router.post("/orderdata", verifyJwt, createOrder);
router.get("/getorder/:userId", verifyJwt, getOrders);
router.post("/refresh-token", refreshToken);

module.exports = router;
