const { addKeyword } = require("@bot-whatsapp/bot");

const flowOrdenar = addKeyword('ORDENAR', { sensitive: true })
    .addAnswer(["Bienvenido a *Tu Restaurant Favorito*",
        "Escoge el numero del menu para ordenar:"], { capture: true },
        async (ctx, { flowDynamic, endFlow }) => {
            

        })
module.exports = flowOrdenar;