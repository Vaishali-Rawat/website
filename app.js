const express = require('express');
const fs = require('fs');
const app = express();
const port = 80;
const path =require('path');
const bodyparser = require('body-parser')
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/contactDancepug', {useNewUrlParser: true, useUnifiedTopology: true});

const contactSchema = new mongoose.Schema({
  username: String,
  userphonenumber: Number,
  useremail: String,
  useraddress: String,
  uservision: String
});

const contactpug = mongoose.model('contactpug', contactSchema);

// EXPRESS SPECIFIC
app.use('/static', express.static('static'));  //for serving static files
app.use(express.urlencoded());  

//PUG SPECIFIC
app.set('view engine', 'pug');  //set the template engine as pug
app.set('views', path.join(__dirname, 'views'));   //set the views directory

//ENDPOINTS
app.get('/', (req,res)=>{
    const params = {};
    res.status(200).render('home.pug', params);
});

app.get('/contact', (req,res)=>{
    const params = {};
    res.status(200).render('contact.pug', params);
});

app.post('/contact',(req,res)=>{
  // name_ = req.body.username
  // phoneno = req.body.userphonenumber
  // email = req.body.useremail
  // address = req.body.useraddress
  // vision = req.body.uservision
  // let outputTowrite = `the name of the new dancer is ${name_}, phone number is ${phoneno}, email is ${email}, resides at ${address} and has a vision ${vision}` 
  // fs.writeFileSync('output.txt',outputTowrite);

  var mydata = new contactpug(req.body);
  mydata.save().then(()=>{
    res.send("this item has been saved to the database");
  }).catch(()=>{
    res.status(400).send("this item has not been saved to the database");
  });

  // res.status(200).render('contact.pug')
}); 

app.listen(port, ()=>{
    console.log(`This file for Dance Website using PUG has started successfully on port ${port}`);
});