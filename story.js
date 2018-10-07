const http = require('http');
const express = require('express');
const MessagingResponse = require('twilio').twiml.MessagingResponse;
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: false}));

app.post('/sms', (req, res) => {
  const twiml = new MessagingResponse();
  var test = req.body.Body;
  console.log(test);
  twiml.message('The Robots are coming! Head for the hills!');

  res.writeHead(200, {'Content-Type': 'text/xml'});
  res.end(twiml.toString());
});

http.createServer(app).listen(9999, () => {
  console.log('Express server listening on port 9999');
});

//Story part


var storynum = Math.random()*10;
var story;
  switch (storynum) {
    case 1:
    required = ["yourname", "adjectivew/est", "animal", "verb", "country", "malename", "number"];
      story = "Once upon a time, there was a pretty princess named " + userI[1] + ". She was the " + userI[2] + " princess in the galaxy." +
      "One day, her father told her that she was going to marry a " + userI[4] + ". When she found out she began to " + user[5] + ". Immediately," + "
      she packed up and ran away to " + userI[6] + ". Once she arrived she found a man named " + user[7] + ". He became the princess' best friend" +
      " and soon her husband. They had " + userI[8] + " kids together and lived happily ever after.";
      break;

    case 2:
    required = ["fruit", "yourname", "lastname", "adjective", "adjective", "adjective", "verb", "animal", ];
      story = "Who lives in a " + userI[1] + " under the sea? " + userI[2] + userI[3] + "!" + userI[4] + " and " + userI[5] + " and " + userI[6] +
      "is he." + user[2] + user[3] + "! If nautrical nonsense be something you " + user[7] + ". " + userI[2] + userI[3] + "! Then drop on the deck " +
      "and flop like a " + user[8] + ". " + userI[2] + userI[3] +"!";
      break;
  }
