const accountSid = 'AC0cfc31cd641197aca77b44b7c9bde8a7';
const authToken = '8bcb842d2a31e31d72caee210527022d';
const client = require('twilio')(accountSid, authToken);

var Number1 = '+18563168759';
var Number2 = '+16095587520';

client.messages
      .create({from: '+16106098295', body: 'I am testing variables', to: Number1})
      .then(message => console.log(message.sid))
      .done();
