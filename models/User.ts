
import { Schema, model, models } from 'mongoose';

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  address: { type: String },
  zipcode: { type: String },
  role: { type: String, enum: ['normal', 'vip', 'admin'], default: 'normal' }
});

const User = models.User || model('User', userSchema);

export default User;
