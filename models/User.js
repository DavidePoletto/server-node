const mongoose = require('mongoose');

// Schema per l'utente
const UserSchema = new mongoose.Schema({
  email: { 
    type: String, 
    required: true, 
    unique: true, 
    trim: true, 
    match: [/.+@.+\..+/, 'Inserisci un\'email valida'] // Validazione email
  },
  password: { type: String, required: true, minlength: 6 }, // Lunghezza minima per maggiore sicurezza
  username: { type: String, required: true, trim: true },
  cart: { type: [CartItemSchema], default: [] }, // Cart inizialmente vuoto
}, {
  timestamps: true, // Aggiunge campi createdAt e updatedAt automaticamente
});

// Modello Mongoose
module.exports = mongoose.model('User', UserSchema);
