const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
// This defines a Mongoose schema for a Product model with name and price fields.
// This is the main entry point of the application, where the server is set up and routes are defined.
// The Product model can be used to interact with the products collection in the MongoDB database.
// Automatic timestamps will be added for createdAt and updatedAt fields.