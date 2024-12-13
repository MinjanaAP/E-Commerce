const express = require("express");
const Products = require("./products.model");
const Reviews = require("../reviews/reviews.model");
const verifyToken = require("../middleware/verifyToken");
const verifyAdmin = require("../middleware/verifyAdmin");
const uploadImage = require('../utils/uploadImage'); 
const router = express.Router();

//post a product
router.post("/create-product", async (req, res) => {
  try {
    const { image, image1,image2,image3, ...productData } = req.body;

    // Upload images to Cloudinary
    const uploadedImage = await uploadImage(image);
    const uploadedImage1 = await uploadImage(image1);
    const uploadedImage2 = await uploadImage(image2);
    const uploadedImage3 = await uploadImage(image3);

    // Create new product with uploaded image URLs
    const newProduct = new Products({
      ...productData,
      image: uploadedImage,
      image1: uploadedImage1,
      image2: uploadedImage2,
      image3: uploadedImage3
    });

    const savedProduct = await newProduct.save();

    // Calculate reviews (if any logic remains unchanged)
    const reviews = await Reviews.find({ productId: savedProduct._id });
    if (reviews.length > 0) {
      const totalRating = reviews.reduce(
        (acc, review) => acc + review.rating,
        0
      );
      const averageRating = totalRating / reviews.length;
      savedProduct.rating = averageRating;
      await savedProduct.save();
    }

    res.status(201).json(savedProduct);
  } catch (error) {
    console.error("Error creating new product", error);
    res.status(500).send({ message: "Failed to create new product" });
  }
});

//get all products
router.get("/", async (req, res) => {
  try {
      const {
        category,
        color,
        minPrice,
        maxPrice,
        page = 1,
        limit = 10,
      } = req.query;

      let filter = {};

      // Handle category filter
      if (category && category !== 'all') {
          filter.category = category;
      }

      // Handle color filter
      if (color && color !== 'all') {
          filter.color = color;
      }

      // Handle price range filter
      if (minPrice && maxPrice) {
          const min = parseFloat(minPrice);
          const max = parseFloat(maxPrice);
          if (!isNaN(min) && !isNaN(max)) {
              filter.price = { $gte: min, $lte: max };
          }
      }

      const skip = (parseInt(page) - 1) * parseInt(limit);
      const totalProducts = await Products.countDocuments(filter);
      const totalPages = Math.ceil(totalProducts / parseInt(limit));
      const products = await Products.find(filter)
                                      .skip(skip)
                                      .limit(parseInt(limit))
                                      .populate("author", "email")
                                      .sort({ createdAt: -1 });

      res.status(200).send({ products, totalPages, totalProducts });
}catch (error) {
        console.error("Error fetching product", error);
     res.status(500).send({message: "Error fetching product"})
 
    }
});

//get single product
router.get("/:id",async (req,res)=>{
  try {
      const productId = req.params.id;
      const product = await Products.findById(productId).populate("author","email username");
      if(!product){
        return res.status(404).send({message: "Product not found"});
      }
      const reviews = await Reviews.find({productId}).populate("userId","username email");
      res.status(200).send({product, reviews});
  } catch (error) {
    console.error("Error fetching product", error);
     res.status(500).send({message: "Error fetching product"})

  }
});

// update a product 
router.patch("/update-product/:id", verifyToken, verifyAdmin, async(req,res)=>{
  try {
    const productId = req.params.id;
    const updatedProduct = await Products.findByIdAndUpdate(productId,{...req.body},{new:true})
    if(!updatedProduct){
      return res.status(404).send({message: "Product not found"});
    }
    res.status(200).send({message: "Product updated successfully", updatedProduct});
  } catch (error) {
     res.status(500).send({message: "failed to update the product"})

  }
});

// delete a product
router.delete('/:id', async(req,res)=>{
  try {
    const productId = req.params.id;
    const deleteProduct = await Products.findByIdAndDelete(productId);
    if(!deleteProduct){
      return res.status(404).send({message: "Product not found"});
    }
    //delete reviews related to product
    await Reviews.deleteMany({productId:productId});
    res.status(200).send({message: "Product deleted successfully"});
  } catch (error) {
    console.error("Error deleting the product", error);
     res.status(500).send({message: "Failed to delete the product"})

  }
});

//get related product
router.get("/related/:id", async(req,res)=>{
  try {
    const {id}= req.params;
    if(!id){
      return res.status(400).send({message: "Product id is required"})
    }
    const product = await Products.findById(id);
    if(!product){
      return res.status(404).send({message: "Product not found"})
    }
    const titleRegex = new RegExp(
      product.name.split(" ").filter((word)=>word.length>1).join("|"),
      "i"
    );
    const relatedProducts = await Products.find({
      _id: {$ne: id},
      $or: [
        {name:{$regex: titleRegex}},
        {category: product.category},
        {color:product.color}
      ]
    });
    res.status(200).send(relatedProducts);
  } catch (error) {
    
    console.error("Error fetching the related product", error);
     res.status(500).send({message: "failed to fetch related product"})

  }
})

module.exports = router;
