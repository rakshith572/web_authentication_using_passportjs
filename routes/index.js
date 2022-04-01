const express=require('express')
const route=express.Router();

const {ensureAuthenticated}=require('../auth');

route.route('/').get((req,res)=>{
    res.render('welcome.ejs');
});
route.get('/dashboard',ensureAuthenticated,(req,res)=>{
    // console.log(req.user);
    res.render('dashboard',{
        user:req.user.name
    })
})
module.exports=route;

