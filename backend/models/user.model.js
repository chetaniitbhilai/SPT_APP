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
    }
  });
  
const User = mongoose.model("collection", userSchema); 
  
export default User;
