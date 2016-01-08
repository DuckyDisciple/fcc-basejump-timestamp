//
// # Timestamp Generator
//
// Displays a timestamp based on the string that is sent after the URL
//
var http = require("http");
var url = require("url");
//var express = require("express");
//var app = express();


var months = ["January", "February", "March", "April", "May", "June", "July",
                "August", "September", "October", "November", "December"];

var server = http.createServer(function(req, res) {
  var myUrl = url.parse(req.url,true);
  var timeStr = myUrl.pathname.substr(1).replace(/(%20)/g," ");
  if(!isNaN(timeStr) && timeStr!=="") timeStr = Number(timeStr);
  var date = new Date(timeStr);
  var naturalOutput;
  if(isNaN(date.getDate()) || isNaN(date.getMonth()) || isNaN(date.getYear())){
    naturalOutput = null;
  }else{
    naturalOutput = months[date.getMonth()] + " " + date.getDate() + 
          ", " + date.getFullYear();
  }
  var output = {
    "unix": date.valueOf(),
    "natural": naturalOutput
  };
  res.end(JSON.stringify(output));
});

server.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function(){
  var addr = server.address();
  console.log("Chat server listening at", addr.address + ":" + addr.port);
});
