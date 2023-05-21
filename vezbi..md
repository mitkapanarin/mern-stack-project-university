import express from 'express';; //Оваа линија го внесува модулот express во кодот. express е библиотека која овозможува креирање на веб сервери и дефинирање на патеки за различни рути.
import University from '../model/FacyltyModel.js';
import Faculty from '../model/UniversityModel.js';

const universityRoute = express.Router(); //Оваа линија дефинира нов рутер објект UniversityRoute со помош на express.Router(). Рутерот е одделен дел од главниот Express апликациски објект и се користи за групирање на патеките и контролирање на рутите специфични за универзитетите.


// Get all universities
universityRoute.get('/', async (req, res) => {
  try {
    const universities = await University.find().populate('faculties');
    res.render('universities', { universities });
  } catch (err) {
    console.error('Failed to fetch universities:', err);
    res.render('error', { message: 'Failed to fetch universities' });
  }
});

// Create a new university
universityRoute.post('/', async (req, res) => {
  const { name, address } = req.body;

  try {
    const university = new University({ name, address });
    await university.save();
    res.redirect('/universities');
  } catch (err) {
    console.error('Failed to create university:', err);
    res.render('error', { message: 'Failed to create university' });
  }
});

// Get a specific university
universityRoute.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const university = await University.findById(id).populate('faculties');
    if (university) {
      res.render('university', { university });
    } else {
      res.render('error', { message: 'University not found' });
    }
  } catch (err) {
    console.error('Failed to fetch university:', err);
    res.render('error', { message: 'Failed to fetch university' });
  }
});

// Update a university
universityRoute.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, address } = req.body;

  try {
    const updatedUniversity = await University.findByIdAndUpdate(
      id,
      { name, address },
      { new: true }
    );
    if (updatedUniversity) {
      res.redirect('/universities/' + id);
    } else {
      res.render('error', { message: 'University not found' });
    }
  } catch (err) {
    console.error('Failed to update university:', err);
    res.render('error', { message: 'Failed to update university' });
  }
});

// Delete a university
universityRoute.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deletedUniversity = await University.findByIdAndDelete(id);
    if (deletedUniversity) {
      await Faculty.deleteMany({ university: id });
      res.redirect('/universities');
    } else {
      res.render('error', { message: 'University not found' });
    }
  } catch (err) {
    console.error('Failed to delete university:', err);
    res.render('error', { message: 'Failed to delete university' });
  }
});

export default universityRoute;

import express from 'express';
import University from '../model/UniversityModel.js';

export const UniversityRoute = express.Router();

// Рута за креирање на универзитет
UniversityRoute.post('/', async (req, res) => {
  try {
    const { name, address } = req.body;
    const university = new University({ name, address });
    await university.save();
    res.status(201).json(university);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Рута за промена на универзитет
UniversityRoute.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, address } = req.body;
    const updatedUniversity = await University.findByIdAndUpdate(
      id,
      { name, address },
      { new: true }
    );
    if (!updatedUniversity) {
      return res.status(404).json({ error: 'University not found' });
    }
    res.json(updatedUniversity);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Рута за бришење на универзитет
UniversityRoute.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUniversity = await University.findByIdAndDelete(id);
    if (!deletedUniversity) {
      return res.status(404).json({ error: 'University not found' });
    }
    res.json({ message: 'University deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Рута за добивање на сите универзитети
UniversityRoute.get('/', async (req, res) => {
  try {
    const universities = await University.find();
    res.json(universities);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});



TaskRoute.post("/create-task/:userId", async (req, res) => {
  try {
    const { task, description, deadline, status, userOwner } = req.body
    const newTask = new TaskModel(req.body)
    await newTask.save()
    return res.status(200).json({
      message: "task created successfully"
    })
  }
  catch (err) {
    res.status(500).json({
      message: "task could not be created"
    })
  }
})