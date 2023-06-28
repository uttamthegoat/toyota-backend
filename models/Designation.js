const { Schema, model } = require("mongoose");

const designationSchema = new Schema({
  designation_name: {
    type: String,
  },
});


module.exports = mongoose.model("Designation", designationSchema);