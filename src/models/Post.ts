import mongoose, { Document, Schema } from "mongoose";

interface IPost extends Document {
  title: string;
  main: string;
  category: string;
  image: string;
  content: string;
  price: number;
}

const PostSchema: Schema = new Schema({
  title: { type: String, required: true },
  main: { type: String, required: true },
  category: { type: String },
  image: { type: String, required: true },
  content: { type: String, required: true },
  price: { type: Number, required: true },
});

export default mongoose.models.Post ||
  mongoose.model<IPost>("Post", PostSchema);
