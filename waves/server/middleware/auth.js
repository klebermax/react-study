const { User } = require('./../models/user');

let auth = (request, response, next) => {
  let token = request.cookies.w_auth;

  User.findByToken(token, (err, user) => {
    if (err) throw err;

    if (!user)
      return response.json({
        isAuth: false,
        error: true
      });

    request.token = token;
    request.user = user;
    next();
  });
};

module.exports = { auth };
