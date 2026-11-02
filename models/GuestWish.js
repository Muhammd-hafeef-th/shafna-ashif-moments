import mongoose from 'mongoose';

const GuestWishSchema = new mongoose.Schema(
  {
    guestName: { type: String, required: true, trim: true },
    message: { type: String, required: true, trim: true },
    isApproved: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.models.GuestWish || mongoose.model('GuestWish', GuestWishSchema);

