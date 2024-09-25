const express = require("express");
const router = express.Router();
const { upload } = require("../utils/multer");
const {
  getAllCustomers,
  getCustomerByDomainName,
  createCustomer,
  editCustomer,
  deleteCustomer,
  getCustomerById,
} = require("../controller/customers");
const isAuthenticated = require("../middlewares/auth");

router.get("/:customerDomain", getCustomerByDomainName);
router.get("/", isAuthenticated, getAllCustomers);
router.get("/customer/:id", isAuthenticated, getCustomerById);

router.post(
  "/",
  isAuthenticated,
  upload.fields([
    {
      name: "logo",
      maxCount: 1,
    },
    {
      name: "background_img",
      maxCount: 1,
    },
  ]),
  createCustomer
);

router.put(
  "/:id",
  upload.fields([
    {
      name: "logo",
      maxCount: 1,
    },
    {
      name: "background_img",
      maxCount: 1,
    },
  ]),
  isAuthenticated,
  editCustomer
);

router.delete("/:id", isAuthenticated, deleteCustomer);

module.exports = router;
