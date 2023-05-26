import express from "express";
import { UniversityModel } from "../model/UniversityModel.js";

export const universityRoutes = express.Router();

// create 1 university

universityRoutes.post("/create", async (req, res) => {
  const { name, address } = req.body;
  try {
    const findUniversity = await UniversityModel.findOne({ name });

    if (findUniversity) {
      return res
        .status(400)
        .json({ message: "University with same name already exists" });
    }

    const newUniversity = new UniversityModel({
      name,
      address,
    });
    await newUniversity.save();

    res.status(201).json({ message: "University created successfully" });
  } catch (err) {
    res.status(500).json({ message: "Unable to create University" });
  }
});

// get all universities

universityRoutes.get("/get-all", async (req, res) => {
  try {
    const universities = await UniversityModel.find();
    res.status(200).json({ universities });
  } catch (err) {
    res.status(500).json({ message: "Unable to fetch universities" });
  }
});

// delete 1 university

universityRoutes.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await UniversityModel.findByIdAndDelete(id);
    res.status(200).json({ message: "University deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Unable to delete university" });
  }
});

// update 1 university

universityRoutes.put("/update", async (req, res) => {
  const { name, address, universityID } = req.body;
  try {
    await UniversityModel.findByIdAndUpdate(universityID, {
      name,
      address,
    });
    res.status(200).json({ message: "University updated successfully" });
  } catch (err) {
    res.status(500).json({ message: "Unable to update university" });
  }
});
