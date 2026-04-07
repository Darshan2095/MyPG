import mongoose from "mongoose";

const workerSchema = new mongoose.Schema({
  name: String,
  phone: String,
  email: String,

  skills: [String], // cleaning, cooking, maintenance

  experience: String,

  city: String,
  location: String,

  rating: {
    type: Number,
    default: 0
  },

  reviews: [
    {
      name: String,
      rating: Number,
      comment: String
    }
  ],

  availability: {
    type: Boolean,
    default: true
  }
}, { timestamps: true });

export default mongoose.models.Worker || mongoose.model("Worker", workerSchema);