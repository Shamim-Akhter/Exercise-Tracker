const express=require('express');
require('dotenv').config();
const bodyParser=require('body-parser');
const connection=require('./connection/connect.js');
const router=require('./router/route.js');
const app=express();
const cors=require('cors');
app.use(cors());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'));

//Home Page
app.get('/',function(req,res){
    res.sendFile(__dirname+"/views/index.html");
});

//To hanlde routes
app.use(router);

// To handle 404 page
app.use((req,res,next)=>{
    res.status(400).sendFile(__dirname+"/views/404.html");
});

const listener=app.listen(process.env.PORT || 8000,function(){
    console.log("Server is listening on port",listener.address().port);
})