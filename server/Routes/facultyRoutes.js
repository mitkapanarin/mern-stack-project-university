import express from "express";
import { FacultyModel } from "../Model/FacultyModel.js";
import { UniversityModel } from "../model/UniversityModel.js";

export const facultyRoutes = express.Router();

// create 1 faculty & add that under the university list

facultyRoutes.post("/create/:id", async (req, res) => {
  const { id } = req.params;
  const { name, subject, address } = req.body;
  try {
    const findFaculty = await FacultyModel.findOne({ name });

    if (findFaculty) {
      return res.status(400).json({ message: "Faculty already exists" });
    }

    const newFaculty = new FacultyModel({
      name,
      university: id,
      subject,
      address,
    });
    await newFaculty.save();

    res.status(201).json({
      message: "Faculty created successfully",
    });
  } catch (err) {
    res.status(500).json({ message: "Unable to create Faculty" });
  }
});

// get all faculties

facultyRoutes.get("/get-all", async (req, res) => {
  try {
    const faculties = await FacultyModel.find();
    res.status(200).json({ faculties });
  } catch (err) {
    res.status(500).json({ message: "Unable to fetch faculties" });
  }
});

// get all faculties of a university

facultyRoutes.get("/get-all-of-1-university/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const faculties = await FacultyModel.find({ university: id });
    res.status(200).json({ faculties });
  } catch (err) {
    res.status(500).json({ message: "Unable to fetch faculties" });
  }
});

// update 1 faculty

// delete 1 faculty
