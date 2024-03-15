import mongoose, { Schema, Document } from 'mongoose';

export interface IBlog extends Document {
  title: string;
  content: string;
  created_at: Date;
}

const BlogSchema: Schema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  created_at: {type: Date, default: Date.now },
});

export default mongoose.model<IBlog>('Blog', BlogSchema);
