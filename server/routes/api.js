const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const programme = require("../models/programme")

const db = "mongodb://trainer:training@ds137141.mlab.com:37141/programmetrack";

mongoose.Promise = global.Promise;
mongoose.connect(db, function (err) {
  if (err) {
    console.log("Connection error");
  }
});

router.get('/programmes', function (req, res) {
  console.log("Requesting Programmes");
  programme.find({})
    .exec(function (err, programme) {
      if (err) {
        console.log("Error gettings programmes");
      } else {
        res.json(programme);
      }
    })
})

module.exports = router;
