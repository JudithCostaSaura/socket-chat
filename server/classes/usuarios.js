class Usuarios {
    constructor() {
        // inicializa una array de personas q están dentro del chat
        this.personas = [];
    }

    agregarPersona(id, nombre, sala) {
        let persona = { id, nombre, sala };

        this.personas.push(persona);

        return this.personas;
    }

    getPersona(id) {
        let persona = this.personas.filter(persona => {
            return persona.id === id;
        })[0];

        return persona;
    }

    getPersonas() {
        return this.personas;
    }

    getPersonasPorSala(sala) {
        let personasPorSala = this.personas.filter(persona => {
            return persona.sala === sala;
        });

        return personasPorSala;
    }

    // crea un nuevo array de personas que reemplazan al existente, quedando fuera la persona con el id que recibe
    borrarPersona(id) {

        let personaBorrada = this.getPersona(id);

        this.personas = this.personas.filter(persona => {
            return persona.id != id;
        });

        return personaBorrada;

    }

}

module.exports = { Usuarios }