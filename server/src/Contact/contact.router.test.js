const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const express = require('express');
const Contact = require('./contact.model');
const contactRoutes = require('./contact.router');

const app = express();
app.use(express.json());
app.use('/contacts', contactRoutes);

let mongoServer;

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
});

afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await mongoServer.stop();
});

beforeEach(async () => {
    await Contact.deleteMany();
});

describe('Contact Routes', () => {
    describe('POST /contacts/create', () => {
        it('should create a new contact', async () => {
            const newContact = {
                name: 'John Doe',
                email: 'johndoe@example.com',
                phone: '1234567890',
                message: 'This is a test message'
            };

            const response = await request(app)
                .post('/contacts/create')
                .send(newContact)
                .expect(201);

            expect(response.body.message).toBe('Contact details submitted successfully');

            const contacts = await Contact.find();
            expect(contacts.length).toBe(1);
            expect(contacts[0].name).toBe(newContact.name);
        });

        it('should return a 500 error for invalid data', async () => {
            const invalidContact = {
                email: 'not-an-email',
                phone: '123',
                message: 'Invalid data'
            };

            const response = await request(app)
                .post('/contacts/create')
                .send(invalidContact)
                .expect(500);

            expect(response.body.message).toBe('Error submitting contact details');
        });
    });

    describe('GET /contacts/all', () => {
        it('should fetch all contact details', async () => {
            await Contact.create([
                { name: 'Alice', email: 'alice@example.com', phone: '9876543210', message: 'Message 1' },
                { name: 'Bob', email: 'bob@example.com', phone: '1234567890', message: 'Message 2' }
            ]);

            const response = await request(app)
                .get('/contacts/all')
                .expect(200);

            expect(response.body.length).toBe(2);
        });

        it('should return an empty array if no contacts exist', async () => {
            const response = await request(app)
                .get('/contacts/all')
                .expect(200);

            expect(response.body).toEqual([]);
        });
    });
});
