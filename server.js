/* The code you provided is a basic setup for a Node.js server using the Express framework. Here's a
breakdown of what each part does: */
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const userRoutes = require('./routes/userRoutes');
const gamesRoutes = require('./routes/gamesRoutes'); // Cambiado de songRoutes a gameRoutes

const app = express();

// Configuración de multer
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Rutas
app.use('/api/users', userRoutes);
app.use('/api/games', gamesRoutes); // Cambiado de /api/songs a /api/games

// Configuración para servir archivos estáticos (por ejemplo, imágenes, audio)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Conexión a la base de datos
mongoose
  .connect('mongodb://0.0.0.0:27017/mygamesdatabase', {

  })
  .then(() => {
    console.log('Connected to database');
  })
  .catch((error) => {
    console.error('Database connection failed:', error);
  });

// Manejo de errores 404
app.use((req, res, next) => {
  res.status(404).send("Sorry, can't find that!");
});

// Manejo de errores 500 (Internal Server Error)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
