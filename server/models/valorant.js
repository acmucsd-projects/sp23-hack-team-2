const mongoose = require('mongoose');

const ValorantSchema = new mongoose.Schema({
    userid: {
        type: String,
        required: true
    },
    val_username: {
        type: String,
        required: true
    },
    rank: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    region: {
        type: String,
        required: true
    },
    bio: {
        type: String,
        required: false
    }
});

const Valorant = mongoose.model('Valorant', ValorantSchema);

module.exports = Valorant;