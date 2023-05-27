import express from 'express';
import { UniversityModel } from '../Model/UniversityModel.js'

export const universityRoutes = express.Router();

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

universityRoutes.get("/get-all", async (req, res) => {
  try {
      const universities = await UniversityModel.find();
      res.status(200).json(universities);
    }
    catch (err) {
          res.status(500).json({ message: "unable to get all universities" });
        }
});

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
})

universityRoutes.put("/update", async (req, res)=>{
  const { name, address, universityID } = req.body;
  try{
    const findUniversity = await UniversityModel.findByIdAndUpdate(universityID, { name, address});
    if (!findUniversity) {
      return res.status(404).json({ message: "University not found" });
    }
    res.status(200).json({ message: "University updated successfully" });
  }
  catch (err) {
    res.status(500).json({ message: "Unable to update University" });
  }
})