const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cloudinary = require('cloudinary');

const app = express();
const mongoose = require('mongoose');

require('dotenv').config();

mongoose.Promise = global.Promise;
mongoose.connect(process.env.DATABASE);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use(express.static('client/build')); // where to find the static files

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET
});

// Routes
const userRoutes = require('./routes/user');
const productRoutes = require('./routes/product');
const siteRoutes = require('./routes/site');

app.use('/api/users', userRoutes);
app.use('/api/product', productRoutes);
app.use('/api/site', siteRoutes);

if (process.env.NODE_ENV === 'production') {
  // inside heroku, to match the site to render

  const path = require('path');
  app.get('/*', (request, response) => {
    response.sendfile(path.resolve(__dirname, '../client', 'build', 'index.html'));
  });
}

const port = process.env.PORT || 3002;

var server = app.listen(port, () => {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Server Running at http://%s:%s', host, port);
});
