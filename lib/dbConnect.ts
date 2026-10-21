import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

// Define a type for our cached connection
interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

// Extend the global object to hold the cache
declare global {
  var mongooseCache: MongooseCache | undefined;
}

// Use the cached value or initialize a new one
const cached: MongooseCache = global.mongooseCache ?? {
  conn: null,
  promise: null,
};

if (!global.mongooseCache) {
  global.mongooseCache = cached;
}

async function dbConnect(): Promise<typeof mongoose> {
  // If a connection already exists, return it
  if (cached.conn) {
    return cached.conn;
  }

  // If no promise exists, create a new connection
  if (!cached.promise) {
    if (!MONGODB_URI) {
      throw new Error(
        "Please define the MONGODB_URI environment variable inside .env.local",
      );
    }

    const opts = {
      bufferCommands: false, // Disable buffering for immediate errors in serverless
    };

    cached.promise = mongoose.connect(MONGODB_URI!, opts).then((mongoose) => {
      return mongoose;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null; // Reset promise on error so it can be retried
    throw e;
  }

  return cached.conn;
}

export default dbConnect;
