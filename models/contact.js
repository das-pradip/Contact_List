const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    phone: {
        type: String,
        required: true
    }
});

// the name "Contact" is save in database
const Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;