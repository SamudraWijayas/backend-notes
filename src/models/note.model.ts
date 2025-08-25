import mongoose, { Document } from "mongoose";
import * as Yup from "yup";

const Schema = mongoose.Schema;

// DTO untuk validasi request
export const noteDTO = Yup.object({
  title: Yup.string().required(),
  content: Yup.string().required(),
});

// Type untuk validasi request
export type NoteDTO = Yup.InferType<typeof noteDTO>;

// Type untuk schema mongoose
export interface INote extends Document {
  title: string;
  content: string;
  userId: mongoose.Types.ObjectId;
}

const NoteSchema = new Schema<INote>(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const NoteModel = mongoose.model<INote>("Note", NoteSchema);

export default NoteModel;
