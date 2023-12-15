/* The code is defining several functions for handling CRUD operations on a "Game" model. */
const Game = require('../models/games'); // Cambiado de Song a Game

const uploadGame = async (req, res) => {
  try {
    const { name, description, price, quantity, date } = req.body;
    const audioFile = req.files['audio'][0];
    const logoFile = req.files['logo'][0];

    const game = new Game({
      name: name, // Cambiado de title a name
      description: description,
      price: price,
      quantity: quantity,
      date: date,
      audioUrl: audioFile.path, 
      logoUrl: logoFile.path,
    });

    const savedGame = await game.save();
    res.status(201).json(savedGame);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getAllGames = async (req, res) => {
  try {
    const games = await Game.find();
    res.status(200).json(games);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getGameById = async (req, res) => {
  try {
    const { gameId } = req.params;
    const game = await Game.findById(gameId);
    
    if (!game) {
      return res.status(404).json({ error: 'Game not found' });
    }

    res.status(200).json(game);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const updateGame = async (req, res) => {
  try {
    const { gameId } = req.params;
    const { name, description, price, quantity, date } = req.body;

    const updatedGame = await Game.findByIdAndUpdate(
      gameId,
      { name, description, price, quantity, date }, // Cambiado de title y artist a name y description
      { new: true }
    );

    if (!updatedGame) {
      return res.status(404).json({ error: 'Game not found' });
    }

    res.status(200).json(updatedGame);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const deleteGame = async (req, res) => {
  try {
    const { gameId } = req.params;

    const deletedGame = await Game.findByIdAndDelete(gameId);

    if (!deletedGame) {
      return res.status(404).json({ error: 'Game not found' });
    }

    res.status(200).json(deletedGame);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  uploadGame,
  getAllGames,
  getGameById,
  updateGame,
  deleteGame,
};
