const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  email: { 
    type: String, 
    required: true, 
    unique: true, 
    trim: true, 
    match: [/.+@.+\..+/, 'Inserisci un\'email valida']
  },
  password: { type: String, required: true, minlength: 6 },
  username: { type: String, required: true, trim: true },
}, {
  timestamps: true,
});

module.exports = mongoose.model('User', UserSchema);
