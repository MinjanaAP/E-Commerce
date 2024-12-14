const request = require("supertest");
const express = require("express");
const mongoose = require("mongoose");
const Products = require("../products/products.model");
const Reviews = require("../reviews/reviews.model");
const productRouter = require("../products/products.route");
const { MongoMemoryServer } = require("mongodb-memory-server");

jest.mock("../middleware/verifyToken", () => {
  return (req, res, next) => {
    req.user = { role: "admin" };
    next();
  };
});

jest.mock("../middleware/verifyAdmin", () => {
  return (req, res, next) => {
    next();
  };
});

let app;
let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);

  app = express();
  app.use(express.json());
  app.use("/products", productRouter);
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe("Products API - Update Product", () => {
  beforeEach(async () => {
    await Products.deleteMany();
    await Reviews.deleteMany();
  });

  it("should update a product successfully", async () => {
    const product = await Products.create({
      name: "Test Product",
      price: 100,
      color: "Red",
      category: "Category",
      author: new mongoose.Types.ObjectId(),
    });

    const updatedData = { name: "Updated Product", color: "Blue", price: 120 };
    const response = await request(app)
      .patch(`/products/update-product/${product._id}`)
      .send(updatedData);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("message", "Product updated successfully");
    expect(response.body.updatedProduct.name).toBe("Updated Product");
    expect(response.body.updatedProduct.color).toBe("Blue");
    expect(response.body.updatedProduct.price).toBe(120);

    const updatedProduct = await Products.findById(product._id);
    expect(updatedProduct.name).toBe("Updated Product");
    expect(updatedProduct.color).toBe("Blue");
    expect(updatedProduct.price).toBe(120);
  });

  it("should return 404 if product is not found", async () => {
    const nonExistentId = new mongoose.Types.ObjectId();
    const response = await request(app)
      .patch(`/products/update-product/${nonExistentId}`)
      .send({ name: "Nonexistent Product" });

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("message", "Product not found");
  });

  it("should return 500 on server error", async () => {
    jest.spyOn(Products, "findByIdAndUpdate").mockImplementationOnce(() => {
      throw new Error("Database error");
    });

    const product = await Products.create({
      name: "Test Product",
      price: 100,
      color: "Red",
      category: "Category",
      author: new mongoose.Types.ObjectId(),
    });

    const response = await request(app)
      .patch(`/products/update-product/${product._id}`)
      .send({ name: "New Name" });

    expect(response.status).toBe(500);
    expect(response.body).toHaveProperty("message", "failed to update the product");
  });
});