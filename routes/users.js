const express=require('express');
const route=express.Router();
const user=require('../models/user')
const bcrypt=require('bcryptjs');
const passport=require('passport')

route.route('/login').get((req,res)=>{
    res.render('login');
});

route.route('/register').get((req,res)=>{
    res.render('register');
})

route.post('/register',async (req,res)=>{
    const {name,email,password,password2}=req.body;
    console.log(req.body);
    let errors=[];
    if(!name || !email || !password || !password2){
        errors.push({msg:'please fill all the required field'});
    }

    if(password!=password2){
        errors.push({msg:"password do not match"});
    }

    if(password.length<=6){
        errors.push({msg:'password not strng enough'});
    }

    if(errors.length>0){
        res.render('register',{
            errors,
            name,
            email,
            password,
            password2
        });
    }else{
        const  emailPresent= await user.findOne({email:email});
        if(emailPresent){
            errors.push({msg:'email already present'});
            res.render('register',{
                errors,
                email,
                password,
                password2
            });
        }else{
            const newUser=new user({
                name:name,
                email:email,
                password:password
            });
            bcrypt.genSalt(10,(err,salt)=>{
                bcrypt.hash(newUser.password,salt,(err,hash)=>{
                    if(err){
                        throw err;
                    }
                    newUser.password=hash;
                    newUser.save().
                    then((user)=>{
                        req.flash('success_msg','you are registered now you can log in');
                        res.redirect('/users/login');
                    }).catch((err)=>console.log(err));
                });
            });
        }
    }
});

route.post('/login', (req, res, next) => {
    // console.log(req.body)
    // console.log(req.user);
    passport.authenticate('local', {
      successRedirect: '/dashboard',
      failureRedirect: '/users/login',
      failureFlash: true
    })(req, res, next);
  });

route.get('/logout', (req, res) => {
    req.logout();
    req.flash('success_msg', 'You are logged out');
    res.redirect('/users/login');
});
route.route('*').get((req,res)=>{
    res.send("fuck offf");
})
module.exports=route;