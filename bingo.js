var socketClient = require('socket.io-client');
var client = socketClient.connect('ws://yahoobingo.herokuapp.com');
var card;

function Bingo(slots){
  this.slots = slots;
}

Bingo.prototype = {
  check : function(number){
    console.log('im check' + number);
  }
};

var RegInfo = {
  name: 'Max Davila',
  email: 'adavila0711@gmail.com',
  url: 'https://github.com/MaxDavila/yahoo-bingo'
};

client.emit('register', RegInfo);

client.on('connect', function(){
  console.log("connected to Yahoo bingo server!");
});

client.on('disconnect', function(){
  console.log("disconnected from server");
});

client.on('card', function(payload){
  card = new Bingo(payload.slots);
});

client.on('number', function(number){
  console.log(number);
  card.check(number);
});

client.on('win', function(message){
  console.log(message);
});

client.on('lose', function(message){
  console.log(message);
});
