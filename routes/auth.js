const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const User = require('../../models/Users');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
const config = require('config');

//@route    GET api/auth
//@desc     Test Route
//@access   Private
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select(-'password');
    res.json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json('Server Error');
  }
});

//@route    POST api/auth
//@desc     Authenicates a user
//@access   Public
router.post(
  '/',
  [
    check('email', 'Email is required').not().isEmpty(),
    check('password', 'Password is required').exists(),
  ],
  //checking that creds are valid
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({ msg: 'Invalid Credentials' });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({ msg: 'Invalid Credentials' });
      }

      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        config.get('jwtToken'),
        { expiresIn: 3600000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

module.exports = router;
