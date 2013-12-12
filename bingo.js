var socketClient = require('socket.io-client');
var client = socketClient.connect('ws://yahoobingo.herokuapp.com');
var card;

function Bingo(slots){
  this.slots = slots;
}

Bingo.prototype = {

  check : function(bingoSet){
    var set = this.parseSet(bingoSet);
    var index = this.checkIfExists(set);
    
    if (index) {
      this.slots[set[0]][index] = 0;
    }

    if (this.validBingo()){
      client.emit('bingo');
    }
  },
  
  parseSet : function(bingoSet){
    var letter = bingoSet.match(/[A-Z]/).toString();
    var num = parseInt(bingoSet.match(/\d+/));
    return [letter, num];
  },

  checkIfExists : function(set) {
    return this.slots[set[0]].indexOf(set[1]);
  },

  validBingo : function() {
    this.checkRow() || this.checkColumn() || this.checkDiagonal();
  },

  checkRow : function() {

  },

  checkColumn : function() {
    for (var key in this.slots) {
      var column = this.slots[key];
      console.log(column);
    }
  },

  checkDiagonal : function() {

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
  card.check(number);
});

client.on('win', function(message){
  console.log(message);
});

client.on('lose', function(message){
  console.log(message);
});
