const express = require('express');
const router = express.Router();
const Admin = require('../models/Admin');

// Login
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const admin = await Admin.findOne({ username, password });
    
    if (!admin) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    res.json({ 
      message: 'Login successful',
      admin: { id: admin._id, username: admin.username, email: admin.email }
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create admin (for initial setup)
router.post('/register', async (req, res) => {
  const admin = new Admin({
    username: req.body.username,
    password: req.body.password,
    email: req.body.email
  });

  try {
    const newAdmin = await admin.save();
    res.status(201).json({ 
      message: 'Admin created successfully',
      admin: { id: newAdmin._id, username: newAdmin.username }
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
