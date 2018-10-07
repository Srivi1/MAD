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

function objToString (obj) {
    var str = '';
    for (var p in obj) {
        if (obj.hasOwnProperty(p)) {
            str += p + ' : ' + obj[p] + '\n';
        }
    }
    return str;
}

function getNextPlayer(players, playerNum) {
  //counts the number of players so next part works
  var numPlayers = 0;
    for(var prop in players) {
        if(players.hasOwnProperty(prop))
            ++numPlayers;
    }
    //gets the next player's phone number
  playerNum++;
  if (playerNum <= numPlayers) {
    console.log(objToString(players));
    return Object.keys(players).find(key => players[key][1] === "Player" + playerNum);
  } else {
    console.log(objToString(players));
    return Object.keys(players).find(key => players[key][1] === "Player" + 1);
  }
}
//Story part




app.use(bodyParser.urlencoded({extended: false}));
var userI = [];
var required = [];
var players = {};
var stopper = true;
var counter = 0;
var counter1 = 0;
var playerTurn = 1;
var numPlayers = 0;
var storynum = Math.floor(Math.random()*2) + 1;
var story;
//Decides what required array is going to be
switch (storynum) {
  case 1:
  required = ["yourname", "adjectivew/est", "animal", "verb", "country", "malename", "number"];
    break;

  case 2:
  required = ["fruit", "yourname", "lastname", "adjective", "adjective", "adjective", "verb", "animal"];
    break;
}

app.post('/sms', (req, res) => {
  const twiml = new MessagingResponse();
  if (stopper) {
    if (players[req.body.From] === undefined) {
      counter ++;
      players[req.body.From] = ["notBegan", "Player" + counter];
      twiml.message(players[req.body.From][1] + " has been adeed!");
      numPlayers++;
    }
    if ((req.body.Body).toLowerCase() === "begin" && players[req.body.From][1] === "Player1" && stopper) {
      stopper = false;
      console.log("The Game Has BEGUN!");
      for (var x = 0; x < numPlayers; x++) {
        textPlayer(req.body.To, getNextPlayer(players, x), "The game has begun! Wait for your turn.");
      }
      //Just for PLayer1's first turn
      switch (required[counter1]) {
        case "noun": twiml.message("Enter a noun: ");
        break;
        case "verb": twiml.message("Enter a verb: ");
        break;
        case "adjective": twiml.message("Enter an adjective: ");
        break;
        case "adverb": twiml.message("Enter an adverb: ");
        break;
        case "adjectivew/est": twiml.message("Enter an adjective ending in est: ");
        break;
        case "animal": twiml.message("Enter an animal: ");
        break;
        case "country": twiml.message("Enter a country: ");
        break;
        case "malename": twiml.message("Enter a male name: ");
        break;
        case "number": twiml.message("Enter a number: ");
        break;
        case "fruit": twiml.message("Enter a fruit: ");
        break;
        case "yourname": twiml.message("Enter your name: ");
        break;
        case "lastname": twiml.message("Enter your last name: ");
        break;
        default: twiml.message("This didn't work lol");
      }
      counter++;
    }
  } else {
        //console.log(userI.toString());
        //console.log(req.body.From);
        if (required[counter1 + 1] == undefined) {
          userI.push(req.body.Body);
          // Decides the story
          switch (storynum) {
            case 1:
              story = "Once upon a time, there was a pretty princess named " + userI[0] + ". She was the " + userI[1] + " princess in the galaxy." +
              "One day, her father told her that she was going to marry a " + userI[2] + ". When she found out she began to " + userI[3] + ". Immediately," +
              "she packed up and ran away to " + userI[4] + ". Once she arrived she found a man named " + userI[5] + ". He became the princess' best friend" +
              " and soon her husband. They had " + userI[6] + " kids together and lived happily ever after.";
              break;

            case 2:
              story = "Who lives in a " + userI[0] + " under the sea? " + userI[1] + userI[2] + "! " + userI[3] + " and " + userI[4] + " and " + userI[5] +
              "is he. " + user[1] + user[2] + "! If nautrical nonsense be something you " + user[6] + ". " + userI[1] + userI[2] + "! Then drop on the deck " +
              "and flop like a " + user[7] + ". " + userI[1] + userI[2] +"!";
              break;
          }
          //Texts all players
          for (var x = 0; x < numPlayers; x++) {
            textPlayer(req.body.To, getNextPlayer(players, x), "Here's the story: " + story);
          }
        } else {
            if (players[req.body.From][1] === "Player" + playerTurn) {
              switch (required[counter1 + 1]) {
                case "noun": textPlayer(req.body.To, getNextPlayer(players, playerTurn), "Enter a noun: ");
                break;
                case "verb": textPlayer(req.body.To, getNextPlayer(players, playerTurn), "Enter a verb: ");
                break;
                case "adjective": textPlayer(req.body.To, getNextPlayer(players, playerTurn), "Enter an adjective: ");
                break;
                case "adverb": textPlayer(req.body.To, getNextPlayer(players, playerTurn), "Enter an adverb: ");
                break;
                case "adjectivew/est": textPlayer(req.body.To, getNextPlayer(players, playerTurn), "Enter an adjective ending in est: ");
                break;
                case "animal": textPlayer(req.body.To, getNextPlayer(players, playerTurn), "Enter an animal: ");
                break;
                case "country": textPlayer(req.body.To, getNextPlayer(players, playerTurn), "Enter a country: ");
                break;
                case "malename": textPlayer(req.body.To, getNextPlayer(players, playerTurn), "Enter a male name: ");
                break;
                case "number": textPlayer(req.body.To, getNextPlayer(players, playerTurn), "Enter a number: ");
                break;
                case "fruit": textPlayer(req.body.To, getNextPlayer(players, playerTurn), "Enter a fruit: ");
                break;
                case "yourname": textPlayer(req.body.To, getNextPlayer(players, playerTurn), "Enter your name: ");
                break;
                case "lastname": textPlayer(req.body.To, getNextPlayer(players, playerTurn), "Enter your last name: ");
                break;
                default: twiml.message("This didn't work lol");
              }
              userI.push(req.body.Body);
            }

            if (playerTurn === numPlayers) {
              playerTurn = 1;
            } else {
              playerTurn++;
            }
          }
          counter1 ++;
          console.log(userI.toString());
    }

    //console.log(counter);

    res.writeHead(200, {'Content-Type': 'text/xml'});
    res.end(twiml.toString());
  });




http.createServer(app).listen(9999, () => {
  console.log('Express server listening on port 9999');
});
