// controllers/sessionController.js

const session = require('../models/session');

exports.login = function login(env, options) {
  session.login(env, options.username, options.password);
};
