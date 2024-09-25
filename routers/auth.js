const express = require("express");
const router = express.Router();
const {
  login,
  logout,
  verifyToken,
  editPhone,
  editPassword,
  getCompanyDetails,
} = require("../controller/auth");
const isAuthenticated = require("../middlewares/auth");

router.get("/verify", isAuthenticated, verifyToken);
router.post("/login", login);
router.post("/logout", isAuthenticated, logout);
router.get("/company", getCompanyDetails);
router.put("/edit/phone", isAuthenticated, editPhone);
router.put("/edit/password", isAuthenticated, editPassword);

module.exports = router;
