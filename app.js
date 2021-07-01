const express = require('express');
const router  = express();
const bodyParser =require('body-parser');
const mongoose  = require('mongoose');
const tShirt  = require("./models/products.js");
const Attor  = require("./models/attors.js");
const Comment  = require("./models/comment.js");
const seedDB  = require("./seed")
const User = require('./models/user')
const passport = require('passport');
const localStrategy = require('passport-local');
const passportLocalMongoose  = require('passport-local-mongoose');
const expressSession = require('express-session');


mongoose.connect('mongodb://localhost:27017/productsdb', {useNewUrlParser: true});
router.use(bodyParser.urlencoded({extended:true}));
router.set('view engine', 'ejs');
router.use(express.static('public'))
router.use(expressSession({
    secret:'Hulk Hulk',
    resave:false,
    saveUninitialized:false
}))
router.use(passport.initialize());
router.use(passport.session());


router.use(function (req,res,next) {
    res.locals.currentUser = req.user;
    next()
})
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
passport.use(new localStrategy(User.authenticate()));


//seedDB()




router.get('/index',function(req,res){
    tShirt.find({},function (err,tiSharts) {
       if(err)
       {
           console.log(err)
        }else{
            res.render('index',{tSharts:tiSharts, currentUser : req.user});
        }
   })

  

  
  
})

router.post('/index',function(req,res){
    var name = req.body.name;
    var image = req.body.image;
    var price  = req.body.price;
    var newProduct = {name:name, image:image, price:price}
    tShirt.create(newProduct,function (err, newProdcut) {
        if(err){
            console.log(err);
        }else{
            res.redirect('/index');
        }
    })
   
})




router.get('/productsCreate',isLogedIn,function(req,res){
    res.render('productsCreate');

})

router.get('/index/:id/comment',function(req,res){
    tShirt.findById(req.params.id,function(err,foundProduct){
       if(err){
           console.log(err)
       }else{
        res.render('cmntCreate',{product:foundProduct})
       }
   })
   

})

router.post('/index/:id',function(req,res){
    tShirt.findById(req.params.id,function(err,product){
        if(err){

            console.log(err);
        }else{
            Comment.create(req.body.comment,function (err,comment) {
                if(err){
                    console.log(err)
                }else{
                    comment.author.id= req.user._id;
                    comment.author.username= req.user.username;
                    if(!user){
                        res.redirect('/login')
                    }
                    comment.save();
                    product.comments.push(comment);
                    product.save()
                    res.redirect('/index/' + product._id);
                }
            })
        }
    })
})

router.get('/signin',function(req,res){
    res.render('singin')
})

router.post('/signin',function (req,res) {
    req.body.username
    req.body.password
    User.register(new User({username:req.body.username}),req.body.password,function (err,user) {
        if(err){
            console.log(err);
        }else{
            passport.authenticate('local')(req,res,function(){
                res.redirect('/index');
            })
        }
    })
})


router.get('/login',function(req,res){
    res.render('login')
})

router.post('/login',passport.authenticate('local',{
    successRedirect:'/index',
    failureRedirect: '/signin'
}),function (req,res) {
    
})


router.get('/index/:id',isLogedIn,function (req,res) {
    tShirt.findById(req.params.id).populate('comments').exec(function (err,foundProduct) {
        if(err)
        {
            console.log(err);
        }
        else{
            res.render('details',{product:foundProduct})

        }
    })
})

router.get('/logout',function(req,res){
    req.logout()
    res.redirect('/login')
})


function isLogedIn(req,res,next) {
    if(req.isAuthenticated()){
        return next()
    }
    res.redirect('/login')
}


router.listen('3000',function () {
    console.log('Bismillah');
})