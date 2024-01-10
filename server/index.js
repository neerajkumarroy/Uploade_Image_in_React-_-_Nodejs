require("./config")
const express = require("express");
const ImageModel = require("./schema")
const PORT = process.env.PORT||6500;
const cors = require("cors")
const app = express();

app.use(express.json());
app.use(cors());

app.get("/",async(req,resp) =>{
    const data = await (await ImageModel.find({})).reverse()
    resp.json({message:"All Images is Here",data:data})
})

//Upload image api
app.post("/upload",async(req,resp) => {
//    console.log(req.body);
   const Image = new ImageModel({
    image:req.body.img
   })
   await Image.save()
   resp.send({message:"Image uploaded succesfully..!",success:true})
})

app.listen(PORT,()=>{
    console.log(`App is running on the port number ${PORT}`);
})
