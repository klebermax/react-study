var express = require('express');
var router = express.Router();

const formidable = require('express-formidable');
const cloudinary = require('cloudinary');

const { admin } = require('../../middleware/admin');
const { auth } = require('../../middleware/auth');

const mongoose = require('mongoose');

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

router.post('/uploadimage', auth, admin, formidable(), (request, response) => {
  cloudinary.uploader.upload(
    request.files.file.path,
    result => {
      response.status(200).send({
        public_id: result.public_id,
        url: result.url
      });
    },
    {
      public_id: `${Date.now()}`,
      resource_type: 'auto'
    }
  );
});

router.delete('/removeimage', auth, admin, (request, response) => {
  let image_id = request.query.public_id;

  cloudinary.uploader.destroy(image_id, (result, error) => {
    if (error) return response.status(400).json({ success: false, error });

    response.status(200).send(result);
  });
});

router.post('/addToCart', auth, (request, response) => {
  User.findOne({ _id: request.user._id }, (err, doc) => {
    let duplicate = false;

    doc.cart.forEach(item => {
      if (item.id == request.query.productId) {
        duplicate = true;
      }
    });

    if (duplicate) {
      User.findOneAndUpdate(
        {
          _id: request.user._id,
          'cart.id': mongoose.Types.ObjectId(request.query.productId)
        },
        {
          $inc: { 'cart.$.quantity': 1 }
        },
        { new: true },
        () => {
          if (err) return response.status(400).json({ success: false, err });

          response.status(200).json(doc.cart);
        }
      );
    } else {
      User.findOneAndUpdate(
        { _id: request.user._id },
        {
          $push: {
            cart: {
              id: mongoose.Types.ObjectId(request.query.productId),
              quantity: 1,
              date: Date.now()
            }
          }
        },
        { new: true },
        (err, doc) => {
          if (err) return response.status(400).json({ success: false, err });

          response.status(200).json(doc.cart);
        }
      );
    }
  });
});

module.exports = router;
