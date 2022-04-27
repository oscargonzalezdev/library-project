const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    email:
    {
      type: String,
      unique: true,
      required: [true, "Email is required"],
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
