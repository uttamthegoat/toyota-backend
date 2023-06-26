const mongoose = require("mongoose");

const mongoURI = "mongodb://127.0.0.1:27017/project";

const connectDB = async () => {
  try {
    mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to Mongo succesfully");
  } catch (err) {
    console.error("Error");
  }
};

module.exports = connectDB;