require("dotenv").config()
const express = require("express")
const app = express()
const port = process.env.PORT || 50001;
const cors = require("cors");
const path = require('path');
const route = require('./routes/route');
const passport = require('./config/passport')
app.use(passport.initialize());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(passport.initialize());
app.use("/",route)
app.listen(port, () => console.log(port))