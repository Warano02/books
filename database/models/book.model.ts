import { IBook } from "@/types";
import mongoose, { models, Schema } from "mongoose";

const bookSchema = new Schema<IBook>(
  {
    clerkId: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    author: {
      type: String,
      required: true,
    },
    persona: {
      type: String,
      required: false,
    },
    fileURL: {
      type: String,
      required: true,
    },
    fileBlobKey: {
      type: String,
      required: true,
    },
    coverURL: {
      type: String,
      required: true,
    },
    coverBlobKey: {
      type: String,
      required: false,
    },
    fileSize: {
      type: Number,
      required: true,
    },
    totalSegments: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const Book = models.Book || mongoose.model<IBook>("Book", bookSchema);

export default Book;
