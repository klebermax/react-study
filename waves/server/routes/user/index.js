var express = require('express');
var router = express.Router();

const { auth } = require('../../middleware/auth');

const { User } = require('../../models/user');

router.get('/auth', auth, (request, response) => {
  response.status(200).json({
    isAdmin: request.user.role === 0 ? false : true,
    isAuth: true,
    email: request.user.email,
    name: request.user.name,
    lastname: request.user.lastname,
    role: request.user.role,
    cart: request.user.cart,
    history: request.user.history
  });
});

router.post('/register', (request, response) => {
  const user = new User(request.body);

  user.save((err, doc) => {
    if (err) return response.json({ success: false, err });

    response.status(200).json({
      success: true
    });
  });
});

router.post('/login', (request, response) => {
  User.findOne({ email: request.body.email }, (err, user) => {
    if (!user) return response.json({ loginSuccess: false, message: 'Auth failed, email not found' });

    user.comparePassword(request.body.password, (err, isMatch) => {
      if (!isMatch) return response.json({ loginSuccess: false, message: 'Worng password' });

      user.generateToken((err, user) => {
        if (err) return response.status(400).send(err);

        response
          .cookie('w_auth', user.token)
          .status(200)
          .json({
            loginSuccess: true
          });
      });
    });
  });
});

router.post('/logout', auth, (request, response) => {
  User.findOneAndUpdate(
    {
      _id: request.user._id
    },
    { token: '' },
    (err, doc) => {
      if (err) return response.json({ success: false, err });
      return response.status(200).send({ success: true });
    }
  );
});

module.exports = router;
