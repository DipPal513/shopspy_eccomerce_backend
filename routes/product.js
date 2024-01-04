const express = require("express");
const { getAllProducts, postAllProducts } = require("../controllers/product");
const router = express.Router();

router.route('/').get(getAllProducts);
// router.route("/").post(postAllProducts);

module.exports = router;