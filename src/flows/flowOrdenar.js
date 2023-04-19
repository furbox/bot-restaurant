const { addKeyword } = require("@bot-whatsapp/bot");

const flowOrdenar = addKeyword('ORDENAR', { sensitive: true })
    .addAnswer(["Bienvenido a *Tu Restaurant Favorito*",
        "Escoge el numero del menu para ordenar:"], { capture: true },
        async (ctx, { fallBack, flowDynamic, endFlow }) => {

            const entrada = ctx.body;

            if (entrada.toLowerCase().includes('terminar')) {
                return;
            }

            // Verificar si la entrada es igual a cero
            if (entrada == 0) {
                await fallBack();
                return;
            }

            // Definir una expresión regular para validar el formato de la entrada
            //const regex = /^(\d{1,}(,\d+)*)|(\d{1,}-\d+(,\d+)*)-(completa|media)$/;
            //const regex = /^\d{1,}(,(?=\d|-)\d{1,}){0,2}(-completa|-media)$/;
            const regex = /^\d{1,}(,(?=\d|-)\d{1,}){0,2}(-completa|-media)$/;

            // Verificar si la entrada cumple con el formato esperado
            if (!regex.test(entrada)) {
                await flowDynamic('La entrada no es válida');
                await fallBack();
                console.log('La entrada no es válida');
                return;
            }

            const [menuId, guarnicionesStr, tipo] = entrada.split('-');
            const guarniciones = guarnicionesStr.split(',');

            // Validar que el tipo de orden sea "completa" o "media"
            if (tipo !== "completa" && tipo !== "media") {
                await flowDynamic('La opción solo puede ser *completa* o *media*');
                await fallBack();
                return;
            }

            // Crear una nueva orden si no existe una activa
            if (order_id === 0) {
                order_id = await orderCtrl.create(ctx.from);
                global.session.order_id = order_id;
            } else {
                // Verificar que la orden activa no haya sido enviada o cancelada
                const order = await orderCtrl.getById(order_id);
                if (order.order_status === 1 || order.order_status === 0) {
                    await flowDynamic('Tu orden ya fue enviada, no puedes agregar mas productos');
                    await endFlow();
                    return;
                }
            }

            // Obtener la opción de menú seleccionada
            const option_menu = await menuCtrl.getById(menuId);

            if (!option_menu) {
                await flowDynamic('Opcion de menu no valida');
                await fallBack();
                return;
            }

            // Obtener las guarniciones seleccionadas
            let guarniciones_txt = '';
            let guarnicionesData = false;
            if (option_menu.menu_guarnicion == 0) {
                guarniciones_txt = 'No aplica';
            } else if (guarniciones.length > 0) {
                guarnicionesData = await menuCtrl.getSelectGuarniciones(guarniciones);
                guarniciones_txt = await getGuarnicionesText(guarnicionesData);
            }

            // Crear la nueva data order
            const data_order_id = await dataOrderCtrl.create(order_id, tipo, option_menu, guarnicionesData);

            // Mostrar mensaje de confirmación
            const message = guarniciones_txt
                ? `Agregaste ${option_menu.menu_name} a tu orden con las siguientes guarnciones ${guarniciones_txt}`
                : `Agregaste ${option_menu.menu_name} a tu orden.`;
            await flowDynamic(message);
            console.log(data_order_id);

            await fallBack();
        })
module.exports = flowOrdenar;