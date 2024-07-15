const fs = require('fs');

function registrar(nombre, edad, animal, color, enfermedad) {
    const nuevaCita = {
        nombre,
        edad,
        animal,
        color,
        enfermedad
    };

    fs.readFile('citas.json', 'utf8', (err, data) => {
        if (err) throw err;

        let registros;
        try {
            registros = JSON.parse(data);
        } catch (e) {
            registros = [];
        }

        registros.push(nuevaCita);

        fs.writeFile('citas.json', JSON.stringify(registros, null, 2), (err) => {
            if (err) throw err;
            console.log('Cita registrada con éxito.');
        });
    });
}

function leer() {
    fs.readFile('citas.json', 'utf8', (err, data) => {
        if (err) throw err;

        let registros;
        try {
            registros = JSON.parse(data);
        } catch (e) {
            registros = [];
        }

        console.log('Citas registradas:');
        console.log(registros);
    });
}

function vaciarJson() {
    let registros = []
    fs.writeFile('citas.json', JSON.stringify(registros), (err) => {
        if (err) throw err;
        console.log('JSON reiniciado con exito');
    });
}

module.exports = { registrar, leer, vaciarJson };
