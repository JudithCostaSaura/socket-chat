var socket = io();

var params = new URLSearchParams(window.location.search);

if (!params.has('nombre') || !params.has('sala')) {
    window.location = 'index.html';
    throw new Error('El nombre y sala son necesarios');
}

var usuario = {
    nombre: params.get('nombre'),
    sala: params.get('sala')
};



socket.on('connect', function() {
    console.log('Conectado al servidor');

    socket.emit('entrarChat', usuario, function(resp) {
        renderizarUsuaruios(resp);
    });

});

// escuchar
socket.on('disconnect', function() {

    console.log('Perdimos conexión con el servidor');

});


//** --Start-- Mostrar Información -> MENSAJES A USUARIOS */
// Escuchar información
socket.on('enviarMensaje', function(mensaje) {
    renderizarMensajes(mensaje, false); // el false es el 'yo', si lo envío estoy escuchando significa que me lo han enviado
    scrollBottom();
});

// Escuchar cambios de usuarios
// cuando un usuario entra o sale del chat
socket.on('listaPersonasConectadas', function(personas) {
    renderizarUsuaruios(personas);
});

// MENSAJES PRIVADOS
socket.on('mensajePrivado', function(mensaje) {
    console.log('Mensaje privado', mensaje);
});
//** --End-- Mostrar Información */