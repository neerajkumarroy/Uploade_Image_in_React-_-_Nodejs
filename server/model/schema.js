const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
    image:String
})
const ImageModel = mongoose.model("image",Schema);
module.exports = ImageModel;