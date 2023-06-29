const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: Schema.Types.ObjectId,             
      ref: "Role",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = model("User", userSchema);


//  add empId, in signup route