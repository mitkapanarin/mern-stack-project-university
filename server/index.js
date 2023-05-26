import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { facultyRoutes } from "./Routes/facultyRoutes.js";
import { universityRoutes } from "./Routes/universityRoutes.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/faculty", facultyRoutes);
app.use("/api/university", universityRoutes);

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

const PORT = process.env.PORT || 5000;
app.listen(process.env.PORT, () =>
  console.log(`Server running on port ${PORT}`)
);
