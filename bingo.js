var socketClient = require('socket.io-client');
var client = socketClient.connect('ws://yahoobingo.herokuapp.com');

var BingoCard;

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
  BingoCard = payload.slots;
  console.log(BingoCard);
});

client.on('number', function(number){
  console.log(number);
});

client.on('win', function(message){
  console.log(message);
});

client.on('lose', function(message){
  console.log(message);
});
