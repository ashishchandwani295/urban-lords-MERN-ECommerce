const Product = require("../models/product");
const formidable = require("formidable");
const fs = require("fs");
const _ = require("lodash");
const { count } = require("console");
const { populate } = require("../models/product");
//const Category = require("../models/category");
// const User = require("../models/user");


//Read controllers
exports.getProductbyId = (req, res, next, productId) => {
    //console.log(Product.findById(productId).populate("category"))
    Product.findById(productId)
    .populate("category")
    .exec((err, product) => {
        if(err){
            return res.status(400).json({
                error: "Product(s) does not exist in DB"
            })
        }

        req.product = product;
        next();
    })
    
}

exports.getProduct = (req, res) => {
  req.product.photo = undefined;
  return res.json(req.product);
}

//Create controllers TODO:Revisit to understand the logic
exports.createProduct = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
  
    form.parse(req, (err, fields, file) => {
      if (err) {
        return res.status(400).json({
          error: "problem with image"
        });
      }

      const { name, description, price, category, stock } = fields;

      if(!name || !description || !price || !category || !stock){
          return res.status(400).json({
              error: "Please include all the fields"
          })
      }

      let product = new Product(fields);
  
      //handle file here
      if (file.photo) {
        if (file.photo.size > 3000000) {
          return res.status(400).json({
            error: "File size too big!"
          });
        }
        product.photo.data = fs.readFileSync(file.photo.path);
        product.photo.contentType = file.photo.type;
      }
  
      //save to the DB
      product.save((err, product) => {
        if (err) {
          return res.status(400).json({
            error: "Saving tshirt in DB failed"
          });
        }
        res.json(product);
      });
    });
  };

//delete controllers
exports.removeProduct = (req, res) => {

  const product = req.product;

  product.remove((err,product) => {
      if(err){
        return res.status(400).json({
          error: "Unable to delete product from DB"
        })
      }

      res.json({
        message: `${product} deleted from DB`
      });
  })
}

//update controllers
exports.updateProduct = (req,res) => {
    console.log("here in update stock")
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
  
    form.parse(req, (err, fields, file) => {
      if (err) {
        return res.status(400).json({
          error: "problem with image"
        });
      }

      const { name, description, price, category, stock } = fields;

      let product = req.product;
      product = _.extend(product,fields);
  
      //handle file here
      if (file.photo) {
        if (file.photo.size > 3000000) {
          return res.status(400).json({
            error: "File size too big!"
          });
        }
        product.photo.data = fs.readFileSync(file.photo.path);
        product.photo.contentType = file.photo.type;
      }
  
      //save to the DB
      product.save((err, product) => {
        if (err) {
          return res.status(400).json({
            error: "Updation of product in DB failed"
          });
        }
        res.json(product);
      });
    });
  };

//Listing controllers
exports.getAllProducts = (req,res) => {
  let limit = req.query.limit ? parseInt(req.query.limit) : 8;
  let sortBy = req.query.sortBy ? req.query.sortBy : "_id";
  
  Product.find()
  .select("-photo")
  .populate("category")
  .sort([[sortBy, "asc"]])
  .limit(limit)
  .exec((err,products) => {
    if(err){
      return res.status(400).json({
        error: "Fetching products from DB failed!"
      })
    }
    res.json(products);
  })
}

exports.getAllUniqueCategories = (req,res) => {
  Product.distinct("category", {}, (err,categories) => {
    if(err){
      return res.status(400).json({
        error: "No categories found"
      })
    }

    res.json(categories);
  })
}

//middlewares TODO: revisit to understand its impact
exports.photo = (req, res, next) => {
  if(req.product.photo.data){
    res.set("Content-Type", req.product.photo.contentType)
    return res.send(req.product.photo.data)
  }  
  next();
}

//TODO: revisit the logic and documentation for Bulk Write mongoose
exports.updateStock = (req, res, next) => {
   let operations = req.body.order.products.map( prod => {
     return {
       updateOne: {
         filter: {_id: prod._id},
         update: {$inc: {stock: prod.sold -1, sold: prod.sold + 1}}
       }
     }
   })

   Product.bulkWrite(operations, {}, (err,produts) => {
     if(err){
       console.log(err)
       return res.status(400).json({
         error: "Bulk operations failed"
       })
     }
     next();     
   })
  
}
