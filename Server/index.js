const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
dotenv.config();

const authRoute = require("./routes/auth");
const authUser = require("./routes/user");
const app = express();
mongoose.connect("mongodb://localhost:27017/ShoeStore");
app.use(cors());
app.use(cookieParser());
app.use(express.json());

//Routes
app.use("/v1/auth",authRoute); 
app.use("/v1/user",authUser)

app.listen(8000, () => {
console.log("Server is running");
});