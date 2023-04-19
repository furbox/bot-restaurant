const { addKeyword } = require("@bot-whatsapp/bot");
const menuCtrl = require("../controllers/menuController");
const orderCtrl = require("../controllers/orderController");
const dataOrderCtrl = require("../controllers/dataOrderController");

let order_id = 0;

async function getGuarnicionesText(guarniciones) {
    let guarniciones_txt = '';
    if (guarniciones.length > 0) {
        guarniciones_txt = guarniciones.map((g) => g.guarnicion_name).join(', ');

    } else {
        guarniciones_txt = 'No aplica';
    }
    return guarniciones_txt;
}

module.exports = {
    flowMenu: () => {
        return addKeyword('MENU', { sensitive: true })
            .addAnswer(
                ["*Tu Restaurant Favorito*", "Te Muestro el Menu:"])
            .addAction(async (ctx, { flowDynamic, provider }) => {
                console.log(ctx);
                await flowDynamic("Consultando el menu del día...");
                const menu = await menuCtrl.getMenu();
                const menutxt = menu.map((m) => {
                    const gu = m.menu_guarnicion == 1 ? 'Si' : 'No';
                    return `${m.menu_id}.- *${m.menu_name}* - ${m.menu_desc} \nGuarnicion: ${gu}\nOrden:  ${m.menu_price_orden}, Media: $ ${m.menu_price_media}\n`;
                });
                //console.log(menutxt.toString());
                await flowDynamic(menutxt.join('\n'));
                const guarniciones = await menuCtrl.getGuarniciones();
                const guarnicionestxt = guarniciones.map((g) => {
                    return `${g.guarnicion_id}.- *${g.guarnicion_name}*\n`;
                });
                //console.log(guarnicionestxt.toString());
                await flowDynamic('Guarniciones a escoger: \n' + guarnicionestxt.join('\n'));
                await flowDynamic('Para realizar tu pedido escribe el numero del menu seguido de un guion (-) y las guarniciones que deseas separadas por comas (,) y finalmente el tipo de orden que deseas *completa* o *media*');
                await flowDynamic('Ejemplo: 1-1,2,3-completa');
                await flowDynamic('Si deseas terminar tu pedido escribe *TERMINAR*');
            }
            ).addAnswer(
                ["Si gustas comenzar tu pedido escribe *ORDENAR* o *PRINCIPAL* para regresar al menu principal"],
                { capture: true })
    }
}