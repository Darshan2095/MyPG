import mongoose from "mongoose";

const ApplicationSchema = new mongoose.Schema(
  {
    targetType: {
      type: String,
      enum: ["PG", "WORKER"],
      required: true,
    },
    targetId: {
      type: String,
      required: true,
    },
    applicantName: {
      type: String,
      required: true,
    },
    applicantPhone: {
      type: String,
      required: true,
    },
    applicantEmail: {
      type: String,
      default: "",
    },
    message: {
      type: String,
      default: "",
    },
    status: {
      type: String,
      enum: ["NEW", "CONTACTED", "CLOSED"],
      default: "NEW",
    },
  },
  { timestamps: true }
);

export default mongoose.models.Application || mongoose.model("Application", ApplicationSchema);
