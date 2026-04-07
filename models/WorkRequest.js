import mongoose from "mongoose";

const workRequestSchema = new mongoose.Schema({
  workerId: String,
  ownerId: String,
  pgName: String,
  workType: String,
  status: {
    type: String,
    default: "pending"
  }
});

export default mongoose.models.WorkRequest ||
mongoose.model("WorkRequest", workRequestSchema);