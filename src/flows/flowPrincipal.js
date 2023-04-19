const { addKeyword } = require("@bot-whatsapp/bot");

const flowPrincipal = addKeyword(['hola', 'ole', 'alo', 'buenas', 'buen', 'principal'])
    .addAnswer(
        "Bienvenido a *Tu Restaurant Favorito*"
    ).addAnswer([
        "¿Como podemos ayudarte?",
        "",
        "*MENU* Ver el menu del dia",
        "*ORDENAR* para ordenar",
        "*INSTRUCCIONES* Ver como se ordena por aquí",
        "*TERMINAR* Para terminar tu orden",
        "*LOCAL* para ver nuestra dirección",
        "*PLATILLOS* para mostrar 3 de la casa",
    ])
    .addAnswer(`Responda con la palabra correspondiente`);

module.exports = flowPrincipal;