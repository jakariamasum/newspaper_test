import { connect } from "mongoose";

const MONGO_URI = process.env.MONGODB_URL;

if (!MONGO_URI) {
  throw new Error("MONGODB_URL environment variable is not defined.");
}

connect(MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((error) => console.log(error));
