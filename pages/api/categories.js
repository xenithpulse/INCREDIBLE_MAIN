// File: pages/api/categories.js
import { Category } from '@/models/Category';
import { mongooseConnect } from '@/lib/mongoose';
export default async function handler(req, res) {
  await mongooseConnect();

  try {
    const categories = await Category.find({});
    res.status(200).json(categories);
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({ error: "Failed to fetch categories" });
  }
}

