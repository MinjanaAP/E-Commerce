const express = require('express');
const router = express.Router();
const Contact = require('./contact.model');

//create contact message
router.post('/create', async (req, res) => {
    try {
        const { name, email, phone, message } = req.body;
        const contact = new Contact({ name, email, phone, message });
        await contact.save();
        res.status(201).send({ message: "Contact details submitted successfully" });
    } catch (error) {
        res.status(500).send({ message: "Error submitting contact details" });
    }
});

// Route to fetch all contact details
router.get('/all', async (req, res) => {
    try {
        const contacts = await Contact.find().sort({ createdAt: -1 });
        res.status(200).json(contacts);
    } catch (error) {
        console.error("Error fetching contact details", error);
        res.status(500).send({ message: "Error fetching contact details" });
    }
});


module.exports = router;
