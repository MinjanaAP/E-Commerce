const request = require("supertest");
const express = require("express");
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const Category = require("../categories/category.model");
const categoryRouter = require("../categories/category.route");

let app;
let mongoServer;

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    await mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    app = express();
    app.use(express.json());
    app.use("/categories", categoryRouter);
});

afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
});

beforeEach(async () => {
    await Category.deleteMany();
});

describe("Category API", () => {
    it("should create a new category", async () => {
        const response = await request(app).post("/categories").send({
            name: "Test Category",
            description: "This is a test category",
        });

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty("name", "Test Category");
    });

    it("should fetch all categories", async () => {
        await Category.create({
            name: "Category 1",
            description: "Description 1",
        });

        await Category.create({
            name: "Category 2",
            description: "Description 2",
        });

        const response = await request(app).get("/categories");

        expect(response.status).toBe(200);
        expect(response.body.length).toBe(2);
        expect(response.body[0]).toHaveProperty("name", "Category 1");
        expect(response.body[1]).toHaveProperty("name", "Category 2");
    });

    it("should fetch a single category by ID", async () => {
        const category = await Category.create({
            name: "Single Category",
            description: "Single Category Description",
        });

        const response = await request(app).get(`/categories/${category._id}`);

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("name", "Single Category");
    });

    it("should update a category", async () => {
        const category = await Category.create({
            name: "Old Category",
            description: "Old Description",
        });

        const response = await request(app).put(`/categories/${category._id}`).send({
            name: "Updated Category",
            description: "Updated Description",
        });

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("name", "Updated Category");
    });

    it("should delete a category", async () => {
        const category = await Category.create({
            name: "Category to Delete",
            description: "This category will be deleted",
        });

        const response = await request(app).delete(`/categories/${category._id}`);

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("message", "Category deleted successfully");
    });
});
