const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const userRoute = require("./routes/menu");
const path = require("path");

//swagger
const swaggerUi = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerSpec = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "User API",
      version: "1.0.0",
    },
    servers: [
      {
        url: "http://localhost:9000",
      },
    ],
  },
  apis: [`${path.join(__dirname, "./routes/*.js")}`],
};

//settings
const app = express();
const port = process.env.PORT || 9000;

//middlewares
app.use(express.json());
app.use("/api", userRoute);
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerJsDoc(swaggerSpec))
);
//routes
app.get("/", (req, res) => {
  res.send("Hello World");
});

// mongoose connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// server listening
app.listen(port, () => console.log(`Server listening on port ${port}`));
