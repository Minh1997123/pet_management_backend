import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import petRouter from "./router/pet";
import IO from "./socket-io";
const app = express();
dotenv.config();
app.use(
  cors({
    origin: process.env.ORIGIN?.split(",") || "http://localhost:3000",
  })
);

app.use(express.json());
// pet
app.use(petRouter);

const url = process.env.DATABASE_URL as string;
mongoose
  .connect(url)
  .then(() => {
    const server = app.listen(process.env.PORT || 5000);
    const IO_ON = IO.init(server);
    IO_ON.on("connection", (socket) => {
      console.log("a user connected");
    });
  })
  .catch((err) => {
    console.log(err);
  });
