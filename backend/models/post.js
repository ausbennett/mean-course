//MONOGOOSE 

const mongoose = require ('mongoose');

//javascript uses uppercase String lol, typscripyt uses lowercase wow, very nice
const postSchema = mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, default: "I feel good!"}
});

//NODE.js syntax for exporting a module
module.exports = mongoose.model("Post",postSchema);