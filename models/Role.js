const { Schema, model } = require("mongoose");

const roleSchema = new Schema({
  role_name: {
    type: String,
    enum: ["ADMIN", "MGR", "AE", "AM", "DM", "TL", "GL", "TM"],
    required: true,
  },
  designation: {
    type: String,
  },
});

module.exports = model("Role", roleSchema);
