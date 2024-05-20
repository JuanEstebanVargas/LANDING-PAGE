const pool = require('../configs/db.config');

const consultarDisponibilidad = async (fechaInicio, fechaSalida, cantPersonas) => {
    try {
        // Consultar la disponibilidad de habitaciones en base a las fechas y la cantidad de personas

        console.log('Fecha de inicio P1:', fechaInicio);
        console.log('Fecha de inicio P1:', fechaSalida);
        console.log('cant P1:', cantPersonas);
        
        const query = `
        SELECT h."ID", h."TIPO", h."PRECIO", h."CAPACIDAD"
        FROM public."HABITACION" h
        LEFT JOIN public."RESERVA" r ON h."ID" = r."ID_HABITACION" AND r."HABILITADO" = true 
        WHERE h."HABILITADO" = true
        AND (r."ID" IS NULL OR 
            NOT (r."F_ENTRADA" <= $1 AND r."F_SALIDA" >= $2))
        AND h."CAPACIDAD" >= $3
        order by h."ID";
        `;
        const { rows } = await pool.query(query, [fechaInicio, fechaSalida, cantPersonas]);

        /*if (isNaN(fechaInicio.getTime()) || isNaN(fechaSalida.getTime())) {
            throw new Error('Formato de fecha no válido');
        }*/

        if (rows.length > 0) {
            // Si se encuentran resultados, significa que hay disponibilidad
            console.log('Resultados de la consulta:', rows);
            return { disponibles: true, habitaciones: rows, codigoEstado: 200 };
        } else {
            // Si no se encuentran resultados, no hay disponibilidad
            console.log('No hay habitaciones disponibles');
            return { disponibles: false, habitaciones: [], codigoEstado: 404 };
        }
    } catch (error) {
        console.error('Error al consultar la base de datos: ', error);
        throw error;
    }
};

module.exports = consultarDisponibilidad;