import mongoose, { Schema, mongo } from "mongoose";

mongoose.connect(process.env.MONGODB_URI);
mongoose.Promise = global.Promise;

const userSchema = new Schema(
  {
    name: String,
    email: String,
    password: String,
  },
  {
    // used to show when the user was created and updated
    timestamps: true,
  }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
