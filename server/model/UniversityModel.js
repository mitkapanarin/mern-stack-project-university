import mongoose from 'mongoose';

const universitySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  faculties: [
    {
      type: String,
      required: true,
    },
  ],
});

export const UniversityModel = mongoose.model('University', universitySchema);

