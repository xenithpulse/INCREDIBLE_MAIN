import TrackingData from '@/models/Tracking';

export default async function handler(req, res) {
  console.log('Incoming request:', req.method, req.body);

  if (req.method === 'POST') {
    try {
      const trackingData = req.body;

      if (!Array.isArray(trackingData)) {
        return res.status(400).json({ message: 'Invalid data format' });
      }

      console.log('Received tracking data, splitting into batches:', trackingData.length);

      const batchSize = 100; // Set batch size
      for (let i = 0; i < trackingData.length; i += batchSize) {
        const batch = trackingData.slice(i, i + batchSize);

        console.log(`Processing batch ${Math.ceil(i / batchSize) + 1} of size:`, batch.length);

        // Save each batch
        const result = await TrackingData.insertMany(batch);
      }

      res.status(200).json({ message: 'All tracking data saved successfully' });
    } catch (error) {
      console.error('Error saving tracking data:', error);
      res.status(500).json({ message: 'Error saving tracking data' });
    }
  } else {
    console.log('Invalid HTTP method:', req.method);
    res.status(405).json({ message: 'Method not allowed' });
  }
}
