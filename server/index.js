// server/index.js

const request = require("request");
const cheerio = require("cheerio");
const express = require("express");
const path = require('path');



var fs = require("fs");

const PORT = process.env.PORT || 3001;

const app = express();

let nodeNumber = 0;

var json;
let nodeToday;
fs.readFile("server/AllNodes.json", "utf8", function (err, data) {
  if (err) throw err;
  json = JSON.parse(data);
  nodeToday = json[nodeNumber];
});



// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, '../client/build')));


// All other GET requests not handled before will return our React app
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

app.get("/api", (req, res) => {
  res.json(nodeToday);
  //res.json(json);
});

app.listen(PORT, () => {
  nodeNumber = Math.floor(getRandomInt(2700));
  console.log(`Server listening on ${PORT} ` + nodeNumber);
});

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

runAtSpecificTimeOfDay(00, 1, () => {
  nodeNumber = Math.floor(getRandomInt(2700));
  console.log(new Date());
});

function runAtSpecificTimeOfDay(hour, minutes, func) {
  const twentyFourHours = 86400000;
  const now = new Date();
  let eta_ms =
    new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      hour,
      minutes,
      0,
      0
    ).getTime() - now;
  if (eta_ms < 0) {
    eta_ms += twentyFourHours;
  }
  setTimeout(function () {
    //run once
    func();
    // run every 24 hours from now on
    setInterval(func, twentyFourHours);
  }, eta_ms);
}



