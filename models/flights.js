const mongoose =require('mongoose')
const {Schema}=mongoose;
const FlightsSchema=new Schema({
    to:{
        type:String,
        required:true
    },
    from:{
        type:String,
        required:true
    },
   
})

module.exports=mongoose.model('flights',FlightsSchema)