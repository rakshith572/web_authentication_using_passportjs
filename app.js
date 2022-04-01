require('dotenv').config();
const express=require('express');
const expressLayouts=require('express-ejs-layouts')
const app=express();
app.use(express.json());
const passport=require('passport');
const connect=require('./DB/connect')

require('./passport.js')(passport);

// EJS
app.use(expressLayouts);
app.set('view engine','ejs');

//body parser
app.use(express.urlencoded({extended:true}));

// connect-flash and session
const flash = require('connect-flash');
const session = require('express-session');

// express session
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
}))
// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

// global variables
app.use(function(req, res, next) {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
  });

// routes
const routes=require('./routes/index')
app.use('/',routes);
app.use('/users',require('./routes/users'))

// connect to DB
const start=async()=>{
    try{
        await connect(process.env.URI);
        const port = 5000;
        app.listen(port,console.log(`server listening at ${port}!!!!!!`));
    }catch(error){
        console.log(error);
    }
}

start();