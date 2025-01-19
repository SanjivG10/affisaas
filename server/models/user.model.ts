import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { UserDocument } from "../types";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  domain: { type: String },
  plan: {
    type: String,
    enum: ["free", "pro", "enterprise"],
    default: "free",
  },
  createdAt: { type: Date, default: Date.now },
  businessName: { type: String },
});

userSchema.pre("save", async function (next) {
  const user = this as unknown as UserDocument;

  if (!user.isModified("password")) return next();

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  next();
});

userSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

export const User = mongoose.model<UserDocument>("User", userSchema);
