const bcrypt = require("bcryptjs");
const { User } = require("../models");
const jwtsign = require("../config/jwtSign");

const login = async (req, res) => {
  const { phone, password } = req.body;
  if (!phone || !password) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }

  try {
    const user = await User.findOne({ where: { phone } });
    if (!user) {
      return res.status(404).json({ msg: "User not exists" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Password incorrect" });
    }

    const token = await jwtsign({
      phone: user.phone,
      id: user.id,
    });

    return res
      .status(200)
      .cookie("adminToken", token, {
        expires: new Date(
          Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
        ),
      })
      .json({ msg: "Logged in successfully", token });
  } catch (error) {
    res.status(500).json({ msg: "Internal server error" });
  }
};

const getCompanyDetails = async (req, res) => {
  try {
    const company = await User.findOne({
      attributes: ["company_name", "link"],
    });

    if (!company)
      return res.status(404).json({ msg: "There is no data exist" });

    res.status(200).json(company);
  } catch (error) {
    res.status(500).json({ msg: "Internal server error" });
  }
};

const logout = async (req, res) => {
  try {
    const token = req.cookies && req.cookies["adminToken"];

    if (!token) {
      return res.status(401).json({ msg: "User not authenticated" });
    }

    res
      .status(200)
      .cookie("adminToken", "", {
        httpOnly: true,
        expires: new Date(0),
      })
      .json({
        msg: "User Logged Out Successfully",
      });
  } catch (err) {
    res.status(500).json({ msg: "Internal server error" });
  }
};

const verifyToken = (req, res) => {
  res.status(200).send({
    userId: req.userId,
  });
};

const editPhone = async (req, res) => {
  const { phone, newPhone, password } = req.body;

  try {
    const user = await User.findOne({ where: { phone } });

    if (!user) {
      return res.status(400).json({ msg: "Internal Error" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ msg: "Internal Error" });
    }

    user.phone = newPhone;
    await user.save();

    return res.json({ msg: "Phone number updated successfully" });
  } catch (error) {
    res.status(500).json({ msg: "Internal server error" });
  }
};

const editPassword = async (req, res) => {
  const { phone, password, newPassword } = req.body;

  try {
    const user = await User.findOne({ where: { phone } });

    if (!user) {
      return res.status(400).json({ msg: "Internal Error" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ msg: "Internal Error" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    return res.json({ msg: "Password updated successfully" });
  } catch (error) {
    res.status(500).json({ msg: "Internal server error" });
  }
};

module.exports = {
  login,
  logout,
  verifyToken,
  editPhone,
  editPassword,
  getCompanyDetails,
};
