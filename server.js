const http = require('http');
const express = require('express');
const MessagingResponse = require('twilio').twiml.MessagingResponse;
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: false}));
var userI = [];
var required = ["noun", "verb", "verb"];
var counter = 0;
app.post('/sms', (req, res) => {
  const twiml = new MessagingResponse();

  userI.push(req.body.Body);
  console.log(userI.toString());
  if (required[counter] == undefined) {
    twiml.message("Here's the story:" /*+ " " + longAssString*/);



  } else {
    if (required[counter].localeCompare("noun") == 0) {
      twiml.message('Enter a noun: ');
    } else if (required[counter].localeCompare("verb") == 0) {
      twiml.message('Enter a verb: ');
    } else {
      twiml.message("This didn't work lol");
    }
  }

  //console.log(counter);

  counter = counter+1;

  res.writeHead(200, {'Content-Type': 'text/xml'});
  res.end(twiml.toString());
});

http.createServer(app).listen(9999, () => {
  console.log('Express server listening on port 9999');
});
