// pages/api/contact.js
import { mongooseConnect } from "@/lib/mongoose"; // Path to your mongoose connection utility
import { Contact } from "@/models/Contact"; // Path to your Contact model

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      await mongooseConnect(); // Connect to MongoDB

      const {
        firstName,
        lastName,
        phone,
        email,
        serviceAddress,
        city,
        state,
        zip,
        homeOrBusiness,
        comments,
      } = req.body;

      const contactDoc = await Contact.create({
        firstName,
        lastName,
        phone,
        email,
        serviceAddress,
        city,
        state,
        zip,
        homeOrBusiness,
        comments,
      });

      res.status(201).json(contactDoc); // Send 201 Created with the created document
    } catch (error) {
      console.error("Error creating contact:", error);

      if (error.name === 'ValidationError') {
        // Handle Mongoose validation errors
        const validationErrors = {};
        for (const key in error.errors) {
          validationErrors[key] = error.errors[key].message;
        }
        return res.status(400).json({ error: "Validation failed", details: validationErrors });
      }

      res.status(500).json({ error: "Failed to create contact" }); // Generic error
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}