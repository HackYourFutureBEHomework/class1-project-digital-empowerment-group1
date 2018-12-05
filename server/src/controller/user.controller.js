const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../model/user.model");

exports.signup = (req, res) => {
  const { email, password } = req.body;
  User.find({ email }).then(user => {
    if (user.length >= 1) {
      return res.status(409).json({
        message: "Email already exists"
      });
    } else {
      bcrypt.hash(password, 10, (err, hash) => {
        const user = new User({
          email,
          password: hash
        });
        user
          .save()
          .then(result => {
            res.status(201).json({
              message: "User created"
            });
          })
          .catch(err => {
            res.status(500).json({
              error: err
            });
          });
      });
    }
  });
};

exports.login = (req, res) => {
  const { email, password } = req.body;
  User.find({ email })
    .then(user => {
      if (user.length < 1) {
        return res.status(401).json({
          message: "Auth failed"
        });
      }
      bcrypt.compare(password, user[0].password, (err, result) => {
        if (result) {
          const token = jwt.sign(
            {
              email: user[0].email
            },
            process.env.JWT_KEY,
            {
              expiresIn: "1h"
            }
          );
          return res.status(200).json({
            message: `Welcome back ${user[0].email}`,
            token
          });
        }
        res.status(401).json({
          message: "Auth failed"
        });
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
};

exports.delete = (req, res) => {
  User.findOneAndDelete({ _id: req.params.userId })
    .then(result => {
      res.status(200).json({
        message: "User deleted"
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
};
