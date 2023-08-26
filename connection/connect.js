const mongoose=require('mongoose');
mongoose.connect("mongodb://localhost:27017/test").then(function(){
    console.log("Connection established");
}).catch((err)=>{
    console.log("no connection to database");
});
