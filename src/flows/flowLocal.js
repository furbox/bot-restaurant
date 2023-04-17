const { addKeyword } = require("@bot-whatsapp/bot");

const flowLocal = addKeyword('LOCAL', { sensitive: true })
    .addAnswer(
        "Bienvenido a *Tu Restaurant Favorito*",
        "Te muestro las Dirección para pasar a buscar tú pedido:"
    ).addAnswer([
        "Calle 1 entre 3 y 5 Colonia Noexiste C.P. 12345, Mérida, Yucatán, México",
    ])
    .addAnswer(`Responda *PRINCIPAL* para volver al menu principal o *MENU* para ver el menu del dia`);

module.exports = flowLocal;