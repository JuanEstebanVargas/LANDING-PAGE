const express = require('express');
const router = express.Router();
const rutaConsultaDisponibilidad = express.Router();
const consultarDisponibilidad = require('../src/landPageF');

// Ruta para la consulta de disponibilidad
router.post('/api/consultaDisponibilidad', async (req, res) => {

    try {
        console.log(req.body);
        const { checkIn, checkOut, numPersonas } = req.body;

        console.log('Check In:', checkIn);
        console.log('Check Out:', checkOut);
        console.log('Número de Personas:', numPersonas);

        const resultadoConsulta = await consultarDisponibilidad(checkIn, checkOut, numPersonas);
        res.status(200).json({data: resultadoConsulta });
    } catch (error) {
        console.error('Error en la consulta de disponibilidad:', error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
});

module.exports = router;