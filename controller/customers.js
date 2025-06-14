const { literal } = require("sequelize");
const { Customers, SocialMedias, Links } = require("../models");

const getAllCustomers = async (req, res) => {
  try {
    const customers = await Customers.findAll({
      attributes: ["id", "name", "domain_name", "desc"],
    });

    if (!customers || !customers.length)
      return res.status(404).json({ msg: "No data exists" });

    return res.status(200).json({
      customers,
    });
  } catch (error) {
    res.status(500).json({ msg: "Internal server error" });
  }
};

const getCustomerById = async (req, res) => {
  const customerId = req.params.id;

  try {
    const customer = await Customers.findByPk(customerId, {
      attributes: {
        exclude: ["background_img", "logo", "createdAt", "updatedAt", "id"],
      },
      include: {
        model: Links,
        attributes: ["link", "mediaId"],
        as: "links",
      },
    });

    if (!customer) {
      return res.status(404).json({ msg: "No data exists!" });
    }

    return res.status(200).json({
      customer,
    });
  } catch (error) {
    res.status(500).json({ msg: "Internal server error" });
  }
};

const getCustomerByDomainName = async (req, res) => {
  const domain = req.params.customerDomain;
  try {
    const customer = await Customers.findOne({
      where: { domain_name: domain },
    });

    if (!customer) return res.status(404).json({ msg: "Customer not found" });

    const languageField =
      customer.language === "ar"
        ? "name_ar"
        : "name_en"

    const links = await Links.findAll({
      where: { customerId: customer.id },
      attributes: ["link"],
      include: [
        {
          model: SocialMedias,
          attributes: [
            "id",
            "show_link",
            "img",
            [literal(`SocialMedia.${languageField}`), "name"],
          ],
        },
      ],
    });

    return res.status(200).json({
      customer,
      links,
    });
  } catch (error) {
    res.status(500).json({ msg: "Internal server error" });
  }
};

const createCustomer = async (req, res) => {
  const data = req.body;
  const { medias: links, ...customerData } = data;
  const medias = JSON.parse(links);

  try {
    if (req.files["logo"])
      customerData.logo = req.files["logo"][0].buffer.toString("base64");
    else customerData.logo = null;

    customerData.background_img =
      customerData.show_background_img === "true"
        ? req.files["background_img"][0].buffer.toString("base64")
        : null;

    const mediasExist = await Promise.all(
      medias.map(async (media) => {
        try {
          const result = await SocialMedias.findByPk(media.mediaId);
          return !!result;
        } catch (err) {
          return false;
        }
      })
    );

    if (mediasExist.includes(false)) {
      return res.status(400).json({
        msg: "One or more social media do not exist",
      });
    }

    const newCustomer = await Customers.create(customerData);

    for (const media of medias)
      await Links.create({
        customerId: newCustomer.id,
        mediaId: media.mediaId,
        link: media.link,
      });

    res.status(201).json({
      msg: "Customer created successfully",
      customer: newCustomer,
    });
  } catch (error) {
    res.status(500).json({ msg: "Internal server error" });
  }
};

const editCustomer = async (req, res) => {
  const customerId = req.params.id;
  const data = req.body;
  const { medias: links, ...customerData } = data;
  const medias = JSON.parse(links);

  try {
    const customer = Customers.findByPk(customerId);

    if (!customer) return res.status(404).json({ msg: "No customer found" });

    if (req.files["logo"])
      customerData.logo = req.files["logo"][0].buffer.toString("base64");
    else if (customerData.let_logo === "true")
      customerData.logo = customer.logo;
    else customerData.logo = null;

    if (
      customerData.show_background_img === "true" &&
      req.files["background_img"]
    ) {
      const background_img =
        req.files["background_img"][0].buffer.toString("base64");
      customerData.background_img = background_img;
    } else customerData.background_img = customer.background_img;

    await Links.destroy({ where: { customerId } });

    const mediasExist = await Promise.all(
      medias.map(async (media) => {
        try {
          const result = await SocialMedias.findByPk(media.mediaId);
          return !!result;
        } catch (err) {
          return false;
        }
      })
    );

    if (mediasExist.includes(false)) {
      return res.status(400).json({
        msg: "One or more social media do not exist",
      });
    }

    const updatedCustomer = await Customers.update(customerData, {
      new: true,
      where: { id: customerId },
    });

    if (!updatedCustomer) {
      return res.status(404).json({ msg: "Customer not found" });
    }

    for (const media of medias)
      await Links.create({
        customerId: customerId,
        mediaId: media.mediaId,
        link: media.link,
      });

    res.status(200).json({
      msg: "Customer details updated successfully",
      customer: updatedCustomer,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Internal server error" });
  }
};

const deleteCustomer = async (req, res) => {
  const customerId = req.params.id;

  try {
    const customer = await Customers.findByPk(customerId);

    if (!customer) {
      return res.status(404).json({ msg: "Customer not found" });
    }

    await customer.destroy();

    res.status(200).json({ msg: "Customer deleted successfully" });
  } catch (error) {
    res.status(500).json({ msg: "Internal server error" });
  }
};

module.exports = {
  getAllCustomers,
  getCustomerByDomainName,
  createCustomer,
  editCustomer,
  deleteCustomer,
  getCustomerById,
};
