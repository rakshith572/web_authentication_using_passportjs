const mongoose=require('mongoose');

const connect=(URL)=>{
    return mongoose.connect(URL,{
        useNewUrlParser:true,
        useCreateIndex:true,
        useFindAndModify:false,
        useUnifiedTopology:true
    }).then(console.log("connected to database ......"));
}

module.exports=connect;