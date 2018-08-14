var express = require('express');
var bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');

const iasRoutes = require('./routes/ias');


var app= express();
var port = process.env.PORT || 3000;

mongoose.Promise = global.Promise;
 mongoose.connect("mongodb://iasadmin:souvik9038@ds111422.mlab.com:11422/ias")
 //mongoose.connect("mongodb://localhost:27017/ias")
.then(()=> {
  console.log("Connected to database");
}).catch((e) => {
  console.log("Connection failed Error is ",e);
});

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({extended:false}));

app.use("/images",express.static(path.join("images")));

app.use((req,res,next)=>{
  res.setHeader('Access-Control-Allow-Origin','*');
  res.setHeader('Access-Control-Allow-Headers','Origin,X-Requested-With,Content-Type,Accept');
  res.setHeader('Access-Control-Allow-Methods','GET,POST,PATCH,PUT,DELETE,OPTIONS');
  next();
});



app.listen(port,()=>{
    console.log("Server is running on port ",port);
});
app.use("/api/ias",iasRoutes);

module.exports.app = app;