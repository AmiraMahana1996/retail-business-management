import bcrypt from "bcrypt"
import express from "express"
import cors from "cors"
import jwt from "jsonwebtoken"
import config from './config.json'  with { type: "json" };
import mongoose from "mongoose";
import dotenv from 'dotenv';
import userRoutes from "./routes/user.route.js"
import productRoutes from "./routes/product.route.js"
dotenv.config()

mongoose.connect(config.connectionString);
export const app = express();

app.use(express.json());
app.use(cors({ origin: "*" }));
app.use("/api/user",userRoutes);
app.use("/api/product",productRoutes);

app.get("/", async (req, res) => {
  return res.status(200).json({ message: "hello" });
});

app.listen(6000);

