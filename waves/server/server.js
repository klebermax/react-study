const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const app = express();
const mongoose = require('mongoose');

require('dotenv').config();

mongoose.Promise = global.Promise;
mongoose.connect(process.env.DATABASE);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

// Routes
const userRoutes = require('./routes/user');
const productRoutes = require('./routes/product');

app.use('/api/users', userRoutes);
app.use('/api/product', productRoutes);

const port = process.env.PORT || 3002;

var server = app.listen(port, () => {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Server Running at http://%s:%s', host, port);
});
