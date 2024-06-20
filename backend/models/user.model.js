import mongoose from "mongoose";
import express from 'express'

const userSchema = new mongoose.Schema({
    email: {
      type: String, 
      required: true
    },
    password: {
      type: String, 
      required: true
    },
    name:{
      type: String, 
      required: true
    },
    position:{
      type: String, 
      required: true
    },
    responsibility:{
      type: String, 
      required: true
    }
  });
  
const User = mongoose.model("users", userSchema); 
  
export default User;
