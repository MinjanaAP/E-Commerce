const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const express = require('express');
const userRoutes = require('../users/user.route'); 
const User = require('../users/user.model'); 

// Mock Nodemailer to prevent real email sending
jest.mock('nodemailer', () => ({
    createTransport: jest.fn().mockReturnValue({
        sendMail: jest.fn((mailOptions, callback) => callback(null, 'Email sent successfully')),
    }),
}));

let app, mongoServer;

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    await mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    app = express();
    app.use(express.json());
    app.use('/', userRoutes);
});

afterEach(async () => {
    await User.deleteMany();
});

afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
});

describe('User Routes', () => {

    //! create user with valid inputs
    it('should register a new user', async () => {
        const res = await request(app).post('/register').send({
            username: 'testuser',
            email: 'test@example.com',
            password: 'password123',
        });

        expect(res.status).toBe(201);
        expect(res.body.message).toBe('User Registered Successfully');
    });

    //! try to create user without all required inputs
    it('should return error for missing required field in account creations', async () => {
        const res = await request(app).post('/register').send({
            username: 'testuser',
            email: ' ', // empty email
            password: 'password123',
        });

        expect(res.status).toBe(400);
        expect(res.body.message).toBe('All fields are required');
    });

        // it('should log in a user with valid credentials', async () => {
    //     const user = new User({
    //     username: 'testuser',
    //     email: 'test@example.com',
    //     password: 'password123',
    //     });
    //     await user.save();

    //     const res = await request(app).post('/login').send({
    //     email: 'test@example.com',
    //     password: 'password123',
    //     });

    //     expect(res.status).toBe(200);
    //     expect(res.body.message).toBe('logged in successfully');
    //     expect(res.body.user.email).toBe('test@example.com');
    // });

    //! Invalid login credentials
    it('should return error for invalid login credentials', async () => {
        const res = await request(app).post('/login').send({
            email: 'nonexistent@example.com',
            password: 'password123',
        });

        expect(res.status).toBe(404);
        expect(res.body.message).toBe('User not found');
    });

    //! delete user
    it('should delete a user', async () => {
        const user = new User({
            username: 'testuser',
            email: 'test@example.com',
            password: 'password123',
        });
        await user.save();

        const res = await request(app).delete(`/users/${user._id}`);

        expect(res.status).toBe(200);
        expect(res.body.message).toBe('User deleted successfully');
    });

    //! update user profile
    it('should update a user profile', async () => {
        const user = new User({
            username: 'testuser',
            email: 'test@example.com',
            password: 'password123',
        });
        await user.save();

        const res = await request(app).patch('/edit-profile').send({
            userId: user._id,
            username: 'updateduser',
            bio: 'Updated bio',
        });

        expect(res.status).toBe(200);
        expect(res.body.message).toBe('Profile updated successfully');
        expect(res.body.user.username).toBe('updateduser');
        expect(res.body.user.bio).toBe('Updated bio');
    });

    //! Get all users
    it('should return all users', async () => {
        await User.insertMany([
            { username: 'user1', email: 'user1@example.com', password: 'pass1' },
            { username: 'user2', email: 'user2@example.com', password: 'pass2' },
        ]);

        const res = await request(app).get('/users');

        expect(res.status).toBe(200);
        expect(res.body.length).toBe(2);
        expect(res.body[0].email).toBe('user1@example.com');
    });
});
