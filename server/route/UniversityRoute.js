import express from 'express';
import {UniversityModel} from '../model/UniversityModel.js';

export const UniversityRoute = express.Router();

// Рута за креирање на универзитет
UniversityRoute.post('/create-university', async (req, res) => {
  try {
    const { name, address, faculties } = req.body;

    const checkUniversityName = await UniversityModel.findOne({ name });

    if (checkUniversityName) {
      res.status(400).json({ message: 'Name already exists' });
      return;
    }

    const newUniversity = new UniversityModel(req.body)
    await newUniversity.save()

    res.status(200).json({ message: 'University created successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});



// Рута за ажурирање на универзитет
UniversityRoute.put('/update-university/:universityID', async (req, res) => {
  try {
    const { universityID } = req.params;
    const { name, address, faculties } = req.body;

    const updatedUniversity = await UniversityModel.findByIdAndUpdate(
      universityID,
      {
        name,
        address,
        faculties: []
      },
      { new: true }
    );

    if (!updatedUniversity) {
      res.status(404).json({ message: 'University not found' });
      return;
    }

    res.json({ message: 'Successfully updated university' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Рута за добивање на еден универзитет
UniversityRoute.get('/get-one-university/:universityID', async (req, res) => {
  try {
    const { universityID } = req.params;
    const university = await UniversityModel.findById(universityID);

    if (!university) {
      res.status(404).json({ message: 'University not found' });
      return;
    }

    res.status(200).json(university);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Рута за добивање на сите универзитети
UniversityRoute.get('/get-all-universities', async (req, res) => {
  try {
    const universities = await UniversityModel.find();
    res.status(200).json(universities);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Рута за бришење на универзитет
UniversityRoute.delete('/delete-university/:universityID', async (req, res) => {
  try {
    const { universityID } = req.params;
    const deletedUniversity = await UniversityModel.findByIdAndDelete(universityID);

    if (!deletedUniversity) {
      res.status(404).json({ message: 'University not found' });
      return;
    }

    res.status(204).json({ message: 'University deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});
