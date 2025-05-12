const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const cors = require("cors");
const app = express();
const cookieParser = require("cookie-parser");
const connectToDb = require("./db/db");
// const userController = require("./controllers/user.controller");
const userRouter = require("./routes/user.routes");
const captainRouter = require("./routes/captain.routes");
const mapRouter = require("./routes/maps.routes");
const rideRoutes = require("./routes/ride.routes");
connectToDb();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.use("/users", userRouter);
app.use("/captains", captainRouter);
app.use("/maps", mapRouter);
app.use("/rides", rideRoutes)


module.exports = app;
