const express = require("express");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const cors = require('cors');

const jwtPassword = "123456";
mongoose.connect(
  "mongodb+srv://saivenkatpokala:pokalapokala@cluster0.qzbs0ft.mongodb.net/technical-task",
  );
  
  const User = mongoose.model("User", {
    username: String,
    pasword: String,
  });
  
  const app = express();
  app.use(express.json());
  app.use(cors({
    origin :"*",
  }))
  
async function userExists(username, password) {

  const exists = await User.findOne({username,password});
  // console.log(exists);
  // console.log(typeof exists)
  if(exists) return true;
  
  return false;
}

app.post("/signin", async function (req, res) {
  const username = req.body.username;
  const password = req.body.password;
  // console.log(username + " " + password);
  const response = await userExists(username,password);
  
  if (!response) {
    return res.status(403).json({
      msg: "User doesnt exist in our in memory db",
    });
  }
  else{
    // console.log("userexists")
    var token = jwt.sign({ username: username}, jwtPassword);
    return res.json({
      token,
    });

  }

 
});


app.listen(4004,function(req,res){
  console.log("running on 4004")
});
