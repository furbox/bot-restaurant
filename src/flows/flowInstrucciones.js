const { addKeyword } = require("@bot-whatsapp/bot");

const flowInstrucciones = addKeyword('INSTRUCCIONES', { sensitive: true })
    .addAnswer(
        "Bienvenido a *Tu Restaurant Favorito*",
        "Te muestro las INSTRUCCIONES para hacer un pedido:"
    ).addAnswer([
        "Para hacer tu pedido necesitas seguir el siguiente formato: *numeromenu-numeroguarnicion1,numeroguarnicion2,numeroguarnicion3-tamañoorden*",
        "Primero, debes seleccionar el *número* del menú que deseas ordenar, puedes encontrar estos números en nuestra lista de menús disponibles.",
        "Luego, puedes agregar hasta tres opciones de guarnición, si deseas agregar más de una, debes separar los números de guarnición con una coma (,).",
        "Finalmente, debes escribir el tamaño de tu orden, que puede ser completa o media, y debes separar todo por un guión (-).",
        "Ejemplos: 1-1,2,3-completa, 2-1,2,0-media, 3-0-completa"
    ])
    .addAnswer(`Responda *PRINCIPAL* para volver al menu principal o *MENU* para ver el menu del dia`);

module.exports = flowInstrucciones;