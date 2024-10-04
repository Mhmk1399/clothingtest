import mongoose from 'mongoose';

const StorySchema = new mongoose.Schema({
  title: { type: String, required: true },
  image: { type: String, default: null },
  video: { type: String, default: null },
  link: { type: String, default: '' }
}, { timestamps: true });

export default mongoose.models.Story || mongoose.model('Story', StorySchema);
