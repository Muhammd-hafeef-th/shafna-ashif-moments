import mongoose from 'mongoose';

const RSVPSchema = new mongoose.Schema(
  {
    guestName: { type: String, required: true, trim: true },
    attendance: { type: String, enum: ['yes', 'no'], required: true, default: 'yes' },
    guestCount: { type: Number, min: 1, default: 1 },
  },
  { timestamps: true }
);

export default mongoose.models.RSVP || mongoose.model('RSVP', RSVPSchema);

