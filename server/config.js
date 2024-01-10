const mongoose = require("mongoose")
mongoose.connect("mongodb+srv://demo1:demo1@cluster0.zh42dct.mongodb.net/upload")
.then(()=>{
    console.log("Connection is Succesfull");
}).catch((err)=>{
    console.log(err);
})