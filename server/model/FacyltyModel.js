import mongoose from "mongoose";

const facultySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  universityOwner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "University",
    required: true,
  },
});

export const FacultyModel = mongoose.model("Faculty", facultySchema);
