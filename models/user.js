const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "username is required"],
    },

    email: {
      type: String,
      required: [true, "email is required"],
      unique: [false, "email is already exists"],
      lowercase: true,
    },
    phone: String,
    date: String,
    gender: String,
    password: {
      type: String,
      required: [true, "password is required"],
    },
  },
  { versionKey: false }
);
const UserModel = mongoose.model("User", userSchema);
module.exports = { UserModel };
