import mongoose from "mongoose";
const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },

  createdOn: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model("user", userSchema);
export default User;
