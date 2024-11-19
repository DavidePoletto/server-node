const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
 id: {

 }
}, {
  timestamps: true,
});

module.exports = mongoose.model('Order', UserSchema);
