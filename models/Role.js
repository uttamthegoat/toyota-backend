const { Schema, model } = require("mongoose");

const roleSchema = new Schema({
  role_name: {
    type: String,
    required: true,
  },
  designation: {
    type: String,
  },
});

module.exports = mongoose.model("Role", roleSchema);
