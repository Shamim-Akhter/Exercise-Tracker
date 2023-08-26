const express=require('express');
const router=express.Router();
const {getAllUsers,createNewUser,createNewExercise,specificUserLogs} = require('../controller/control.js');



router.route('/api/users').get(getAllUsers).post(createNewUser);
router.route('/api/users/:_id/exercises').post(createNewExercise);
router.route('/api/users/:_id/logs').get(specificUserLogs);

module.exports=router;