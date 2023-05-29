import express from 'express';
import { FacultyModel } from '../Model/FacultyModel.js'
import { UniversityModel } from '../Model/UniversityModel.js';

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

facultyRoutes.put("/update/:id", async (req, res) => {

  try {
      const { id } = req.params;
  const { name, subject, address } = req.body;
  const updatedFaculty = await FacultyModel.findByIdAndUpdate(
    id,
    { name, address, subject },
    { new: true }
  );

  if (!updatedFaculty) {
    res.status(404).json({ message: 'Paculty not found' });
    return;
  }

  res.status(200).json({
    message: "Faculty updated successfully",
    updatedFaculty,
  });
} catch (err) {
  res.status(500).json({
    message: "Failed to update faculty",
  });
}
});
// delete 1 faculty

facultyRoutes.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await FacultyModel.findByIdAndDelete(id);
    res.status(200).json({
      message: "Faculty deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      message: "Failed to delete faculty",
    });
  }
});