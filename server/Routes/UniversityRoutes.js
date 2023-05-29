import express from "express";
import { UniversityModel } from "../Model/UniversityModel.js";

export const universityRoutes = express.Router();

// ✅ Create 1 University
universityRoutes.post("/create", async (req, res) => {
  const { name, email } = req.body;
  try {
    const findUniversity = await UniversityModel.findOne({ name });

    if (findUniversity) {
      return res
        .status(400)
        .json({ message: "University with same name already exists" });
    }

    const uniqueEmail = await UniversityModel.findOne({ email });

    if (uniqueEmail) {
      return res
        .status(400)
        .json({ message: "University with same email address already exists" });
    }

    const newUniversity = new UniversityModel(req.body);
    await newUniversity.save();

    res.status(201).json({ message: "University created successfully" });
  } catch (err) {
    res.status(500).json({ message: "Unable to create University" });
  }
});

// ✅ Get all Universities

universityRoutes.get("/get-all", async (req, res) => {
  try {
    const universities = await UniversityModel.find();
    res.status(200).json(universities);
  } catch (err) {
    res.status(500).json({ message: "unable to get all universities" });
  }
});

// ✅ Get 1 University by ID

universityRoutes.get("/get-one/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const university = await UniversityModel.findById(id);
    if (!university) {
      return res.status(404).json({ message: "University not found" });
    }
    res.status(200).json(university);
  } catch (err) {
    res.status(500).json({ message: "unable to get university by id" });
  }
});

// ✅ Delete 1 University by ID

universityRoutes.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deleteUniversity = await UniversityModel.findByIdAndDelete(id);
    if (!deleteUniversity) {
      return res.status(404).json({ message: "University not found" });
    }
    res.status(200).json({ message: "University deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Unable to delete University" });
  }
});

// ✅ Delete 1 University by ID

universityRoutes.put("/update", async (req, res) => {
  const { name, email, totalStudents, image, universityID } = req.body;
  try {
    const findUniversity = await UniversityModel.findByIdAndUpdate(
      universityID,
      { name, email, totalStudents, image }
    );
    if (!findUniversity) {
      return res.status(404).json({ message: "University not found" });
    }
    res.status(200).json({ message: "University updated successfully" });
  } catch (err) {
    res.status(500).json({ message: "Unable to update University" });
  }
});
