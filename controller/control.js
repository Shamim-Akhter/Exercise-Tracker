const {User,Exercise}=require('../model/schema.js');

//Get all users
const getAllUsers= async function(req,res){
    try{
        const allUsers= await User.find();
        if(allUsers){
           res.status(200).json(allUsers);
        }
        else{
           res.status(400).json("Something went wrong");
        }
    }
    catch(err){
        console.log(err);
    }
         
};

//Create new user

const createNewUser = async function(req,res){
    const newUser=req.body.username;
    try{
        const newUserCreated = await User.create({username:newUser});
        if(newUserCreated){
          res.status(201).json({
            "username":newUserCreated.username,
            "_id":newUserCreated._id
          });
        }
        else{
            res.status(400).send("Something went wrong");
        }
    }
    catch(err){
        console.log(err);
    }
    console.log(req.body);
};

// Create a exercise for specific user

const createNewExercise = async function(req,res){
    try{
        const userId = await User.findById(req.params._id);
        if(userId){
          const id = userId._id;
          const description=req.body.description;
          const duration=req.body.duration;
          const newExercise = await Exercise.create({
             id:id,
             description:description,
             duration:duration,
             date:(req.body.date==null || req.body.date=="")?new Date():req.body.date
          });
          if(newExercise)
          {
            res.status(201).json({
                "_id": userId._id,
                "username": userId.username,
                "date": newExercise.date.toDateString(),
                "duration": newExercise.duration,
                "description": newExercise.description
              });
          }
        }
        else{
            res.status(400).send(`User Id : ${req.body._id} does not exist`);
        }
    }
    catch(err){
        res.status(400).send(err);
    }
    
};

//Get all logs of exercises related to specific user

const specificUserLogs = async function(req,res){
    try{
        const userId = await User.findById(req.params._id);
        if(userId){
            const lim=req.query.limit;
            const allExercises= await Exercise.find({id:req.params._id}).limit(lim);
            const len = allExercises.length;
            const logs = [];
            for(let i=0;i<len;i++){

                let obj={
                    description:allExercises[i].description,
                    duration:allExercises[i].duration,
                    date:allExercises[i].date.toDateString()
                };
                   logs.push(obj);
            }
                 res.status(200).json({
                    "_id":userId._id,
                    "username":userId.username,
                    "count":len,
                    "log":logs
                 });
        }
        else{
            res.status(400).send(`User with Id:${req.params._id} does not exist`);
        }
    }
    catch(err){
        res.status(400).send("Please provide the correct userId");
    } 
};

module.exports = {getAllUsers,createNewUser,createNewExercise,specificUserLogs};