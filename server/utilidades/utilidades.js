const crearMensaje = (nombre, mensaje) => {
    /*     console.log('pasa por crearmensaje de utilidadesjs');
        console.log(nombre);
        console.log(mensaje);
        console.log('------'); */

    return {
        nombre,
        mensaje,
        fecha: new Date().getTime()
    }
}


module.exports = { crearMensaje }