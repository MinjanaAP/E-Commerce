const request = require("supertest");
const express = require("express");
const mongoose = require("mongoose");
const Reviews = require("../reviews/reviews.model");
const Products = require("../products/products.model");
const reviewRouter = require("../reviews/reviews.router");
const { MongoMemoryServer } = require("mongodb-memory-server");

let app;
let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

  app = express();
  app.use(express.json());
  app.use("/reviews", reviewRouter);
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe("Reviews API", () => {
  let product;

  beforeEach(async () => {
    await Reviews.deleteMany();
    await Products.deleteMany();

    product = await Products.create({
      name: "Test Product",
      price: 100,
      category: "Category",
      author: new mongoose.Types.ObjectId(),
    });
  });

  it("should post a new review", async () => {
    const reviewData = {
      comment: "Great product!",
      rating: 5,
      productId: product._id,
      userId: new mongoose.Types.ObjectId(),
    };

    const response = await request(app).post("/reviews/post-review").send(reviewData);
    expect(response.status).toBe(200);
    expect(response.body.reviews.length).toBe(1);
    expect(response.body.reviews[0].comment).toBe("Great product!");
  });

  it("should update an existing review", async () => {
    const userId = new mongoose.Types.ObjectId();
    const review = await Reviews.create({
      comment: "Good product",
      rating: 4,
      productId: product._id,
      userId,
      productName: product.name,
    });

    const updatedReviewData = {
      comment: "Excellent product!",
      rating: 5,
      productId: product._id,
      userId,
    };

    const response = await request(app).post("/reviews/post-review").send(updatedReviewData);
    expect(response.status).toBe(200);
    expect(response.body.reviews.length).toBe(1);
    expect(response.body.reviews[0].comment).toBe("Excellent product!");
  });

  it("should calculate the total review count", async () => {
    await Reviews.create({
      comment: "Great product!",
      rating: 5,
      productId: product._id,
      userId: new mongoose.Types.ObjectId(),
      productName: product.name,
    });

    const response = await request(app).get("/reviews/total-reviews");
    expect(response.status).toBe(200);
    expect(response.body.totalReviews).toBe(1);
  });

  it("should fetch reviews by userId", async () => {
    const userId = new mongoose.Types.ObjectId();
    await Reviews.create({
      comment: "Amazing product!",
      rating: 5,
      productId: product._id,
      userId,
      productName: product.name,
    });

    const response = await request(app).get(`/reviews/${userId}`);
    expect(response.status).toBe(200);
    expect(response.body.reviews.length).toBe(1);
    expect(response.body.reviews[0].comment).toBe("Amazing product!");
  });

  it("should return 404 if no reviews are found for a userId", async () => {
    const userId = new mongoose.Types.ObjectId();
    const response = await request(app).get(`/reviews/${userId}`);
    expect(response.status).toBe(404);
    expect(response.body.message).toBe("No reviews found");
  });
});