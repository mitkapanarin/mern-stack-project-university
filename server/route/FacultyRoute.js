import express from 'express'
import { FacultyModel } from '../model/FacyltyModel.js'

export const FacultyRoute = express.Router()

FacultyRoute.get("/get-all-faculties/:universityID", async (req, res) => {
  try {
    const { universityID } = req.params
    const getAllFaculties = await FacultyModel.find({
      universityOwner: universityID
    })
    res.status(200).json({
      message: "success",
      Faculty: getAllFaculties
    })
  }
  catch (err) {
    res.status(500).json({
      message: "failed to get all faculties"
    })
  }
})

FacultyRoute.post("/create-faculty/:universityID", async (req, res) => {
  try {
    const { name, address } = req.body;
    const universityOwner = req.params.universityID;
    const newFaculty = new FacultyModel({ name, address, universityOwner });
    await newFaculty.save();
    return res.status(200).json({
      message: "Faculty created successfully",
    });
  } catch (err) {
    res.status(500).json({
      message: "Faculty could not be created",
    });
  }
});


FacultyRoute.delete("/delete-faculty/:universityID/:facultyID", async (req, res) => {
  try {
    const { facultyID } = req.params;
    await FacultyModel.findByIdAndDelete(facultyID);
    res.status(200).json({
      message: "Faculty deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      message: "Failed to delete faculty",
    });
  }
});


FacultyRoute.put("/update-faculty/:universityID/:facultyID", async (req, res) => {
  try {
    const { universityID, facultyID } = req.params;
    const { name, address } = req.body;
    const updatedFaculty = await FacultyModel.findByIdAndUpdate(
      facultyID,
      { name, address },
      { new: true }
    );
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








