/* This code is setting up routes for a games API using the Express framework in JavaScript. */
const express = require('express');
const router = express.Router();
const gamesController = require('../controllers/gamesController'); 
const upload = require('../middlewares/upload');

// Rutas para los juegos
router.post('/upload', upload, gamesController.uploadGame); 
router.get('/', gamesController.getAllGames); 
router.get('/:gameId', gamesController.getGameById); 

// Añadir nuevas rutas para actualizar y eliminar juegos
router.put('/:gameId', gamesController.updateGame);
router.delete('/:gameId', gamesController.deleteGame); 

module.exports = router;
