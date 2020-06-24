//core module
const express = require("express");
const router = express.Router();
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toDateString() + file.originalname);
  },
});
const upload = multer({ storage: storage });

const validuser = require("../middleware/checkvalid");
const roleCheck = require("../middleware/roleCheck");

const { product, order } = require("../models/database");

router.post("/sellerproduct", roleCheck("Seller"), async (req, res, next) => {
      const dbProductList = await product.findAll({
        where: { email: req.session.email },
        attributes: [
          "id",
          "email",
          "product_name",
          "product_image",
          "product_prize",
          "product_category",
          "product_companyname",
          "product_warranty",
          "product_assured",
          "product_description",
        ],
      });
      res.json({
        productlist: dbProductList,
      });
});

router.post("/allproduct", async (req, res, next) => {
    const dbProductList = await product.findAll({
      attributes: [
        "id",
        "email",
        "product_name",
        "product_image",
        "product_prize",
        "product_category",
        "product_companyname",
        "product_warranty",
        "product_assured",
        "product_description",
      ],
    });
    console.log(dbProductList[0].product_image);
    res.json({
      productlist: dbProductList,
    });
});

// router.post("/searchproduct", async (req, res, next) => {
//   try {
//     const dbProductList = await product.findAll({
//       where: { product_name: req.body.search },
//       attributes: [
//         "id",
//         "email",
//         "product_name",
//         "product_image",
//         "product_prize",
//         "product_category",
//         "product_companyname",
//         "product_warranty",
//         "product_assured",
//         "product_description",
//       ],
//     });
//     res.json({
//       productlist: dbProductList,
//     });
//   } catch (error) {
//     console.log(error);
//     res.json({
//       status: "failed",
//     });
//   }
// });
router.post(
  "/productimage",
  upload.single("productimage"),roleCheck("Seller"),
  async (req, res, next) => {
        const temp = "temp";
        var ProductInsert = await product.create({
          email: req.session.email,
          product_name: temp,
          product_image: req.file.filename,
          product_prize: 1,
          product_category: temp,
          product_companyname: temp,
          product_warranty: temp,
          product_description: temp,
        });
        var db = await product.findOne({
          where: { product_image: req.file.filename },
          attributes: ["id"],
        });
        req.session.idval = db.id;
        // console.log(a);
        res.json({
          status: "success",
        });

  }
);

router.post("/addproduct", roleCheck("Seller"), async (req, res, next) => {
      const a = product.update(
        {
          product_name: req.body.productname,
          product_prize: req.body.productprize,
          product_category: req.body.productcategory,
          product_companyname: req.body.productcompanyname,
          product_warranty: req.body.productwarranty,
          product_description: req.body.productdescription,
        },
        { where: { id: req.session.idval } }
      );
      res.json({
        status: "success",
      });

});
router.post("/deleteproduct", roleCheck("Admin"), async (req, res, next) => {
      await product.destroy({
        where: { id: req.body.id },
      });
      res.json({
        status: "success",
      });

});

router.post("/assured", roleCheck("Admin"), async (req, res, next) => {
      product.update(
        { product_assured: "Assured" },
        { where: { id: req.body.id } }
      );
      res.json({
        status: "assured",
      });
});

router.post("/placeorder",roleCheck("User"), async (req, res, next) => {
      const dbProductList = await product.findAll({
        where: { id: req.body.id },
        attributes: ["product_name", "product_prize"],
      });
      var dbInsert = await order.create({
        email: req.session.email,
        product_name: dbProductList[0].product_name,
        product_prize: dbProductList[0].product_prize,
      });
      res.json({
        status: "success",
      });
});

router.post("/orders", roleCheck("User"),async (req, res, next) => {
      const dbProductList = await order.findAll({
        where: { email: req.session.email },
        attributes: ["id", "product_name", "product_prize"],
      });
      res.json({
        productlist: dbProductList,
      });
});

router.post("/getproduct", async (req, res) => {
    const dbProductList = await product.findOne({
      where: { id: req.body.id },
      attributes: [
        "email",
        "product_name",
        "product_image",
        "product_prize",
        "product_category",
        "product_companyname",
        "product_warranty",
        "product_assured",
        "product_description",
      ],
    });
    res.json({
      productlist: dbProductList,
      role: req.session.role,
    });
});

module.exports = {
  product: router,
};
