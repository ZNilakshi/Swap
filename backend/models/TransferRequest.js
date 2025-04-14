const mongoose = require('mongoose');

const transferRequestSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  currentSchool: { type: String, required: true },
  currentDistrict: { type: String, required: true },
  currentCity: { type: String, required: true },
  subjects: [{ type: String }],
  position: { type: String, required: true },
  qualifications: [{ type: String }],
  grades: [{ type: String }],
  preferredDistrict: { type: String, required: true },
  preferredCity: { type: String, required: true },
  preferredReason: { type: String },
  phone: { type: String, required: true },
  additionalContact: { type: String },
  postedDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model('TransferRequest', transferRequestSchema);