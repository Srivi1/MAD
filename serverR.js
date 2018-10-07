const http = require('http');
const express = require('express');
const MessagingResponse = require('twilio').twiml.MessagingResponse;
const bodyParser = require('body-parser');
const app = express();

function textPlayer(numTwilio, numUser, bodyText){
  const accountSid = 'AC0cfc31cd641197aca77b44b7c9bde8a7';
  const authToken = '8bcb842d2a31e31d72caee210527022d';
  const client = require('twilio')(accountSid, authToken);


  client.messages
        .create({from: numTwilio, body: bodyText, to: numUser})
        .then(message => console.log(message.sid))
        .done();


        return;
}

app.use(bodyParser.urlencoded({extended: false}));
var userI = [];
var required = ["noun", "verb", "verb"];
var players = {};
var stopper = true;
var counter = 0;
var counter1 = 0;
var playerTurn = 1;



  app.post('/sms', (req, res) => {
    const twiml = new MessagingResponse();
    if (stopper) {
      if (players[req.body.From] === undefined) {
        counter ++;
        players[req.body.From] = ["notBegan", "Player" + counter];
        twiml.message(players[req.body.From][1] + " has been adeed!");
      }
      if ((req.body.Body).toLowerCase() === "begin" && players[req.body.From][1] === "Player1") {
        stopper = false;
        console.log("The Game Has BEGUN!");
        twiml.message("The game has begun! Text something to begin: ");
      }
    } else {
          //console.log(userI.toString());
          //console.log(req.body.From);
          if (required[counter1] == undefined) {
            twiml.message("Here's the story:" /*+ " " + longAssString*/);
          } else {
            switch (required[counter1]) {
              case "noun": textPlayer(req.body.To, players[req.body.From][0], "Enter a noun: ");
              break;
              case "verb": twiml.message("Enter a verb: ");
              break;
              case "adjective": twiml.message("Enter an adjective: ");
              break;
              case "adverb": twiml.message("Enter an adverb: ");
              break;
              case "adjectivew/est": twiml.message("Enter an adjective ending in est: ");
              break;
              case "animal": twim1.message("Enter an animal: ");
              break;
              case "country": twiml.message("Enter a country: ");
              break;
              case "malename": twiml.message("Enter a male name: ");
              break;
              case "number": twiml.message("Enter a number: ");
              break;
              default: twiml.message("This didn't work lol");
            }
            if (players[req.body.From][1] === "Player1" && playerTurn === 1){
              userI.push(req.body.Body);
            } else if (players[req.body.From][1] === "Player2" && playerTurn === 2){
              userI.push(req.body.Body);
            } else if (players[req.body.From][1] === "Player3" && playerTurn === 3){
              userI.push(req.body.Body);
            } else if (players[req.body.From][1] === "Player4" && playerTurn === 4){
              userI.push(req.body.Body);
            }
            if (playerTurn == 4) {
              playerTurn = 1;
            } else {
              playerTurn++;
            }
          }
          counter1 ++;
    }

    //console.log(counter);

    res.writeHead(200, {'Content-Type': 'text/xml'});
    res.end(twiml.toString());
  });


http.createServer(app).listen(9999, () => {
  console.log('Express server listening on port 9999');
});
