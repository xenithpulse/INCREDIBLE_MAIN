import mongoose from 'mongoose';

const trackingDataSchema = new mongoose.Schema({
  page: {
    type: String,
    required: true
  },
  referrer: {
    type: String,
    required: true
  },
  country: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    required: true
  },
  device: {
    deviceType: {
      type: String,
      required: true
    },
    browser: {
      type: String,
      required: true
    },
    os: {
      type: String,
      required: true
    }
  },
  sessionId: {
    type: String,
    required: true
  },
  referralSource: {
    type: String,
    required: true
  },
}, { timestamps: true });

export default mongoose.models.TrackingData || mongoose.model('TrackingData', trackingDataSchema);
