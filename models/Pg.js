import mongoose from "mongoose";

const PgSchema = new mongoose.Schema({
  pgName: { type: String, required: true },
  city: { type: String, required: true },
  location: { type: String, required: true },
  address: { type: String },
  description: { type: String },

  // Property Details
  roomType: { type: String },
  furnishing: { type: String },
  propertyType: { type: String },
  area: { type: Number },
  genderAllowed: { type: String },

  // Arrays (Ensure these are defined as arrays of strings)
  images: [{ type: String }],
  amenities: [{ type: String }],
  propertyFeatures: [{ type: String }],
  houseRules: [{ type: String }],

  // Array of Objects
  nearbyPlaces: [
    {
      name: { type: String },
      distance: { type: String }
    }
  ],

  // Nested Object
  pricing: {
    monthlyRent: { type: Number },
    securityDeposit: { type: Number },
    totalInitialPayment: { type: Number }
  },

  // Owner Details
  ownerName: { type: String },
  ownerPhone: { type: String },
  ownerEmail: { type: String },

  // Metadata
  status: { type: String, default: "Available Now" },
  rating: { type: Number, default: 0 },
  totalReviews: { type: Number, default: 0 }
}, { 
  timestamps: true // This creates createdAt and updatedAt automatically
});

// IMPORTANT: This prevents re-creating the model if it already exists
export default mongoose.models.Pg || mongoose.model("Pg", PgSchema);