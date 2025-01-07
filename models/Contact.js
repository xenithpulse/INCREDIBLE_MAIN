// models/Contact.js
import mongoose, { Schema, model, models } from 'mongoose';

const contactSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  serviceAddress: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  zip: { type: String, required: true },
  homeOrBusiness: { type: String, enum: ['Home', 'Business'], default: 'Home' }, // Enum for allowed values
  comments: { type: String },
}, {
  timestamps: true, // Add timestamps for createdAt and updatedAt
});

export const Contact = models?.Contact || model('Contact', contactSchema);