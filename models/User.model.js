const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    email:
    {
      type: String,
      unique: true,
      required: [true, "Email is required"],
      // this match will disqualify all the emails with accidental empty spaces, missing dots in front of (.)com and the ones with no domain at all
      match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address.'],
      lowercase: true,
      trim: true
    },
    passwordHash:
    {
      type: String,
      required: [true, "Password is required"]
    },
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;
