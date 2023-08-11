import mongoose from "mongoose";

let isConnected = true;

export const connectDB = async () => {
  mongoose.set("strictQuery", true);

  if (isConnected) {
    console.log("mongoos is already connected");
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      bdName: "share_prompt",
      useNewUrlparser: true,
      useUniFiedTopology: true,
    });
    isConnected = true;
    console.log("mongodb connected");
  } catch (error) {
    console.log("error");
  }
};
