import express from "express";
// const mongoose = require("mongoose");
import dotenv from "dotenv";
import productRoutes from "./routes/menuRoutes.js";
import userRoutes from './routes/userRoutes.js'
import connectDB from "./config/db.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

dotenv.config();

connectDB();
//settings
const app = express();
// if (process.env.NODE_ENV === 'development') {
//   app.use(morgan('dev'))
// }
const PORT= process.env.PORT || 5000;

app.use(express.json())
// app.use("/api", userRoute);
app.use("/api/menu", productRoutes);
app.use('/api/users', userRoutes)

app.get('/', (req, res) => {
  res.send('API is running....')
})

// mongoose connection
app.use(notFound);
app.use(errorHandler);
// server listening
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
