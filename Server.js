const express = require("express");
const mongoose = require("mongoose");
const { MongoClient } = require("mongodb");
const app = express();
const cors = require("cors");
const DB = "POC";
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { connectToMongoDB } = require("./mongodbConnection");
const { UserModel } = require("./models/user");

const port = 8000;
app.use(cors());
app.use(express.json());
const URL =
  "mongodb+srv://shashikanth:shashi123@cluster0.yrh9prd.mongodb.net/poc?retryWrites=true&w=majority";
// "mongodb+srv://shashikanth:shashi123@cluster0.yrh9prd.mongodb.net/?retryWrites=true&w=majority";

app.post("/register", async function (req, res) {
  try {
    let userData = await UserModel.findOne({ email: req.body.email });
    if (userData) {
      res.status(400).json({
        error: "email is already in exist",
      });
      return;
    }
    let salt = await bcrypt.genSalt(10);
    let hash = await bcrypt.hash(req.body.password, salt);
    // securing the password by encrypting
    req.body.password = hash;
    await new UserModel(req.body).save();
    res.json({
      message: "User is Registered",
    });
  } catch (error) {
    res.status(400).json(error);
  }
});

app.post("/login", async function (req, res) {
  try {
    let connection = await MongoClient.connect(URL);
    let db = connection.db(DB);

    let user = await db.collection("users").findOne({ email: req.body.email });

    if (user) {
      let isPassword = await bcrypt.compare(req.body.password, user.password);
      if (isPassword) {
        let token = jwt.sign({ _id: user._id }, "asdfghjklzxcvbnm");
        res.json({
          message: "allow",
          token,
          id: user._id,
        });
      } else {
        res.json({
          message: "email or password is incorrect",
        });
      }
    } else {
      res.json({
        message: "email or password is incorrect",
      });
    }
  } catch (error) {
    console.log(error);
  }
});

app.get("/", (req, res) =>
  res.status(200).send("Welcome to server you are connected Now")
);

connectToMongoDB()
  .then(
    app.listen(port, () => console.log(`Server is running in port ${port}`))
  )
  .catch((err) => console.log(err));
