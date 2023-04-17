const { addKeyword } = require("@bot-whatsapp/bot");

const flowPrincipal = addKeyword(['hola', 'ole', 'alo', 'buenas', 'buen', 'principal'])
    .addAnswer(
        "Bienvenido a *Tu Restaurant Favorito*",
        "Te muestro el menu del dia:"
    ).addAnswer([
        "¿Como podemos ayudarte?",
        "",
        "*MENU* Ver el menu del dia",
        "*INSTRUCCIONES* Ver como se ordena por aquí",
        "*TERMINAR* Para terminar tu orden",
        "*LOCAL* para ver nuestra dirección",
    ])
    .addAnswer(`Responda con la palabra correspondiente`);

module.exports = flowPrincipal;