const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Category = require("../models/category");

router.get("/", (req, res, next) => {
  Category.find()
    .select("_id name")
    .exec()
    .then(result => {
      res.status(200).json({
        count: result.length,
        categories: result
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

router.post("/", (req, res, next) => {
  const category = new Category({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name
  });
  category
    .save()
    .then(result => {
      console.log(result);
      res.status(200).json({
        message: "Category created",
        createdCategory: result
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

router.get("/:categoryId", (req, res, next) => {
  const id = req.params.categoryId;
  Category.findById(id)
    .select("_id name")
    .exec()
    .then(result => {
      res.status(200).json({
        category: result
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

router.patch("/:categoryId", (req, res, next) => {
  const id = req.params.categoryId;
  Category.updateOne({ _id: id }, { $set: req.body })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "Category editted",
        updatedCategory: result
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

router.delete("/:categoryId", (req, res, next) => {
  const id = req.params.categoryId;
  Category.remove({ _id: id })
    .exec()
    .then(result => {
      console.log(result);
      res.status(200).json({
        message: "Category deleted"
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
