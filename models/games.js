const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  date: { type: Date, required: true },
  logoUrl: { type: String, required: true },
});

const Game = mongoose.model('Game', gameSchema);

module.exports = Game;
