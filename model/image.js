const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const imageSchema = new Schema({
    filename: { type: String, required: true }, // Name of the uploaded file
    filepath: { type: String, required: true } // Path to the uploaded file on the server
});

const Image = mongoose.model('Image', imageSchema);

module.exports = Image;
