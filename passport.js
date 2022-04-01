const LocalStrategy  =require('passport-local').Strategy;
const bcrypt=require('bcryptjs');
const user=require('./models/user');

const strategy=(passport)=>{
    passport.use(
        new LocalStrategy({usernameField:'email'},(email,password,done)=>{
            user.findOne({email:email})
            .then(temp=>{
                if(temp==null){
                    return done(null,false,{msg:'you have to register before logIn'})
                }
                bcrypt.compare(password,temp.password,(err,isMatch)=>{
                    
                    if(err){
                        throw err;
                    }
                    if(isMatch){
                        // console.log(temp);
                        return done(null,temp);
                    }else{
                        return done(null,false,{msg:'incorrect password'});
                    }
                })

            })
            .catch(err=>console.log(err))            
        })
    );

    passport.serializeUser((temp, done) =>{
        done(null, temp.id); 
       // where is this user.id going? Are we supposed to access this anywhere?
    });
    
    // used to deserialize the user
    passport.deserializeUser((id, done)=> {
        user.findById(id, (err, temp)=> {
            done(err, temp);
        });
    });

}



module.exports=strategy;
