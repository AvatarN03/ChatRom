import express from "express";
import authRouter from "../routes/auth.router.js";
import messsageRouter from "../routes/message.route.js";
import dotenv from "dotenv";
import connectDB from "../utils/db.js";
import cookie_parser from "cookie-parser";
import cors from "cors";
import { app, server } from "../utils/socket.js";

dotenv.config();


const PORT = process.env.PORT || 5000;
connectDB();
app.use(express.json({ limit: "10mb" })); // Increase from default 1mb to 10mb
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use(cookie_parser());
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
  })
);

app.use("/api/auth", authRouter);
app.use("/api/messages", messsageRouter);

server.listen(PORT, () => console.log(`Server is running in ${PORT}`));
