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
    
    if (index !== -1) {
      this.slots[set[0]][index] = 0;
      if (this.validBingo()) client.emit('bingo');
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
    return (this.checkRow() || this.checkColumn() || this.checkDiagonal());
  },
  // need to clean up!
  checkRow : function() {
    var row = [],
        counter = 0;
    for (var key in this.slots) {
      for (var i = 0; i < this.slots.length; i++){
        row.push(this.slots[key][counter]);
      }
      counter++;

      if (this.checkIfItHasAllZeros(row)) {
        return true;
      }
    }
    return this.checkIfItHasAllZeros(row);

  },

  checkColumn : function() {
    for (var key in this.slots) {
      var column = this.slots[key];
      if (this.checkIfItHasAllZeros(column)) {
        return true;
      }
    }
  },

  checkDiagonal : function() {
    var diagonal = [],
        index = 0;
    for (var key in this.slots) {
      diagonal.push(this.slots[key][index]);
      index++;
    }
    return this.checkIfItHasAllZeros(diagonal);
  },

  checkIfItHasAllZeros : function(array) {
    for (var i = 0; i < array.length; i++) {
        if (array[i] !== 0) return false;
        if ((i == array.length - 1) && (array[i] === 0)) return true;
    }

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
  console.log(card);
});

client.on('number', function(number){
  card.check(number);
  console.log(card.slots);
});

client.on('win', function(message){
  console.log(message);
});

client.on('lose', function(message){
  console.log(message);
});
