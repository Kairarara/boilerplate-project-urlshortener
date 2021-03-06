'use strict';

var express = require('express');
var mongo = require('mongodb');
var mongoose = require('mongoose');

let bodyParser=require("body-parser");

var cors = require('cors');

var app = express();

// Basic Configuration 
var port = process.env.PORT || 3000;

/** this project needs a db !! **/ 
// mongoose.connect(process.env.MONGOLAB_URI);

app.use(cors());

/** this project needs to parse POST bodies **/
// you should mount the body-parser here

app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function(req, res){
  res.sendFile(process.cwd() + '/views/index.html');
});

  
// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

//added code

let counter=0;
let shortenedURL=[];

app.route("/api/shorturl/:urlNumber").get((req,res)=>{
  res.redirect(shortenedURL[req.params.urlNumber]);
})

app.use(bodyParser.urlencoded({extended: false}))

// http(s)://www.example.com(/more/routes)
let regexURL=/^https?:\/\/[\w.]+(\/[\w.])*$/

app.route("/api/shorturl/new").post((req,res)=>{
  let obj={};
  if(regexURL.test(req.body.url)){
    obj={
      "original_url":req.body.url,
      "short_url":counter
    };
    console.log(regexURL.test(req.body.url))
    counter++;
    shortenedURL.push(obj.original_url);
  } else {
    obj={"error":"invalid URL"};
  }
  res.json(obj);
})



//----------

app.listen(port, function () {
  console.log('Node.js listening ...');
});
