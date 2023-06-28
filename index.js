const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const connectDB = require("./db");
connectDB();

// express
const express = require("express");
const app = express();
const port = process.env.PORT
const cookieParser = require("cookie-parser");
const CustomError = require("./errors/CustomError");
const GlobalErrorHandler = require("./middleware/GlobalErrorHandler");

app.use(cors());
app.use(cookieParser());
app.use(express.json());

// Available Routes
app.use("/api/v1/auditmngmnt/", require("./routes/auth.js"));

// home route
app.get("/", (req, res) => {
  res.send("Hello World");
});

// throw error for wrong route
app.all("*", (req, res, next) => {
  throw new CustomError(404, false, "Route not found");
});

// handling error using express Global Error Handler
app.use(GlobalErrorHandler);

// listen to port
app.listen(port, () => {
  console.log(`api listening at port ${port}`);
});
