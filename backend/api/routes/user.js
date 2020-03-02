const express = require("express");
const router = express.Router();
const jtw = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

const checkAuth = require("../middleware/check-auth");

const User = require("../models/user");

router.post("/signup", (req, res, next) => {
  User.find({ email: req.body.email })
    .exec()
    .then(user => {
      if (user.length >= 1) {
        return res.status(409).json({
          message: "Email exists"
        });
      } else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return res.status(500).json({
              error: err
            });
          } else {
            const user = new User({
              _id: new mongoose.Types.ObjectId(),
              email: req.body.email,
              password: hash
            });
            user
              .save()
              .then(result => {
                res.status(200).json({
                  message: "User created"
                });
              })
              .catch(err => {
                res.status(500).json({
                  error: err
                });
              });
          }
        });
      }
    });
});

router.post("/login", (req, res, next) => {
  User.find({ email: req.body.email })
    .exec()
    .then(user => {
      if (user.length < 1) {
        return res.status(401).json({
          message: "Auth failed"
        });
      }
      bcrypt.compare(req.body.password, user[0].password, (err, result) => {
        if (err) {
          return res.status(401).json({
            message: "Auth failed"
          });
        }
        if (result) {
          const token = jtw.sign(
            {
              email: user[0].email,
              _id: user[0]._id
            },
            process.env.JWT_KEY,
            {
              expiresIn: "1h"
            }
          );
          return res.status(200).json({
            message: "Auth successful",
            token: token
          });
        }
        res.status(401).json({
          message: "Auth failed"
        });
      });
    })
    .catch(err => {
      res.status(401).json({
        message: "Auth failed"
      });
    });
});

router.get("/", (req, res, next) => {
  User.find()
    .select("_id email password")
    .exec()
    .then(doc => {
      res.status(200).json({
        count: doc.length,
        users: doc
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});

router.get("/:userId", (req, res, next) => {
  const id = req.params.userId;
  User.findById(id)
    .select("_id email password")
    .exec()
    .then(user => {
      if (user.length < 0) {
        res.status(409).json({
          message: "User does not exist"
        });
      } else {
        res.status(200).json({
          user: user
        });
      }
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});

router.delete("/:userId", checkAuth, (req, res, next) => {
  User.deleteOne({ _id: req.params.userId })
    .exec()
    .then(result => {
      res.status(200).json({
        message: `User deleted`
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});

module.exports = router;
