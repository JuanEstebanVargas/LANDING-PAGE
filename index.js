require('dotenv').config();
const express = require('express');
const cors = require('cors');
const rutaConsultaDisponibilidad = require('./src/LandingPageRuta.js');
const path = require('path'); // Importa path aquí
const { fileURLToPath } = require('url'); // Importa fileURLToPath aquí
const app = express();
const PORT = process.env.PORT;

// Servidor
app.listen(PORT, () => {
    console.log(`--------> Backend escuchando en http://localhost:${PORT} <--------`);
});

// Configuración 
app.use(express.static(path.join(__dirname, "public"))); 
app.use(express.json());

// Rutas
app.get("/", (req, res) => res.sendFile(path.join(__dirname, "FRONT", "index.html"))); 
app.use('/', rutaConsultaDisponibilidad);
