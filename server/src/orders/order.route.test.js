const request = require("supertest");
const express = require("express");
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const stripe = require("stripe");
const Order = require("./orders.model");
const orderRouter = require("./order.route");

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

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    await mongoose.connect(uri);

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
        const response = await request(app).post("/orders/confirm-payment").send({
            session_id: "mock_session_id",
        });

        expect(response.status).toBe(200);
        expect(response.body.message).toBe("Payment confirmed and order updated");
        expect(response.body.order).toHaveProperty("orderId", "mock_payment_intent");
    });

    it("should fetch orders by email", async () => {
        const order = await Order.create({
            orderId: "123",
            products: [{ productId: "abc", quantity: 2 }],
            amount: 100,
            email: "test@example.com",
            status: "pending",
        });

        const response = await request(app).get(`/orders/${order.email}`);
        expect(response.status).toBe(200);
        expect(response.body.orders.length).toBe(1);
        expect(response.body.orders[0].email).toBe("test@example.com");
    });

    it("should fetch order by ID", async () => {
        const order = await Order.create({
            orderId: "123",
            products: [{ productId: "abc", quantity: 2 }],
            amount: 100,
            email: "test@example.com",
            status: "pending",
        });

        const response = await request(app).get(`/orders/order/${order._id}`);
        expect(response.status).toBe(200);
        expect(response.body.email).toBe("test@example.com");
    });

    it("should fetch all orders", async () => {
        await Order.create({
            orderId: "123",
            products: [{ productId: "abc", quantity: 2 }],
            amount: 100,
            email: "test@example.com",
            status: "pending",
        });

        const response = await request(app).get("/orders");
        expect(response.status).toBe(200);
        expect(response.body.length).toBe(1);
    });

    it("should update an order status", async () => {
        const order = await Order.create({
            orderId: "123",
            products: [{ productId: "abc", quantity: 2 }],
            amount: 100,
            email: "test@example.com",
            status: "pending",
        });

        const response = await request(app)
            .patch(`/orders/update-order-status/${order._id}`)
            .send({ status: "shipped" });

        expect(response.status).toBe(200);
        expect(response.body.order.status).toBe("shipped");
    });

    it("should delete an order", async () => {
        const order = await Order.create({
            orderId: "123",
            products: [{ productId: "abc", quantity: 2 }],
            amount: 100,
            email: "test@example.com",
            status: "pending",
        });

        const response = await request(app).delete(`/orders/delete-order/${order._id}`);
        expect(response.status).toBe(200);
        expect(response.body.order).toHaveProperty("orderId", "123");
    });
});