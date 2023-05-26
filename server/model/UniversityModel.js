import mongoose from "mongoose";

// name
// address
// faculties

const UniversitySchema = new mongoose.Schema({
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
      type: mongoose.Schema.Types.ObjectId,
      ref: "Faculty",
      required: false,
    },
  ],
});

export const UniversityModel = mongoose.model("University", UniversitySchema);
