const { addKeyword } = require("@bot-whatsapp/bot");
const menuCtrl = require("../controllers/menuController");
const orderCtrl = require("../controllers/orderController");
const dataOrderCtrl = require("../controllers/dataOrderController");


async function getGuarnicionesText(guarniciones) {
    let guarniciones_txt = '';
    if (guarniciones.length > 0) {
        guarniciones_txt = guarniciones.map((g) => g.guarnicion_name).join(', ');

    } else {
        guarniciones_txt = 'No aplica';
    }
    return guarniciones_txt;
}

const flowTerminar = addKeyword('TERMINAR', { sensitive: true })
    .addAnswer(
        ["Gracias por pasar a *Tu Restaurant Favorito*", "Te muestro tu pedido"],
        { capture: false },
        async (ctx, { flowDynamic }) => {
            console.log(global.session.order_id);
            const order = await orderCtrl.getOrderCompleted(global.session.order_id);
            console.log(order);
            console.log(order.length);
            //revisar cuantas objetos hay en su pedido
            if (order.length > 0) {
                const total = order.reduce((acc, o) => acc + Number(o.od_menu_price), 0);
                const order_txt = order.map((o) => {
                    const guarniciones =
                        o.menu_guarnicion === 1
                            ? `- Guarniciones ${o.g1name || ''}, ${o.g2name || ''}, ${o.g3name || ''}`
                            : '';
                    return `Orden *${o.menu_name}* ${guarniciones} - $ ${o.od_menu_price}\n`;
                });
                await flowDynamic(order_txt.join('\n').toString());
                await flowDynamic(`Total: $ ${total}`);
            } else {
                await flowDynamic("No hay nada en su pedido puede escribir 'PRINCIPAL' para regresar.");
            }
        }
    ).addAnswer(
        ["Si le interesa servicio a domicilio sin costo escriba *DOMICILIO* o *NO* de lo contrario"],
        { capture: true },
        async (ctx, { flowDynamic, endFlow }) => {
            const entrada = ctx.body;
            if (entrada == 'No' || entrada == 'NO' || entrada == 'no') {
                await orderCtrl.updateOrder(global.session.order_id, { order_status: 1 });
                await flowDynamic('Gracias por su preferencia. Su pedido esta en proceso, si desea agregar algun comentario a su pedido escriba *COMENTARIO*');
                await endFlow();
            }
        });


module.exports = flowTerminar;