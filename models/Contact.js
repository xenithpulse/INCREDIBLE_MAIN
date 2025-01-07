// models/Contact.js
import mongoose, { Schema, model, models } from 'mongoose';

const contactSchema = new Schema({
  fullName: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: false },
  comments: { type: String },
}, {
  timestamps: true, // Add timestamps for createdAt and updatedAt
});

export const Contact = models?.Contact || model('Contact', contactSchema);