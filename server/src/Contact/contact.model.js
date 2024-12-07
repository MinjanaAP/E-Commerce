const { Schema, model } = require('mongoose');

const contactSchema = new Schema({
    name: { type: String, required: true, maxlength: 100 },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    message: { type: String, required: true, maxlength: 500 },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});
contactSchema.statics.getRecentMessages = function(limit = 10) {
    return this.find().sort({ createdAt: -1 }).limit(limit);
};

const Contact = new model('Contact', contactSchema);
module.exports = Contact;
