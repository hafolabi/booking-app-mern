import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from "./routes/auth.js";
import usersRoute from "./routes/users.js";
import hotelsRoute from "./routes/hotels.js";
import roomsRoute from "./routes/rooms.js";
import cookieParser from "cookie-parser";
import cors from "cors";

dotenv.config();
const app = express();

mongoose
  .connect("mongodb://localhost:27017/booking", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB Connection successfull");
  })
  .catch((err) => {
    console.log(err);
  });

mongoose.connection.on("disconnected", () => {
  console.log("mongoDB disconnected!");
});

const corsOptions = {
  origin: process.env.NODE_ENV === "production" ? "" : "http://localhost:3000",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

// app.set("trust proxy", 1)

//middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));

app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/hotels", hotelsRoute);
app.use("/api/rooms", roomsRoute);

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "something went wrong!";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

app.listen(8800, () => {
  console.log("connected to port 8800");
});
