const connectDB = require("./db");
connectDB();

const cors = require("cors");

// express
const express = require("express");
const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

// Available Routes
app.use("/api/v1", require("./routes/auth.js"));

// home route
app.get("/", (req, res) => {
  res.send("Hello World");
});

// listen to port
app.listen(port, () => {
  console.log(`api listening at port ${port}`);
});
