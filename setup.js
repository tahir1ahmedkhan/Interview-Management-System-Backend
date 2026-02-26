const mongoose = require('mongoose');
const Admin = require('./models/Admin');
require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log('MongoDB connected');
    
    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ username: 'admin' });
    
    if (existingAdmin) {
      console.log('Admin already exists');
    } else {
      // Create default admin
      const admin = new Admin({
        username: 'admin',
        password: 'admin123',
        email: 'admin@dafinitiq.ai'
      });
      
      await admin.save();
      console.log('Default admin created successfully');
      console.log('Username: admin');
      console.log('Password: admin123');
    }
    
    mongoose.connection.close();
  })
  .catch(err => {
    console.error('Error:', err);
    process.exit(1);
  });
