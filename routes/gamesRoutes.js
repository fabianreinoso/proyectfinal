const express = require('express');
const router = express.Router();
const gamesController = require('../controllers/gamesController'); // Cambiado de songController a gameController
const upload = require('../middlewares/upload');

// Rutas para los juegos
router.post('/upload', upload, gamesController.uploadGame); // Cambiado de uploadSong a uploadGame
router.get('/', gamesController.getAllGames); // Cambiado de getAllSongs a getAllGames
router.get('/:gameId', gamesController.getGameById); // Cambiado de getSongById a getGameById

// Añadir nuevas rutas para actualizar y eliminar juegos
router.put('/:gameId', gamesController.updateGame); // Cambiado de updateSong a updateGame
router.delete('/:gameId', gamesController.deleteGame); // Cambiado de deleteSong a deleteGame

module.exports = router;
