import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
mongoose.connect(`${process.env.MONGO_URI}`, (err) => {
  if (err) console.log({ err });
  else console.log(`Connected to DB!`);
});
