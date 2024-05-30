import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectToMongoDB from "./db/connectToMongoDB.js";

import userRoutes from "./routes/userRoute.js"
import uploadRoutes from "./routes/uploadRoute.js"

dotenv.config(); // Load environment variables from .env file


const PORT = process.env.PORT || 5000; // Use port from env file, else default to 5000

const app= express();// Creating a server

// Setting up middleware
app.use(express.json()); // Parse incoming requests with JSON payloads
app.use(cookieParser()); // Access cookies

// Setting up routes
app.use("/api/auth", userRoutes);
app.use("/api", uploadRoutes);

// Start the server and connect to MongoDB
app.listen(PORT, () => {
    connectToMongoDB(); // Connect to the MongoDB database
    console.log(`Listening on port ${PORT}`); // Log the port number
});
