const mongoose=require('mongoose');
var Schema=mongoose.Schema;

const recurterData=new mongoose.Schema({
    name: {type: String, required: true},
    description: {type: String, required: true},
    image: {type: String, required: true},
    location:{type: String, required: true},
    money:{type: String, required: true},
    phone: {type: String, required: true},

},{
    timestamps: true
});

const recurters=new mongoose.model("Recurter",recurterData);

module.exports = recurters;



