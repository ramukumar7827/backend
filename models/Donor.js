const mongoose=require('mongoose');
const  {Schema}=require('mongoose');

const DonorSchema=new Schema({
    name:{
        type:String,
        required:true
    },
    bloodGroup:{
        type:String,
        required:true,

    },
    phoneNumber:{
        type:String,
        required:true,
    },
    location:{
      type:String,
      default:"Guwahati"
    }
})

module.exports = mongoose.model("Donor", DonorSchema);