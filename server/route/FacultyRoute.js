import express from 'express'
import { FacultyModel } from '../model/FacyltyModel.js'
import { UniversityModel } from '../model/UniversityModel.js'

export const FacultyRoute = express.Router()

FacultyRoute.get("/get-all-faculties/:_id", async (req, res) => {
  try {
    const { _id } = req.params
    const getAllFaculties = await FacultyModel.find({
      universityOwner: _id
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

FacultyRoute.post("/create-faculty/:_id", async (req, res) => {
  try {
    const { name, address } = req.body;
    const universityOwner = req.params._id;
    const newFaculty = new FacultyModel({ name, address, universityOwner });
    const checkFacultyName = await FacultyModel.findOne({ name });

    if (checkFacultyName) {
      res.status(400).json({ message: 'Name already exists' });
      return;
    }

    const findUniversity = await UniversityModel.findById(universityOwner);

    if (!findUniversity) {
      res.status(404).json({ message: 'University not found' });
      return;
    }

    const updateFacultyList = await UniversityModel.findByIdAndUpdate(universityOwner,{
      $push: { faculties: newFaculty }
    })
    // await Promise.all([newFaculty.save(), findUniversity.save()]);

    res.status(200).json({
      message: "Faculty created successfully",
      findUniversity,
    });
  } catch (err) {
    res.status(500).json({
      message: "Faculty could not be created",
    });
  }
});



FacultyRoute.delete("/delete-faculty/:_id/:facultyID", async (req, res) => {
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


FacultyRoute.put("/update-faculty/:_id/:facultyID", async (req, res) => {
  try {
    const { _id, facultyID } = req.params;
    const { name, address } = req.body;
    const updatedFaculty = await FacultyModel.findByIdAndUpdate(
      facultyID,
      { name, address },
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








