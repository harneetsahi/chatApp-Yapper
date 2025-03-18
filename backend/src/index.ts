import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import cors from "cors";

import { app, server, io } from "./socket";
import authRouter from "./routes/auth.route";
import messageRouter from "./routes/message.route";
import { connectDB } from "./db/db";

dotenv.config();

const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin:
      `${process.env.NODE_ENV}` === "production"
        ? false
        : ["http://localhost:5173", "http://127.0.0.1:5173"],
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

app.use("/api/auth", authRouter);
app.use("/api/message", messageRouter);

server.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
  connectDB();
});
