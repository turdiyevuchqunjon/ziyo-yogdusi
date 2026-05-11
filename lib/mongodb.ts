import mongoose from "mongoose";

let isConnected = 0;

export async function connectToDB(): Promise<typeof mongoose> {
  if (isConnected === 2 && mongoose.connection.readyState === 1) return mongoose;

  const uri =
    process.env.MONGODB_URI ??        // <— avval shu
    process.env.MONGODB_URL ?? "";    // <— bo'lmasa shu

  if (!uri) throw new Error("Missing MONGODB_URI");

  if (isConnected === 1) return mongoose;
  isConnected = 1;

  await mongoose.connect(uri, {
    dbName: process.env.MONGODB_DB ?? "ziyo_yogdusi",
  });

  isConnected = 2;
  return mongoose;
}
