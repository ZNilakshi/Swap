const mongoose = require('mongoose');

const transferRequestSchema = new mongoose.Schema({
  name: String,
  currentSchool: String,
  currentDistrict: String,
  currentCity: String,
  subjects: [String],
  position: String,
  qualifications: [String],
  grades: [String],
  preferredDistrict: String,
  preferredCity: String,
  preferredReason: String,
  phone: String,
  additionalContact: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('TransferRequest', transferRequestSchema);
