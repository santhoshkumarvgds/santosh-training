//core module
const express = require("express");
const router = express.Router();

const validuser = require("../middleware/checkvalid");

const { product ,order} = require("../models/database");

router.post("/addproduct", validuser, async (req, res, next) => {
  console.log(req.body.productimage);
  if (req.session.role == "Seller") {
    try {
      var productimage = "update soon";
      var ProductInsert = await product.create({
        email: req.session.email,
        product_name: req.body.productname,
        product_image: req.body.productimage,
        product_prize: req.body.productprize,
        product_category:req.body.productcategory,
        product_companyname:req.body.productcompanyname,
        product_warranty:req.body.productwarranty,
        product_description: req.body.productdescription,
      });
      res.json({
        status: "success",
      });
    } catch (error) {
      console.log(error);
      res.json({
        status: "failed",
      });
    }
  } else {
    res.json({
      status: "Role mismatch",
    });
  }
});

router.post("/sellerproduct", validuser, async (req, res, next) => {
  if (req.session.role == "Seller") {
    try {
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
    } catch (error) {
      console.log(error);
      res.json({
        status: "failed",
      });
    }
  } else {
    res.json({
      status: "Role mismatch",
    });
  }
});

router.post("/allproduct", async (req, res, next) => {

  try {
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
  } catch (error) {
    console.log(error);
    res.json({
      status: "failed",
    });
  }
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

router.post("/deleteproduct", validuser, async (req, res, next) => {
  console.log(req.session.role);
  if (req.session.role == "Admin") {
    try {
      await product.destroy({
        where: { id: req.body.id },
      });
      res.json({
        status: "success",
      });
    } catch (err) {
      console.log(err);
    }
  } else {
    res.json({
      status: "role mismatch",
    });
  }
});


router.post("/assured", validuser, async (req, res, next) => {
  try {
    if (req.session.role == "Admin") {
      product.update(
        { product_assured: "Assured" },
        { where: { id:req.body.id } }
      );
      res.json({
        status : "assured"
      })
    } else {
      res.json({
        message: "Role mismatch",
      });
    }
  } catch (error) {
    res.json({
      status:"Try again"
    })
  }
});

router.post("/placeorder", async (req, res, next) => {
  if(req.session.role=="User"){
  try {
    const dbProductList = await product.findAll({
      where: { id: req.body.id },
      attributes: [
        "product_name",
        "product_prize"
      ],
    });
    var dbInsert = await order.create({
      email: req.session.email,
      product_name:dbProductList[0].product_name,
      product_prize:dbProductList[0].product_prize,
    });
    res.json({
      status: "success",
    });
  } catch (error) {
    console.log(error);
    res.json({
      status: "failed",
    });
  }
}else{
  res.json({
    status:"Role Mismatch"
  })
}
});

router.post("/orders", async (req, res, next) => {
  if(req.session.role=="User"){
  try {
    const dbProductList = await order.findAll({
      where: { email: req.session.email },
      attributes: [
        "id",
        "product_name",
        "product_prize",
      ],
    });
    res.json({
      productlist: dbProductList,
    });
  } catch (error) {
    console.log(error);
    res.json({
      status: "failed",
    });
  }}else{
  res.json({
    status:"Role Mismatch"
  })
}
});

router.post("/getproduct",async(req,res)=>{
  try{

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
    });
  } catch (error) {
    console.log(error);
    res.json({
      status: "failed",
    });
  }
})

module.exports = {
  product: router,
};
