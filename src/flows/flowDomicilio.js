const { addKeyword } = require("@bot-whatsapp/bot");
const orderCtrl = require("../controllers/orderController");


const flowDomicilio = addKeyword('DOMICILIO', { sensitive: true })
    .addAnswer(
        ["Gracias por pasar a *Tu Restaurant Favorito*", "Escriba su direccion completa y una referencia en una sola linea para que un repartidor se dirija a su domicilio"],
        { capture: true },
        async (ctx) => {
            console.log(global.session.order_id);
            const direccion = ctx.body;
            await orderCtrl.updateOrder(global.session.order_id, direccion.toString());
        }
    ).addAnswer(
        ["Si desea agregar algun comentario a su pedido escriba *COMENTARIO* o *NO* de lo contrario para terminar"],
        { capture: true },
        async (ctx, { fallBack, flowDynamic, endFlow }) => {
            const entrada = ctx.body;
            if (entrada == 'no' || entrada == 'No' || entrada == 'NO') {
                await flowDynamic('Gracias por su preferencia. Su pedido esta en proceso.');
                await endFlow();
            }
        });


module.exports = flowDomicilio;