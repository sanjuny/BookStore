const jwt = require("jsonwebtoken");
const createHttpError = require("http-errors");

module.exports.genAccessToken = (user) => {
  return new Promise((resolve, reject) => {
    if (user) {
      resolve(
        jwt.sign({ id: user }, process.env.JWT_ACCESS_SCERET_KEY, {
          expiresIn: "1d",
        })
      );
    }
  });
};

module.exports.genRefreshToken = ({ id }) => {
  return new Promise((resolve, reject) => {
    jwt.sign(
      { id: id },
      process.env.JWT_REFRESH_SCERET_KEY,
      { expiresIn: "7d" },
      async (err, token) => {
        if (err) reject(createHttpError[500]);
        resolve(token);
      }
    );
  });
};
