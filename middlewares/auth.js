const jwt = require("jsonwebtoken");

const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.cookies && req.cookies["adminToken"];

    if (!token) {
      return res.status(401).json({ msg: "User not authenticated" });
    }

    const decode = jwt.verify(token, process.env.JWT_SECRET);

    req.userId = decode.id;
    next();
  } catch (err) {
    return res.status(500).json({ msg: "Server error", err: err });
  }
};

module.exports = isAuthenticated;
