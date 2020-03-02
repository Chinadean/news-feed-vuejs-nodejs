const mongoose = require("mongoose");

const postSchema = mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true },
    content: { type: String, required: true },
    postImage: { type: String, required: false },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true
    }
  },
  { timestamps: { createdAt: "created_at" } }
);

module.exports = mongoose.model("Post", postSchema);
