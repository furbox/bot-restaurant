const { addKeyword } = require("@bot-whatsapp/bot");
const orderCtrl = require("../controllers/orderController");


const flowComentario = addKeyword('COMENTARIO', { sensitive: true })
    .addAnswer(
        ["Gracias por pasar a *Tu Restaurant Favorito*", "Escriba su comentario en una sola linea para agregarla a su menu"],
        { capture: true },
        async (ctx) => {
            console.log(global.session.order_id);
            const comentario = ctx.body;
            await orderCtrl.updateOrderComentario(global.session.order_id, comentario);
        }
    ).addAnswer(
        ["Su comentario ha sido agregado a su pedido", "Gracias por su preferencia. Su pedido esta en proceso."]);


module.exports = flowComentario;