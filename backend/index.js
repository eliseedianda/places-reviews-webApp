const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = express();
const placeRoute = require("./routes/places");
const userRoute = require("./routes/users");
dotenv.config();
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("MongoDB Connected!");
  })
  .catch((err) => console.log(err));

app.use("/api/users", userRoute);
app.use("/api/places", placeRoute);

app.listen(8800, () => {
  console.log("Backend checked!OK");
});
