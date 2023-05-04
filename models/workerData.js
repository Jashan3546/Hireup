const mongoose=require('mongoose');
var Schema=mongoose.Schema;

const workerData=new mongoose.Schema({
    name: {type: String, required: true},
    description: {type: String, required: true},
    image: {type: String, required: true},
    experience:{type: String, required: true},
    location:{type: String, required: true},
    charges:{type: String, required: true},
    phone: {type: String, required: true},
    gender:{type: String, required: true},
    age:{type: String, required: true},
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }

},{
    timestamps: true
});

const workers=new mongoose.model("Worker",workerData);

module.exports = workers;



