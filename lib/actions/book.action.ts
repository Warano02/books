"use server"
import { connectToDatabase } from "@/database/mongoose";
import { CreateBook, TextSegment } from "@/types";
import { generateSlug, serializeData } from "../utils";
import Book from "@/database/models/book.model";
import BookSegment from "@/database/models/book-segment.model";

export const createBook = async (data: CreateBook) => {
  try {
    await connectToDatabase();
    const slug = generateSlug(data.title);
    const existtingBook = await Book.findOne({ slug }).lean();

    if (existtingBook) {
      return {
        success: true,
        data: serializeData(existtingBook),
        alreadyExists: true,
      };
    }

    const book = await Book.create({ ...data, slug, totalSegments: 0 });
    return { success: true, data: serializeData(book) };
  } catch (e) {
    return { success: false, error: "Failed to create book" };
  }
};

export const saveBookSegments = async (
  bookId: string,
  clerkId: string,
  segments: TextSegment[],
) => {
  await connectToDatabase();

  const sementsToInsert = segments.map(
    ({ text, segmentIndex, pageNumber, wordCount }) => ({
      content: text,
      segmentIndex,
      pageNumber,
      wordCount,
      bookId,
      clerkId,
    }),
  );

  try {
    await BookSegment.insertMany(sementsToInsert);
    await Book.findByIdAndUpdate(bookId, { totalSegments: segments.length });
    return { success: true, data: { segmentCreated: segments.length } };
  } catch (e) {
    console.error("Error saving segments ", e);
    await BookSegment.deleteMany({ bookId });
    await Book.findByIdAndDelete(bookId);
    return { success: false, error: "Failed to save book segments" };
  }
};

export const checkBookExists = async (title: string) => {
  try {
    await connectToDatabase();
    const slug = generateSlug(title);
    const book = await Book.findOne({ slug }).lean();
    return book
      ? { exists: true, data: serializeData(book) }
      : { exists: false };
  } catch (e) {
    return { exists: false, error: "Failed to check book existence" };
  }
};
