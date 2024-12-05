require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const mongoose = require("mongoose");
const PORT = process.env.PORT || 4000;
const MONGO_URL =
  process.env.MONGO_URL || "mongodb://localhost:27017/userManagement";
const api = require("./routes/route");

var corsOption = {
  origin: true,
  methods: "GET,POST,HEAD,PATCH,PUT,DELETE",
  credentials: true,
  exposedHeaders: [
    "Access-Control-Allow-Origin",
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, access-token",
  ],
};

mongoose.connect(MONGO_URL).catch(console.log("DB Connected !!", MONGO_URL));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(cors(corsOption));

app.get("/", (req, res) => {
  res.send("Welcome to Server");
});

app.use("/", api);

app.listen(PORT, () => {
  console.log("Server running on Port no: ", PORT);
});
