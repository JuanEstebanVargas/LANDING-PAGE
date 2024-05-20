document.addEventListener('DOMContentLoaded', (event) => {
    document.querySelector('#consultarBtn').addEventListener('click', async function(event) {
        event.preventDefault(); // Evita que el botón realice su acción por defecto (navegar a "#consulta") 

                // Capturar los valores de los campos del formulario
                const checkIn = document.getElementById('Check-in').value;
                const checkOut = document.getElementById('Check-out').value;
                //convertir a fechas 
                const f_inicio = new Date(checkIn);
                const f_salida = new Date(checkOut);

                // Formatear las fechas en formato YYYY-MM-DD
                const formattedCheckIn = f_inicio.toISOString().split('T')[0];
                const formattedCheckOut = f_salida.toISOString().split('T')[0];
                const numPersonas = document.getElementById('numeroPersonas').value;

                if (parseInt(numPersonas) > 5) {
                    alert("Las habitaciones son máximo para 5 personas.\nComunícate con nuestros encargados para asignar múltiples habitaciones.\n¡Muchas gracias! :)");
                    return; // Detener la ejecución si la validación falla
                }
        
                // Mostrar los valores capturados en la consola para verificar
                console.log('Check In:', f_inicio);
                console.log('Check Out:', f_salida);
                console.log('Número de Personas:', numPersonas);

                 // Construir el objeto con los datos del formulario
                const formData = {
                    checkIn: checkIn,
                    checkOut: checkOut,
                    numPersonas: numPersonas
                };

// Enviar los datos al servidor utilizando fetch
try {
    const response = await fetch('/api/consultaDisponibilidad', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    });

    if (response.ok) {
        const data = await response.json();
        console.log(data);
    
        const panel = document.querySelector('#consulta .panel');
        panel.innerHTML = '<h1 class="titulo">Disponibilidad</h1>'; // Limpiar el contenido existente y agregar el título
        
    
        // Iterar sobre las habitaciones y mostrar los datos de cada una
        data.data.habitaciones.forEach(habitacion => {
            let habitacionInfo = `<div class="habitacion">
                                    <p> Tipo de habitación: ${habitacion.TIPO}, ID: ${habitacion.ID}, Precio: ${habitacion.PRECIO}$, Capacidad: ${habitacion.CAPACIDAD} personas</p>
                                    </div>`
            panel.innerHTML += habitacionInfo;
        });
    
        panel.style.display = 'flex'; // Mostrar el panel
    }else {
        console.error('Error al enviar la solicitud al servidor');
        // Muestra un mensaje de error en el panel
        document.querySelector('#consulta .panel').textContent = 'Error al enviar la solicitud al servidor.';
        document.querySelector('#consulta .panel').style.display = 'flex';
    }
} catch (error) {
    console.error('Error de red:', error);
    // Mostrar mensaje de error en el panel
    document.querySelector('#consulta .panel').textContent = 'Error al conectar con el servidor. Por favor, inténtelo de nuevo.';
    document.querySelector('#consulta .panel').style.display = 'flex';
}
});
});