require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const PORT = 5000;
const session = require("express-session");
app.use(cors());
app.use(express.json());
const oneDay = 1000 * 60 * 60 * 24
app.use(
  session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: oneDay }, // set to true if using HTTPS
  })
);

app.use("/api", require("./routes/cutomerRoute"));

app.listen(PORT, () => {
  console.log(`sever is running ${PORT}`);
});
