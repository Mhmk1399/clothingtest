import mongoose from 'mongoose';


const LaundryServiceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  cost: { type: Number, required: true, default: 0 },
  description: { type: String, default: '' },
  image: { type: String, default: null }
}, { timestamps: true });

export default mongoose.models.LaundryService || mongoose.model('LaundryService', LaundryServiceSchema);
