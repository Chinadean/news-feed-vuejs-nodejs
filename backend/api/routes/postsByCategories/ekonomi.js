const express = require("express");
const router = express.Router();

const Post = require("../../models/post");

router.get("/", (req, res, next) => {
  //Post.find( {'category' : '5e0295317e7b5c07d8f359a4'}) we can do it this way too
  Post.find()
    .select("_id name content category postImage")
    .where("category")
    .equals("5e0295317e7b5c07d8f359a4")
    .populate("category", "name")
    .sort({ created_at: -1 })
    .exec()
    .then(doc => {
      console.log(doc);
      res.status(200).json({
        count: doc.length,
        posts: doc
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

module.exports = router;
