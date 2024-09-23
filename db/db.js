import mongoose from "mongoose";

async function dbConnection() {
  try {
    await mongoose.connect(`${process.env.MONGO_URL}/quickbgremove}`);
  } catch (error) {
    return console.log("error occur while connecting to db", error);
  }
}

export { dbConnection };
