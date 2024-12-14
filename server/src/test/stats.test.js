const request = require("supertest");
const express = require("express");
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");

const User = require("../users/user.model");
const Order = require("../orders/orders.model");
const Products = require("../products/products.model");
const Reviews = require("../reviews/reviews.model");
const statsRouter = require("../stats/stats.route");

let app;
let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

  app = express();
  app.use(express.json());
  app.use("/stats", statsRouter);
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

beforeEach(async () => {
  await User.deleteMany();
  await Order.deleteMany();
  await Products.deleteMany();
  await Reviews.deleteMany();
});

describe("Stats API", () => {
  it("should fetch user stats by email", async () => {
    
    const user = await User.create({
      email: "test@example.com",
      password: "password123",
    });



    const product = await Products.create({
        name: "Test Product",
        price: 200,
        author: new mongoose.Types.ObjectId(),
    })
    const userId = new mongoose.Types.ObjectId();
    await Order.create([
      {
        email: user.email,
        userId: userId,
        products: [
          { productId: "prod1", quantity: 2 },
          { productId: "prod2", quantity: 1 },
        ],
        amount: 50,
      },
      {
        email: user.email,
        userId: userId,
        products: [{ productId: "prod3", quantity: 3 }],
        amount: 30,
      },
    ]);

    await Reviews.create([
      { userId: user._id, productId: product._id, productName:product.name, comment: "Good", rating: 4 },
      { userId: user._id, productId: product._id, productName:product.name, comment: "Great", rating: 5 },
    ]);

    const response = await request(app).get(`/stats/user-stats/${user.email}`);
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      totalPayments: "80.00",
      totalReviews: 2,
      totalPurchasedProducts: 3,
    });
  });

  it("should fetch admin stats", async () => {
    const user = await User.create([
      { username: "user1" ,email: "user1@example.com", password: "password123" },
      {username: "user2" , email: "user2@example.com", password: "password123" },
    ]);

    const product = await Products.create([
      { name: "Product 1", price: 20, author: user[0]._id },
      { name: "Product 2", price: 30, author: user[1]._id},
    ]);

    const userId = new mongoose.Types.ObjectId();

    await Order.create([
      { email: "user1@example.com", products: [{ productId: product[0]._id, quantity: 2 }], amount: 40,userId: userId, },
      { email: "user2@example.com", products: [{ productId: product[1]._id, quantity: 1 }], amount: 30 ,userId: userId,},
    ]);

    await Reviews.create([
      { userId: user[0]._id, productId: product[0]._id, productName:product[0].name, comment: "Good", rating: 4 },
      { userId: user[1]._id, productId: product[1]._id, productName:product[1].name, comment: "Great", rating: 5 },
    ]);

    const response = await request(app).get("/stats/admin-stats");
    expect(response.status).toBe(200);
    expect(response.body.totalOrders).toBe(2);
    expect(response.body.totalProducts).toBe(2);
    expect(response.body.totalReviews).toBe(2);
    expect(response.body.totalUsers).toBe(2);
    expect(response.body.totalEarnings).toBe(70);
    expect(response.body.monthlyEarnings).toBeDefined();
  });

  it("should return 404 for user stats if user does not exist", async () => {
    const response = await request(app).get("/stats/user-stats/nonexistent@example.com");
    expect(response.status).toBe(404);
    expect(response.body.message).toBe("user not found");
  });
});
