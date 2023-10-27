import express from "express";
import userRoutes from "./routes/userRoutes.js";
import authRoutes from "./routes/authRoutes.js";

import connectToDatabase from "./config/database.js";

const app = express();

// Call the database connection function to establish the connection
connectToDatabase();

// Body parsing middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// routes
app.use("/users", userRoutes);
app.use("/auth", authRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
