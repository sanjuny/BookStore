/* -------------------------------- abhi jwt -------------------------------- */

// const jwt = require("jsonwebtoken");

// const verifyApi = (req, res, next) => {
//   console.log("hyyyyyyy");
//   const authHeader = req.headers.Authorization;
//   console.log(authHeader, "headerrrr");
//   if (authHeader) {
//     const token = authHeader.split(" ")[1];
//     jwt.verify(token, process.env.JWT_ACCESS_SCERET_KEY, (err, user) => {
//       if (err) {
//         return res.status(403).json({ message: "Your Api key is not valid" });
//       }
//       req.user = user;
//       next();
//     });
//   } else {
//     res.status(401).json({ message: "you are not authenticated!" });
//   }
// };

// module.exports = verifyApi;


/* --------------------------------- my jwt --------------------------------- */

// const jwt = require("jsonwebtoken");


// const check = async (req, res, next) => {
//   try {
//     let token = req.headers.accesstoken;
//     if (token) {
//     }
//     const user = jwt.verify(token, process.env.JWT_ACCESS_SCERET_KEY);

//     if (user) {
//       req.user = user;
//       next();
//     } else {
//       res.send({ status: "errors", data: "no user" });
//     }
//   } catch (error) {
//     res.status(500).json({ status: "errors", data: error.message });
//   }
// };

// module.exports = check;

/* ------------------------------- beffin jwt ------------------------------- */

const createError = require("http-errors");
const jwt = require("jsonwebtoken");

const verifyJwt = (req, res, next) => {
  try {
    //checking if the cookies found in header
    if (req.headers.accesstoken) {
      const token = req.headers.accesstoken;

      //verfiying authToken with jwt
      jwt.verify(token, process.env.JWT_ACCESS_SCERET_KEY, (err, user) => {
        if (err) throw createError.Unauthorized(err);

        //putting that user to request header to access in the protected route
        req.user = user;

        //go to next
        next();
      });
    } else {
      //throwing error if there is no cookies in header
      throw createError.NotFound("No accessToken in header");
    }
  } catch (error) {
    //if any thing goes wrong with the try block send errors to the client
    res
      .status(error.status || 500)
      .json({
        success: false,
        message: error.message || "Something went wrong",
      });
  }
};

module.exports = { verifyJwt };
