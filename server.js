import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import cors from "cors";
import productRoutes from "./src/routes/productsRoutes.js";
import menuRoutes from "./src/routes/menuRoutes.js";
import userRoutes from "./src/routes/userRoutes.js";
import orderRoutes from "./src/routes/orderRoutes.js";
import recipesRoutes from "./src/routes/recipesRoutes.js";
import connectDB from "./src/config/db.js";
import { notFound, errorHandler } from "./src/middleware/errorMiddleware.js";
import bodyParser from "body-parser";

dotenv.config();

connectDB();
//settings
const app = express();
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(bodyParser({limit: '5mb'}));
app.use(express.json());
app.use("/api/menu", menuRoutes);
app.use("/api/recipes", recipesRoutes);
app.use('/api/orders', orderRoutes)
app.use("/api/users", userRoutes);
app.use("/api/produts", productRoutes);

app.get('/api/config/paypal', (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
)
app.get("/", (req, res) => {
  res.send("API is running....");
});

// mongoose connection
app.use(notFound);
app.use(errorHandler);
// server listening
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
