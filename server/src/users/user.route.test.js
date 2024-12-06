const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const express = require('express');
const userRoutes = require('./user.route'); 
const User = require('./user.model'); 

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
  it('should register a new user', async () => {
    const res = await request(app).post('/register').send({
      username: 'testuser',
      email: 'test@example.com',
      password: 'password123',
    });

    expect(res.status).toBe(201);
    expect(res.body.message).toBe('User Registered Successfully');
  });

  it('should log in a user with valid credentials', async () => {
    const user = new User({
      username: 'testuser',
      email: 'test@example.com',
      password: 'password123',
    });
    await user.save();

    const res = await request(app).post('/login').send({
      email: 'test@example.com',
      password: 'password123',
    });

    expect(res.status).toBe(200);
    expect(res.body.message).toBe('logged in successfully');
    expect(res.body.user.email).toBe('test@example.com');
  });

  it('should return error for invalid login credentials', async () => {
    const res = await request(app).post('/login').send({
      email: 'nonexistent@example.com',
      password: 'password123',
    });

    expect(res.status).toBe(404);
    expect(res.body.message).toBe('User not found');
  });

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

  it('should update a user role', async () => {
    const user = new User({
      username: 'testuser',
      email: 'test@example.com',
      password: 'password123',
    });
    await user.save();

    const res = await request(app).put(`/users/${user._id}`).send({
      role: 'admin',
    });

    expect(res.status).toBe(200);
    expect(res.body.message).toBe('User role updated successfully');
  });

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

  it('should return all users', async () => {
    await User.insertMany([
      { username: 'user1', email: 'user1@example.com', password: 'pass1' },
      { username: 'user2', email: 'user2@example.com', password: 'pass2' },
    ]);

    const res = await request(app).get('/users');

    expect(res.status).toBe(200);
    expect(res.body.length).toBe(2);
    expect(res.body[0].email).toBe('user1@example.com')
  });
});
