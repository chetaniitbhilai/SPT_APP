import mongoose from "mongoose";

const dataSchema = new mongoose.Schema({
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
        type: String, 
        required: true
    }
});

const Data = mongoose.model("data", dataSchema); 
  
export default Data;
