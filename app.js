require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const mongoose = require("mongoose");
const PORT = process.env.PORT || 4000;
const MONGO_URL =
  process.env.MONGO_URL || "mongodb://localhost:27017/tastmanagement";
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

let ingestionStatus = [];

// // API to trigger ingestion
// app.post('/api/trigger-ingestion', (req, res) => {
//     const ingestionId = new Date().getTime(); // Example ID
//     ingestionStatus.push({ id: ingestionId, status: 'In Progress', startTime: new Date() });
//     // Simulate processing
//     setTimeout(() => {
//         const index = ingestionStatus.findIndex((i) => i.id === ingestionId);
//         if (index !== -1) ingestionStatus[index].status = 'Completed';
//     }, 10000); // Example 10-second processing delay
//     res.status(200).send({ message: 'Ingestion started', id: ingestionId });
// });

app.listen(PORT, () => {
  console.log("Server running on Port no: ", PORT);
});
