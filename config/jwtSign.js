const jwt = require("jsonwebtoken");
const jwtsign = async (data) => {
  const token = await jwt.sign(data, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES,
  });
  return token;
};
module.exports = jwtsign;
