//** Funciones para renderizar usuarios */

var params = new URLSearchParams(window.location.search);

var nombreUsuario = params.get('nombre');
var salaUsuario = params.get('sala');

var divUsuariosChat = $("#divUsuarios");
var formEnviar = $("#enviar");
var txtMensaje = $("#txtMensaje");
var divChatbox = $("#divChatbox");


function renderizarUsuaruios(personasChat) {
    console.log(personasChat);

    var html = "";

    html += '<li>';
    html += '<a href="javascript:void(0)" class="active"> Chat de <span>' + params.get('sala') + '</span></a>';
    html += '</li>';

    for (var i = 0; i < personasChat.length; i++) {
        html += '<li>';
        html += '<a data-id="' + personasChat[i].id + '" href="javascript:void(0)"><img src="assets/images/users/1.jpg" alt="user-img" class="img-circle"> <span> ' + personasChat[i].nombre + ' <small class="text-success">online</small></span></a>';
        html += '</li>';
    }

    divUsuariosChat.html(html);

}

function renderizarMensajes(mensaje, yo) {

    // 'yo' sirve para saber si he enviado yo el mensaje o no
    var html = "";
    var fecha = new Date(mensaje.fecha);
    var hora = fecha.getHours() + ':' + fecha.getMinutes();

    var desconectadoInfoClass = 'info'; // viene de aquí: <div class="box bg-light-info">

    if (mensaje.nombre === 'Administrador') {
        // desconectadoInfoClass = 'danger';
        desconectadoInfoClass = 'warning';
    }

    if (yo) {
        html += '<li class="reverse">';
        html += '<div class="chat-content">';
        html += '<h5>' + mensaje.nombre + '</h5>';
        html += '<div class="box bg-light-inverse">' + mensaje.mensaje + '</div>';
        html += '</div>';
        html += '<div class="chat-img"><img src="assets/images/users/5.jpg" alt="user" /></div>';
        html += '<div class="chat-time">' + hora + '</div>';
        html += '</li>';
    } else {
        html += '<li class="animated fadeIn">';

        if (mensaje.nombre !== 'Administrador') {
            html += '<div class="chat-img"><img src="assets/images/users/2.jpg" alt="user" /></div>';
        }

        html += '<div class="chat-content">';
        html += '<h5>' + mensaje.nombre + '</h5>';
        html += '<div class="box bg-light-' + desconectadoInfoClass + '">' + mensaje.mensaje + '</div>';
        html += '</div>';
        html += '<div class="chat-time">' + hora + '</div>';
        html += '</li>';
    }

    divChatbox.append(html);

}

// para que se baje solo cuando tenemos nuevos mensajes
function scrollBottom() {

    // selectors
    var newMessage = divChatbox.children('li:last-child');

    // heights
    var clientHeight = divChatbox.prop('clientHeight');
    var scrollTop = divChatbox.prop('scrollTop');
    var scrollHeight = divChatbox.prop('scrollHeight');
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight() || 0;

    if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
        divChatbox.scrollTop(scrollHeight);
    }
}


// listeners
divUsuariosChat.on('click', 'a', function() {

    var id = $(this).data('id');
    if (id) {
        console.log(id);
    }
});

formEnviar.on('submit', function(e) {
    e.preventDefault();
    if (txtMensaje.val().trim().length === 0) {
        return;
    }

    socket.emit('enviarMensaje', {
        nombre: nombreUsuario,
        mensaje: txtMensaje.val()

    }, function(mensaje) {
        txtMensaje.val('').focus();
        renderizarMensajes(mensaje, true); // el true es el 'yo', si lo envío con el formulario significa q soy yo
        scrollBottom();
    });
});