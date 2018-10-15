let admin = (request, response, next) => {
  if (request.user.role === 0) {
    return response.status(401).send('you are not allowed, get out of here.');
  }

  next();
};

module.exports = { admin };
