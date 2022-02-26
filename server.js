// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function(req, res) {
  res.json({ greeting: 'hello API' });
});

app.get("/api/:date", (req, res) => {
  processDate(req.params["date"], res)
});

app.get("/api/", (req, res) => {
  processDate("", res)
});

let processDate = (param, res) => {
  let date = new Date(param);
  if (param === "") date = new Date();
  if (!testDate(date)) {
    date = new Date(parseInt(param))
    if (!testDate(date)) {
      res.json({ error: "Invalid Date" })
    }
  }

  if (testDate(date)) {
    res.json({
      "unix": date.getTime(),
      "utc": date.toUTCString()
    })
  }
}

let testDate = (date) => {
  return (date instanceof Date) && !isNaN(date);
}

// listen for requests :)
var listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
