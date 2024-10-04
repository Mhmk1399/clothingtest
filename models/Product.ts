import mongoose from 'mongoose';
import Categoires from './Categoires';

const ProductSchema = new mongoose.Schema({
  images: [{ type: String }],
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  colors: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Color' }],
  sizes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Size' }],
  categories:[{type:mongoose.Schema.Types.ObjectId,ref:Categoires}],
  paymentLink: { type: String, default: '' }
}, { timestamps: true });

export default mongoose.models.Product || mongoose.model('Product', ProductSchema);
