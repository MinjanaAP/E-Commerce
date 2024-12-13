const request = require("supertest");
const express = require("express");
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const Order = require("../orders/orders.model");
const User = require("../users/user.model");
const orderRouter = require("../orders/order.route");

jest.mock("nodemailer", () => ({
    createTransport: jest.fn().mockReturnValue({
        sendMail: jest.fn().mockResolvedValue("Mock email sent"),
    }),
}));

jest.mock("stripe", () => {
    return jest.fn(() => ({
        checkout: {
            sessions: {
                create: jest.fn().mockResolvedValue({ id: "mock_session_id" }),
                retrieve: jest.fn().mockResolvedValue({
                    id: "mock_session_id",
                    payment_intent: { id: "mock_payment_intent" },
                    amount_total: 4000,
                    line_items: {
                        data: [
                            {
                                price: { product: "mock_product" },
                                quantity: 2,
                            },
                        ],
                    },
                    customer_details: { email: "test@example.com" },
                    payment_status: "paid",
                }),
            },
        },
    }));
});

let app;
let mongoServer;
let token;

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    await mongoose.connect(uri);

    //! Create a test user and generate a JWT token
    const user = new User({
        email: "test@example.com",
        password: "password",
    });
    await user.save();

    token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY || "default_secret_key", {
        expiresIn: "1h",
    });

    app = express();
    app.use(express.json());
    app.use("/orders", orderRouter);
});

afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
});

beforeEach(async () => {
    await Order.deleteMany();
});

describe("Orders API", () => {
    it("should create a checkout session", async () => {
        const response = await request(app).post("/orders/create-checkout-session").send({
            products: [
                {
                    name: "Product 1",
                    price: 20,
                    image: "https://example.com/image.png",
                    quantity: 2,
                },
            ],
        });

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("id", "mock_session_id");
        expect(response.body.message).toBe("Order created successfully");
    });

    it("should confirm payment and save an order", async () => {
        const response = await request(app)
            .post("/orders/confirm-payment")
            .set("Authorization", `Bearer ${token}`)
            .send({
                session_id: "mock_session_id",
            });

        expect(response.status).toBe(200);
        expect(response.body.message).toBe("Payment confirmed and order updated");
        expect(response.body.order).toHaveProperty("orderId", "mock_payment_intent");
    });

    it("should fetch orders by email", async () => {
        const userId = new mongoose.Types.ObjectId();
        const order = await Order.create({
            orderId: "123",
            userId: userId,
            products: [{ productId: "abc", quantity: 2 }],
            amount: 100,
            email: "test@example.com",
            status: "pending",
        });

        const response = await request(app)
            .get(`/orders/${order.email}`)
            .set("Authorization", `Bearer ${token}`);

        expect(response.status).toBe(200);
        expect(response.body.orders.length).toBe(1);
        expect(response.body.orders[0].email).toBe("test@example.com");
    });

    it("should fetch order by ID", async () => {
        const userId = new mongoose.Types.ObjectId();
        const order = await Order.create({
            orderId: "123",
            userId: userId,
            products: [{ productId: "abc", quantity: 2 }],
            amount: 100,
            email: "test@example.com",
            status: "pending",
        });

        const response = await request(app)
            .get(`/orders/order/${order._id}`)
            .set("Authorization", `Bearer ${token}`);

        expect(response.status).toBe(200);
        expect(response.body.email).toBe("test@example.com");
    });

    it("should fetch all orders", async () => {
        const userId = new mongoose.Types.ObjectId();

        await Order.create({
            orderId: "123",
            userId: userId,
            products: [{ productId: "abc", quantity: 2 }],
            amount: 100,
            email: "test@example.com",
            status: "pending",
        });

        const response = await request(app)
            .get("/orders")
            .set("Authorization", `Bearer ${token}`);

        expect(response.status).toBe(200);
        expect(response.body.length).toBe(1);
    });

    it("should update an order status", async () => {
        const userId = new mongoose.Types.ObjectId();
        const order = await Order.create({
            orderId: "123",
            userId: userId,
            products: [{ productId: "abc", quantity: 2 }],
            amount: 100,
            email: "test@example.com",
            status: "pending",
        });

        const response = await request(app)
            .patch(`/orders/update-order-status/${order._id}`)
            .set("Authorization", `Bearer ${token}`)
            .send({ status: "shipped" });

        expect(response.status).toBe(200);
        expect(response.body.order.status).toBe("shipped");
    });

    it("should delete an order", async () => {
        const userId = new mongoose.Types.ObjectId();

        const order = await Order.create({
            orderId: "123",
            userId: userId,
            products: [{ productId: "abc", quantity: 2 }],
            amount: 100,
            email: "test@example.com",
            status: "pending",
        });

        const response = await request(app)
            .delete(`/orders/delete-order/${order._id}`)
            .set("Authorization", `Bearer ${token}`);

        expect(response.status).toBe(200);
        expect(response.body.order).toHaveProperty("orderId", "123");
    });
});
