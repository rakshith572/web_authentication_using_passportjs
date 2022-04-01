module.exports={
    ensureAuthenticated:(req,res,next)=>{
        if(req.isAuthenticated()){
            return next();
        }
        req.flash('error_msg','please log in to access dashboard ');
        res.redirect('users/login');
    }
}