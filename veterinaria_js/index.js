const { registrar, leer, vaciarJson } = require('./operaciones')

const arg = process.argv.slice(2)
const operacion = arg[0]

if (operacion === "registrar") {
    const nombre = arg[1]
    const edad = arg[2]
    const animal = arg[3]
    const color = arg[4]
    const enfermedad = arg[5]
    registrar (nombre, edad, animal, color, enfermedad)
}

else if (operacion === "leer") {
    leer()
}

else if (operacion === "vaciar") {
    vaciarJson()
}

else{
    console.log("Operaciones no reconocida. Solo permite 'registrar' o 'leer'")
}