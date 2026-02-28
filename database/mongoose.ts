import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI)
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local",
  );

declare global {
  var mongooseCache: {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
  };
}

let cached =
  global.mongooseCache ||
  (global.mongooseCache = { conn: null, promise: null });

export const connectToDatabase = async () => {
  if (cached.conn) {
    return cached.conn;
  }
  
  cached.promise = mongoose.connect(MONGODB_URI).then((mongoose) => {
    return mongoose;
  });
  cached.conn = await cached.promise;
  return cached.conn;   
};
