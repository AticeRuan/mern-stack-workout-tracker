const Workout = require('../model/workoutModel');
const mongoose = require('mongoose');
//get all workouts
const getWorkouts = async (req, res) => {
    try{
        const user_id=req.user._id;
        const workouts = await Workout.find({user_id}).sort({createdAt:-1});
        res.status(200).json(workouts);
    }
    catch(err){
        res.status(400).json({err:err.message});
    }
}

//get a single workout
const getWorkout= async (req, res) => {
    const {id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({err:'Workout not found'});
    }
    try{
        const workout = await Workout.findById(id);
        if(!workout) return res.status(404).json({err:'Workout not found'});
        res.status(200).json(workout);
    }
    catch(err){
        res.status(400).json({err:err.message});
    }
}

//create new workout  

const createWorkout =async (req, res) => {

    const {title, reps, load,} = req.body;

    let emptyFields = [];

    if(!title){
        emptyFields.push('title');
    }
    if(!reps){
        emptyFields.push('reps');
    }
    if(!load){
        emptyFields.push('load');
    }
    if(emptyFields.length>0){
        return res.status(400).json({err:'Please fill in all the fields.', emptyFields});
    }
    //add doc to db
    try{
        const user_id=req.user._id;
        const workout=await Workout.create({title, reps, load,user_id})
        res.status(200).json(workout);
    }
    catch(err){
        res.status(400).json({err:err.message});
    }

}

//delete a workout
const deleteWorkout = async (req, res) => {
   const {id} = req.params;
   if(!mongoose.Types.ObjectId.isValid(id)){
       return res.status(404).json({err:'Workout not found'});
   }

   const workout= await Workout.findOneAndDelete({_id:id})

    if(!workout) return res.status(404).json({err:'Workout not found'});
 
    res.status(200).json(workout);


}


//update a workout
const updateWorkout = async (req, res) => {
    const {id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({err:'Workout not found'});
    }

    const workout= await Workout.findOneAndUpdate({_id:id}, 
        {...req.body}
    ) 
    if(!workout) return res.status(404).json({err:'Workout not found'});

    res.status(200).json(workout);
}
module.exports = {
    createWorkout,
    getWorkout,
    getWorkouts,
    deleteWorkout,
    updateWorkout
}