var Product  = require("./models/products.js");
var Comment  = require("./models/comment.js");

var data = [
    {
        name: "JArry",
        image: 'https://images.unsplash.com/photo-1489033929427-bb74601f25e4?ixid=MXwxMjA3fDB8MHx0b3BpYy1mZWVkfDN8NnNNVmpUTFNrZVF8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        price: 244
    },
    {
        name: "JArry",
        image: 'https://images.unsplash.com/photo-1489033929427-bb74601f25e4?ixid=MXwxMjA3fDB8MHx0b3BpYy1mZWVkfDN8NnNNVmpUTFNrZVF8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        price: 244
    },
    {
        name: "JArry",
        image: 'https://images.unsplash.com/photo-1489033929427-bb74601f25e4?ixid=MXwxMjA3fDB8MHx0b3BpYy1mZWVkfDN8NnNNVmpUTFNrZVF8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        price: 244
    }
]


function seedDB(){
    Product.remove({},function(err){
        if(err){
            console.log(err);
        }else{
            console.log('removed campgrounds')
            // data.forEach(function(seed){
            //     Product.create(seed,function(err,product){
            //         if(err){
            //             console.log(err);
            //         }else{
            //             console.log('add a product');
            //             Comment.create(
            //                 {
            //                     text: 'i wish i have a card',
            //                     author: 'alve'
            //                 },function(err,comment){
            //                     if(err){
            //                         console.log(err);
            //                     }else{
            //                         product.comments.push(comment)
            //                         product.save()
            //                         console.log('comment craeted')
            //                     }
            //                 })
            //         }
            //     })
            // })
        }//
    })
}






module.exports = seedDB;