let mongoose = require("mongoose");

const MONGO_URI =
  "mongodb+srv://shashikanth:shashi123@cluster0.yrh9prd.mongodb.net/?retryWrites=true&w=majority";

const connectToMongoDB = async () => {
  mongoose.set("strictQuery", true);
  mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  mongoose.connection.once("open", () => {
    console.log("Connected to MongoDB Successfully!!");
  });
  mongoose.connection.on("error", (err) => {
    console.log("Error::", err);
  });
};

module.exports = { connectToMongoDB };
