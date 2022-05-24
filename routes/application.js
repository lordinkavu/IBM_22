const express = require('express');
const passport = require('passport');
const router = express.Router();
const Application = require('../models/Application');
const User = require('../models/User');

const dotenv = require('dotenv');
dotenv.config();

function checkAuthentication(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.redirect('/auth/login');
  }
}

router.get('/', checkAuthentication, (req, res) => {
  res.render('application');
});

router.post('/', checkAuthentication, async (req, res) => {
  try {
    await Application.create({ ...req.body, owner: req.user._id });
    res.sendStatus(200);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

module.exports = router;
