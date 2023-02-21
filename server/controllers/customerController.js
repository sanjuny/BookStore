const db = require("../models");
const Customer = db.userdata;
const Orderbook = db.orderdata;
const jwt = require("jsonwebtoken");
const {
  genAccessToken,
  genRefreshToken,
} = require("../helpers/jwtAuthentication");
let refreshTokenArray = [];

/* ----------------------------- CREATE ACCOUNT ----------------------------- */

module.exports.create = async (req, res, next) => {
  try {
    const Email = req.body.Email;
    const user = await Customer.findOne({ where: { Email: Email } });
    if (user) {
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

/* ------------------------------ rferesh token ----------------------------- */

module.exports.refreshToken = async (req, res, next) => {
  const user = {
    Name: req.body.Name,
    Email: req.body.Email,
    Password: req.body.Password,
    Phone: req.body.Phone,
  };

  try {
    const { refToken } = req.body;

    //if there is no ref token throwing err
    if (!refToken)
      throw createHttpError.InternalServerError("no refresh token found");

    //get the ref token from the array with
    if (!refreshTokenArray.includes(refToken)) {
      throw createError.Unauthorized("Invalid refresh token");
    }

    //verify the ref token from array
    jwt.verify(
      refToken,
      process.env.JWT_REFRESH_TOKEN_SECRET,
      async (err, data) => {
        if (err) throw createError.InternalServerError(err);

        //black listing the used refresh token
        refreshTokenArray = refreshTokenArray.filter(
          (item) => item != refToken
        );

        //if it matches create a new pair of auth token and refresh token
        const accessToken = await genAccessToken(user);
        const refreshToken = await genRefreshToken(user);

        //saving the new refresh token to array
        refreshTokenArray.push(refreshToken);

        //sending response to the client
        res.status(200).json({
          success: true,
          message: "new pair of tokens created",
          refreshToken,
          accessToken,
        });
      }
    );
  } catch (error) {
    next(error);
  }
};

/* ------------------------------- USER LOGIN ------------------------------- */

module.exports.login = async (req, res, next) => {
  try {
    const Email = req.body.Email;
    const Password = req.body.Password;

    const user = await Customer.findOne({
      where: { Email: Email, password: Password },
    });
    if (!user) {
      res.status(401).json({ message: "Invalid email or password" });
    } else {
      // generating acess-token and refresh-token
      const accessToken = await genAccessToken(user);
      const refreshToken = await genRefreshToken(user);

      // set the refresh-token in to an array
      refreshTokenArray.push(refreshToken);

      res
        .status(200)
        .json({ success: true, refreshToken, accessToken, user: user.id });
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
};

/* ------------------------------ CREATE ORDER ------------------------------ */

module.exports.createOrder = async (req, res) => {
  try {
    let userId = req.body.userId;
    console.log(userId, "sessio");
    const customer = await Customer.findOne({ where: { Id: userId } });
    console.log(customer, "custeoee");

    const details = {
      userId: userId,
      title: req.body.title,
      publishdate: req.body.publishdate,
      description: req.body.description,
      price: req.body.price,
      image: req.body.image,
    };

    if (!customer) {
      res.status(401).json({ message: "Customer not found" });
    } else {
      const order = await Orderbook.create(details);
      res.status(200).json({
        message: "Order created successfully",
        order: order,
        userId: userId,
      });
    }
  } catch (error) {
    console.log(error, "error");
    res.status(500).json(error.message);
  }
};

/* ------------------------------ GET ALL ORDER ----------------------------- */

module.exports.getOrders = async (req, res) => {
  try {
    let userId = req.params.userId;
    const customer = await Orderbook.findOne({ where: { userId: userId } });

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
    console.log(error,'hdhdhdhdh');
    res.status(500).json(error.message);
  }
};
