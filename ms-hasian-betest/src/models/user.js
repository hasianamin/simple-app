import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  userName: { type: String, required: true },
  accountNumber: { type: String, required: true, unique: true, index: true },
  emailAddress: { type: String, required: true },
  identityNumber: { type: String, required: true, unique: true, index: true },
});

const User = mongoose.model("users", userSchema);

export default User;
