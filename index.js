const express = require('express');
const cors = require('cors');
const mongoose = require("mongoose");
const User = require('./models/User');
const bcrypt = require('bcrypt');
const app = express();
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const path = require("path");


const salt = bcrypt.genSaltSync(10);
//this string is taken just random
const secret = 'wieyruiwe73iuhifhdfhj';
///////////////////////////////////


// Middleware
app.use(cors({credentials:true,origin:'http://localhost:3000'}));
app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static('uploads'));
/////////////////////





//Database Connection
mongoose.connect('mongodb+srv://risabht043:Skt230144@cluster0.ejlmvi5.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
////////////////////////




//registration


app.post('/register', async (req, res) => {
  const  {username, password, name, dob} = req.body;
  try{
    const userDoc = await User.create({username, 
      password:bcrypt.hashSync(password,salt),
    });
    res.json(userDoc);
  } catch(e){
      res.status(400).json(e)
  }
})


////////////////////////////////


// LOGIN ////////////////////


app.post('/login', async (req, res) => {
  const  {username, password} = req.body;
  const userDoc = await User.findOne({username:username});
  const passOk = userDoc && bcrypt.compareSync(password, userDoc.password);
  if(passOk){
    //If logged in then respond with jwt
    jwt.sign({username,id:userDoc._id}, secret, {}, (err,token) => {
     if(err) throw err;
     res.cookie('token', token).json({
      id:userDoc._id,
      username,
     });
  })
  }else{
    res.status(400).json('wrong credentials');
  }
})



// Check user is logged in or not

app.get('/profile', (req, res) => {
  const {token} = req.cookies;
  jwt.verify(token, secret, {}, (err, info) => {
  if(err) throw err;
  res.json(info);
  })
})



// Logout function ///////////////////////////////////////////////////////////////////////



app.post('/logout', (req,res) => {
  res.cookie('token', '').json('ok');
})

app.get("/", (req, res) => {
  app.use(express.static(path.resolve(__dirname, "client", "build")));
  res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
});



console.log('backend start');
app.listen(4000)
