var express = require('express');
var router = express.Router();

const formidable = require('express-formidable');
const cloudinary = require('cloudinary');

const { admin } = require('../../middleware/admin');
const { auth } = require('../../middleware/auth');

const mongoose = require('mongoose');

const { Site } = require('../../models/site');

const async = require('async');

router.get('/site_data', (request, response) => {
  Site.find({}, (err, site) => {
    if (err) return response.status(400).send(err);

    response.status(200).send(site[0].siteInfo);
  });
});

router.post('/site_data', auth, admin, (request, response) => {
  Site.findOneAndUpdate(
    { name: 'Site' },
    {
      $set: {
        siteInfo: request.body
      }
    },
    { new: true },
    (err, doc) => {
      if (err) return response.status(400).send(err);

      return response.status(200).send({ success: true, siteInfo: doc.siteInfo });
    }
  );
});

module.exports = router;
