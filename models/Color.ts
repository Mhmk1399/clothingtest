import mongoose from 'mongoose';

const ColorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  hexCode: { type: String, required: true }
}, { timestamps: true });

export default mongoose.models.Color || mongoose.model('Color', ColorSchema);
