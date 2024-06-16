const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const dotenv = require("dotenv");
dotenv.config();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// MongoDB connection
const dbConnect = async () => {
  try {
    await mongoose.connect(`${process.env.mongoUrl}/todos`);
    console.log("MongoDB connected");
  } catch (err) {
    console.log(err);
  }
};

// Routes
const todos = require("./routes/todos");
app.use("/api/todos", todos);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  dbConnect();
  console.log(`Server running on port ${PORT}`);
});
