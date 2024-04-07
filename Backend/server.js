require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const PORT = process.env.PORT || 3500;
const { logger } = require("./middleware/logger");
const mongoose = require("mongoose");
const connectDB = require("./config/bdConn");

console.log(process.env.NODE_ENV);

connectDB();

app.use(logger);

app.use(express.json());

app.use(express.static(path.join(__dirname, "public")));

app.use("/", require("./routes/root"));
app.use("/products", require("./routes/productRoute"));
app.use("/users", require("./routes/userRoutes"));

app.all("*", (req, res) => {
  res.status(404).sendFile(path.join(__dirname, "views", "404.html"));
});

mongoose.connection.once("open", () => {
  console.log("Connected to mongoDB");
  app.listen(PORT, () => console.log(`Server running on port ${PORT}...`));
});
