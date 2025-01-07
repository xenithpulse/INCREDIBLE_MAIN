import { Image } from "../../models/Images"; // Ensure this path is correct
import { mongooseConnect } from "@/lib/mongoose";

export default async function handler(req, res) {
  try {
    // Connect to the database
    await mongooseConnect();

    if (req.method === "GET") {
      const images = await Image.find().sort({ position: 1 });
      return res.status(200).json({ success: true, data: images });
    } else {
      return res.status(405).json({ success: false, message: "Method not allowed" });
    }
  } catch (error) {
    console.error("Error fetching images:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
}
