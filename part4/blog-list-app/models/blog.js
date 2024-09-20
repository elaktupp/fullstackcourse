const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
});

// Transform can be used to adjust object content
// when it is transformed into a json.
blogSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    // _id is not a string but an object, add new id string.
    returnedObject.id = returnedObject._id.toString();
    // Remove unnecessary data
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Blog", blogSchema);
