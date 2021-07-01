var mongoose = require("mongoose");

var productSchema = new mongoose.Schema({
    name: String,
    image: String,
    price: Number,
    comments: [
      
        { 
           type: mongoose.Schema.Types.ObjectId,
           ref: 'Comment'
    

        }
    ]
});

module.exports = mongoose.model('Attor',productSchema);