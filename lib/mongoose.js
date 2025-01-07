import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable');
}

let cachedDb = null;

export async function mongooseConnect() {
  if (cachedDb) {
    return cachedDb;
  }

  try {
    // Start connection and set options to handle timeouts and retries
    const db = await mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 30000, // Timeout for MongoDB server selection (30 seconds)
      socketTimeoutMS: 30000, // Timeout for socket inactivity (30 seconds)
    });

    cachedDb = db;
    console.log('Connected to MongoDB');
    return db;
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw new Error('Could not connect to MongoDB');
  }
}
