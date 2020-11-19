var socket = io();

var params = new URLSearchParams(window.location.search);


if (!params.has('nombre') || !params.has('sala')) {
    window.location = 'index.html';
    throw new Error('El nombre y sala son necesario');

}

var usuario = {
    nombre: params.get('nombre'),
    sala: params.get('sala')
}


socket.on('connect', function() {
    console.log('Conectado al servidor');

    socket.emit('entrarChat', usuario, function(resp) {
        console.log('Usuarios conectados:', resp);
    });
});

// escuchar
socket.on('disconnect', function() {

    console.log('Perdimos conexión con el servidor');

});


//** --Start-- Mostrar Información -> MENSAJES A USUARIOS
/* socket.on('crearMensaje', function(mensaje) {
    console.log(mensaje);
}); */
socket.on('enviarMensaje', function(mensaje) {
    console.log(mensaje);
});

socket.on('listaPersonasConectadas', function(mensaje) {
    console.log('----Lista de personas conectadas-----');
    console.log(mensaje);
});

// MENSAJES PRIVADOS
socket.on('mensajePrivado', function(mensaje) {
        console.log('Mensaje privado', mensaje);
    })
    //** --End-- Mostrar Información */