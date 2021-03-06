const { io } = require('../server');
const { Usuarios } = require('../classes/usuarios');
const { crearMensaje } = require('../utilidades/utilidades');

const usuarios = new Usuarios(); // hace el constructor

io.on('connection', (client) => {

    client.on('entrarChat', (data, callback) => {

        if (!data.nombre || !data.sala) {
            return callback({
                error: true,
                mensaje: 'el nombre/sala es necesario'
            });
        }

        client.join(data.sala);


        usuarios.agregarPersona(client.id, data.nombre, data.sala);

        // mensaje que se emite a los usuarios de la misma sala
        client.to(data.sala).emit('listaPersonasConectadas', usuarios.getPersonasPorSala(data.sala));

        // avisa cuando se conecta un usuario
        client.to(data.sala).emit('enviarMensaje', crearMensaje('Administrador', `*${data.nombre} se ha conectado*`));

        callback(usuarios.getPersonasPorSala(data.sala)); // es como un return

    });

    client.on('enviarMensaje', (data, callback) => {

        // por si no viene el nombre en la data......
        let persona = usuarios.getPersona(client.id);
        let mensajeRecibido; // movida que me he inventado porq no va como está en los vídeos

        if (persona.mensaje) {
            mensajeRecibido = persona.mensaje;
        } else {
            mensajeRecibido = data.mensaje;
        }


        let mensaje = crearMensaje(persona.nombre, mensajeRecibido);
        client.to(persona.sala).emit('enviarMensaje', mensaje);

        callback(mensaje);

    });


    client.on('disconnect', () => {
        let personaBorrada = usuarios.borrarPersona(client.id);

        // mensaje que se emite a todos los usuarios cuando alguien se desconecta del servidor
        // crearMensaje('Administrador', `${personaBorrada.nombre} se desconectó del chat`);
        client.to(personaBorrada.sala).emit('enviarMensaje', crearMensaje('Administrador', `*${personaBorrada.nombre} se desconectó*`));
        client.to(personaBorrada.sala).emit('listaPersonasConectadas', usuarios.getPersonasPorSala(personaBorrada.sala));
    });


    // MENSAJES PRIVADOS
    client.on('mensajePrivado', data => {
        //todo: validar si viene mensaje o no

        let persona = usuarios.getPersona(client.id);

        // io.to(socketId).emit('hey', 'I just met you');
        client.to(data.para).emit('mensajePrivado', crearMensaje(persona.nombre, data.mensaje));


    });


});