// models/Order.ts

import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  productPrice: {
    type: Number,
    required: true,
  },
  
  
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  productTitle: {
    type: String,
    required: true,
  },
  selectedColor: {
    type: String,
    required: true,
  },
  selectedSize: {
    type: String,
    required: true,
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'accepted', 'denied'],
    default: 'pending',
  },
  paymentId: {
    type: String,
    default: null,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Order = mongoose.models.Order || mongoose.model('Order', orderSchema);
export default Order;
