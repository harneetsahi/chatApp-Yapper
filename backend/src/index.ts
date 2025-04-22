import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

import { app, server } from "./socket";
import authRouter from "./routes/auth.route";
import messageRouter from "./routes/message.route";
import { connectDB } from "./db/db";

const PORT = process.env.PORT || 3001;

app.use(express.json({ limit: "2mb" }));
app.use(
  express.urlencoded({ limit: "2mb", extended: true, parameterLimit: 2000 })
);

app.use(cookieParser());
app.use(
  cors({
    origin:
      process.env.NODE_ENV === "production"
        ? false
        : ["http://localhost:5173", "http://127.0.0.1:5173"],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
    preflightContinue: false,
    optionsSuccessStatus: 204,
  })
);

app.use("/api/auth", authRouter);
app.use("/api/message", messageRouter);

server.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
  connectDB();
});
