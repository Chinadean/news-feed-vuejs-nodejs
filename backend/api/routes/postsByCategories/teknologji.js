const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

const Post = require("../../models/post");

router.get("/", (req, res, next) => {
  Post.find()
    .select("_id name content category postImage")
    .where("category")
    .equals("5e0294bb434e4e25942ff904")
    .populate("category", "name")
    .sort({ created_at: -1 })
    .exec()
    .then(result => {
      console.log(result);
      res.status(200).json({
        count: result.length,
        posts: result
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
