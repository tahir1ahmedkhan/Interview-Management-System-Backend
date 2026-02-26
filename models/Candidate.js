const mongoose = require('mongoose');

const candidateSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  qualification: {
    type: String,
    required: true
  },
  phone: String,
  experience: String,
  linkedinProfile: {
    type: String,
    default: ''
  },
  cvFileName: {
    type: String,
    default: ''
  },
  cvFilePath: {
    type: String,
    default: ''
  },
  status: {
    type: String,
    enum: ['pending', 'taken', 'rejected'],
    default: 'pending'
  },
  appliedDate: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Candidate', candidateSchema);
