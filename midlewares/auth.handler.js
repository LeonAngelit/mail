const boom = require("@hapi/boom");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const conf = require('../conf/configuration');

function authKey(property, key) {
  return (req, res, next) => {
    const data = req[property].num;

    bcrypt.compare(key, data, (err, res) => {
      if (err) {
        next(boom.unauthorized("Unauthorized"));
      }

      if(!res){
        next(boom.unauthorized("Unauthorized"));
      }
      next();
    });
  };
}

function jwtAuth(property){
  return (req, res, next) => {
    const data = req[property].bearer;
    console.log(data);

    jwt.verify(data, conf.pkey, function(err, decoded) {
      if(err){
        next(boom.unauthorized("Unauthorized"));
      }
     if(!(decoded.auth == `${conf.authp}`)){
      next(boom.unauthorized("Unauthorized"));
     }
    });
     next();
  };

}

module.exports = { authKey, jwtAuth };
