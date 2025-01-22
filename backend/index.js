const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
const routes=require("./routes/taskRoutes.js")

// cors.config();
const app = express();

app.use(bodyParser.json());
app.use(
    cors({ 
      origin: "http://localhost:5174",
    })
  );

  app.use("/api", routes);


const PORT=5001;
app.listen(PORT,()=>console.log(`Server is running on port ${PORT}`));

mongoose.connect(process.env.MONGO_URI,);

const database = mongoose.connection;

database.on("error", (error) => {
  console.log("Database connection errors", error);
});

database.once("connected", () => {
  console.log("Database Connected");
});
