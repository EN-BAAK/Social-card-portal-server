const express = require("express");
const router = express.Router();
const { upload } = require("../utils/multer");
const {
  createSocialMediaItem,
  getAllSocialMedias,
  editSocialMediaItem,
  deleteSocialMediaItem,
} = require("../controller/socialMedias");
const isAuthenticated = require("../middlewares/auth");

router.get("/", isAuthenticated, getAllSocialMedias);

router.post("/", isAuthenticated, upload.single("img"), createSocialMediaItem);

router.put("/:id", isAuthenticated, upload.single("img"), editSocialMediaItem);

router.delete("/:id", isAuthenticated, deleteSocialMediaItem);

module.exports = router;
