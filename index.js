const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const mongoose = require("mongoose");
const connectDB = require("./db");
const cors = require("cors");

connectDB();

app.use(cors()); 
app.use(express.json());
const createUserRoute = require("./Routes/CreateUser");
const displayData = require("./Routes/DisplayData");
app.use("/api", createUserRoute);
app.use("/api", displayData);
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
