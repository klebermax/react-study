var express = require('express');
var router = express.Router();

const mongoose = require('mongoose');

const { auth } = require('../../middleware/auth');
const { admin } = require('../../middleware/admin');

const { Brand } = require('../../models/brand');
const { Wood } = require('../../models/wood');
const { Product } = require('../../models/product');

router.post('/brand', auth, admin, (request, response) => {
  const brand = new Brand(request.body);

  brand.save((err, doc) => {
    if (err) return response.json({ success: false, err });

    response.status(200).json({ success: true, brand: doc });
  });
});

router.get('/brands', (request, response) => {
  Brand.find({}, (err, brands) => {
    if (err) return response.status(400).send(err);

    response.status(200).send(brands);
  });
});

router.post('/wood', auth, admin, (request, response) => {
  const wood = new Wood(request.body);

  wood.save((err, doc) => {
    if (err) return response.status(400).json({ success: false, err });

    response.status(200).json({ success: true, wood: doc });
  });
});

router.get('/woods', (request, response) => {
  Wood.find({}, (err, woods) => {
    if (err) return response.status(400).send(err);

    response.status(200).send(woods);
  });
});

router.post('/article', auth, admin, (request, response) => {
  const product = new Product(request.body);

  product.save((err, doc) => {
    if (err) return response.status(400).json({ success: false, err });

    response.status(200).json({ success: true, article: doc });
  });
});

router.get('/articles_by_id', (request, response) => {
  let type = request.query.type;
  let items = request.query.id;

  if (type === 'array') {
    let ids = request.query.id.split(',');
    items = [];
    items = ids.map(item => {
      return mongoose.Types.ObjectId(item);
    });
  }

  Product.find({ _id: { $in: items } })
    .populate('brand')
    .populate('wood')
    .exec((err, docs) => {
      return response.status(200).send(docs);
    });
});

module.exports = router;
