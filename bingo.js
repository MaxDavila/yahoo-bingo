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

client.on('card', function(payload){
  BingoCard = payload;
  console.log(BingoCard.slots);
});

