const { SocialMedias } = require("../models");

const getAllSocialMedias = async (req, res) => {
  try {
    const medias = await SocialMedias.findAll();

    if (!medias || !medias.length)
      return res.status(404).json({ msg: "No data exist" });

    return res.status(200).json({ medias });
  } catch (error) {
    res.status(500).json({ msg: "Internal server error" });
  }
};

const createSocialMediaItem = async (req, res) => {
  const { name_en, name_ar, name_he, show_link } = req.body;

  try {
    if (!name_en || !name_ar || !name_he || show_link == undefined || !req.file)
      return res.status(400).json({ msg: "Please enter all fields" });

    const img = req.file.buffer.toString("base64");

    const newMedia = await SocialMedias.create({
      name_en,
      name_ar,
      name_he,
      show_link,
      img,
    });

    res.status(200).json({
      msg: "New social media add successfully",
      socialMedia: newMedia,
    });
  } catch (error) {
    res.status(500).json({ msg: "Internal server error" });
  }
};

const editSocialMediaItem = async (req, res) => {
  const mediaId = req.params.id;
  const { name_en, name_ar, name_he, show_link } = req.body;

  try {
    const img = req.file ? req.file.buffer.toString("base64") : null;

    const media = await SocialMedias.findByPk(mediaId);

    if (!media) {
      return res.status(404).json({ msg: "Social media item not found" });
    }

    media.name_en = name_en;
    media.name_ar = name_ar;
    media.name_he = name_he;
    media.show_link = show_link;
    media.img = img || media.img;

    await media.save();

    res.status(200).json({
      msg: "Social media item updated successfully",
      socialMedia: media,
    });
  } catch (error) {
    res.status(500).json({ msg: "Internal server error" });
  }
};

const deleteSocialMediaItem = async (req, res) => {
  const mediaId = req.params.id;

  try {
    const media = await SocialMedias.findByPk(mediaId);

    if (!media) return res.status(404).json({ msg: "Media not found" });

    await media.destroy();

    res.status(200).json({ msg: "Social media item deleted successfully" });
  } catch (error) {
    res.status(500).json({ msg: "Internal server error" });
  }
};

module.exports = {
  getAllSocialMedias,
  createSocialMediaItem,
  deleteSocialMediaItem,
  editSocialMediaItem,
};
