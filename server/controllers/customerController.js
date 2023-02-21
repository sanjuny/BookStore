const db = require("../models");
const Customer = db.userdata;
const Orderbook = db.orderdata;
// const jwt = require('jsonwebtoken')

/* ----------------------------- CREATE ACCOUNT ----------------------------- */

module.exports.create = async (req, res, next) => {
  try {
    const Email = req.body.Email;
    const isexist = await Customer.findOne({ where: { Email: Email } });
    if (isexist) {
      res.status(403).json({ message: "Email already registered!" });
    } else {
      const info = {
        Name: req.body.Name,
        Email: req.body.Email,
        Password: req.body.Password,
        Phone: req.body.Phone,
      };
      await Customer.create(info);
      res.status(200).json({ message: "Account created successfully" });
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
};

// /* --------------------- FUNCTIONS TO GENERATE A TOKENS --------------------- */

// const generateAccessToken = (isexist) => {
//   return jwt.sign({id:isexist},)
// }

/* ------------------------------- USER LOGIN ------------------------------- */

let userId = "";
module.exports.login = async (req, res, next) => {
  try {
    const Email = req.body.Email;
    const Password = req.body.Password;

    const customer = await Customer.findOne({
      where: { Email: Email, password: Password },
    });
    if (!customer) {
      res.status(401).json({ message: "Invalid email or password" });
    } else {
      userId = customer["id"];
      console.log(userId, "req.session.userId");
      res.status(200).json({ message: "Login successful", customer: customer });
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
};

/* ------------------------------ CREATE ORDER ------------------------------ */

module.exports.createOrder = async (req, res) => {
  try {
    const bookId = req.body.bookId;

    const details = {
      userId: userId,
      title: req.body.title,
      publishdate: req.body.publishdate,
      description: req.body.description,
      price: req.body.price,
      image: req.body.image,
    };

    const customer = await Customer.findOne({ userId });
    if (!customer) {
      res.status(401).json({ message: "Customer not found" });
    } else {
      const order = await Orderbook.create(details);
      res
        .status(200)
        .json({
          message: "Order created successfully",
          order: order,
          userId: userId,
        });
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
};

/* ------------------------------ GET ALL ORDER ----------------------------- */

module.exports.getOrders = async (req, res) => {
  try {
    const userId = req.session.userId;

    const customer = await Customer.findOne({userId});

    if (!customer) {
      res.status(401).json({ message: "Customer not found" });
    } else {
      const orders = await Orderbook.findAll({
        order: [["createdAt", "DESC"]],
      });
      res
        .status(200)
        .json({ message: "Orders retrieved successfully", orders: orders });
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
};
