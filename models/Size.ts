import mongoose from 'mongoose';

const SizeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  shoulderWidth: { type: Number, default: 0 },
  chestWidth: { type: Number, default: 0 },
  topLength: { type: Number, default: 0 },
  bottomLength: { type: Number, default: 0 },
  waistWidth: { type: Number, default: 0 },
  shoesWidth: { type: Number, default: 0 },
  shoesLength: { type: Number, default: 0 }
}, { timestamps: true });

export default mongoose.models.Size || mongoose.model('Size', SizeSchema);
