const mongoose =require('mongoose')
const {Schema}=mongoose;
const AppointmentSchema = new Schema({
  patientUserName: {
    type: String,
    required: true,
  },
  doctorUserName: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: false,
  },
  reason: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  patientContactNumber: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Appointment',AppointmentSchema);