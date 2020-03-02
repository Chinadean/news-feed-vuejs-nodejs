const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const multer = require("multer");

const checkAuth = require("../middleware/check-auth");

const Post = require("../models/post");
const Category = require("../models/category");

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function(req, file, cb) {
    const now = new Date().toISOString();
    const date = now.replace(/:/g, "-");
    cb(null, date + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 5 },
  fileFilter: fileFilter
});

router.get("/", (req, res, next) => {
  Post.find()
    .select("_id name content category postImage created_at")
    .sort({ created_at: -1 })
    .populate("category", "name")
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

router.post("/", upload.single("postImage"), (req, res, next) => {
  Category.findById(req.body.categoryId)
    .then(category => {
      if (!category) {
        res.status(404).json({
          message: "Category not found"
        });
      }
      const post = new Post({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        content: req.body.content,
        postImage: req.file.path.replace(/\\/g, "/"),
        category: req.body.categoryId
      });
      return post.save();
    })
    .then(result => {
      res.status(201).json({
        message: "Post created",
        createdPost: {
          _id: result._id,
          name: result.name,
          content: result.content,
          postImage: result.postImage,
          category: result.category
        }
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

router.get("/:postId", (req, res, next) => {
  Post.findById(req.params.postId)
    .select("_id name content category postImage created_at")
    .populate("category", "name")
    .exec()
    .then(doc => {
      if (!doc) {
        return res.status(404).json({
          message: "Post not found"
        });
      }
      res.status(200).json({
        post: doc
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

router.patch("/:postId", (req, res, next) => {
  Post.updateOne({ _id: req.params.postId }, { $set: req.body })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "Updated successfully",
        updatedPost: result
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

router.delete("/:postId", (req, res, next) => {
  const id = req.params.postId;
  Post.remove({ _id: id })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "Post deleted succesfully"
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
