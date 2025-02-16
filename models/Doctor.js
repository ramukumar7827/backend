const mongoose =require('mongoose')
const {Schema}=mongoose;
const DoctorSchema = new Schema({
  userName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  fullName: {
    type: String,
    required: true,
  },
  specialization: {
    type: String,
    required: true,
  },
  degrees: {
    type: String,
    required: true,
  },
  experience: {
    type: String,
    required: true,
  },
  fees: {
    type: String,
    required: true,
  },
  timings: {
    type: String,
    required: true,
  },
  cityName: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  contactNumber: {
    type: String,
    required: true,
  },
});

module.exports=mongoose.model('Doctor',DoctorSchema)