import mongoose, { Mongoose } from "mongoose";

const departmentSchema = new mongoose.Schema({
    personName: {
      type: String, 
      required: true
    },
    companyName: {
        type: String, 
        required: true
    },
    hrName: {
        type: String, 
        required: true
    },
    hrNumber: {
        type: Number,
        required: false
    },
    hrEmail: {
        type: String,
        required: false
    },
    response: {
        type: String, 
        required: true
    },
    dateTime: {
        type: String,
        required: true
    },
    department:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Data'
    }
});

const Department = mongoose.model("department", departmentSchema); 
  
export default Department;
