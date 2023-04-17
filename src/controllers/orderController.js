const orderCtrl = {};
const orderModel = require('../models/orderModel');

orderCtrl.create = async (phone) => {
    const unixtime = Math.floor(Date.now() / 1000);
    const fecha = new Date().toISOString();
    const data = {
        'order_key': unixtime,
        'order_phone': phone,
        'order_date_add': fecha,
        'order_date_upd': fecha,
    }
    const order_id = await orderModel.create(data);
    return order_id;
};

orderCtrl.getById = async (id) => {
    const order = await orderModel.getById(id);
    return order;
};

orderCtrl.getOrderCompleted = async (id) => {
    const order = await orderModel.getCompleteById(id);
    return order;
};

orderCtrl.updateOrder = async (id, direccion) => {
    const fecha = new Date().toISOString();
    const data = {
        'order_date_upd': fecha,
        'order_address': direccion,
        'order_status': 1,
    }
    const order = await orderModel.update(id, data);
    return order;
};

orderCtrl.updateOrderComentario = async (id, comentario) => {
    const fecha = new Date().toISOString();
    const data = {
        'order_date_upd': fecha,
        'order_comment': comentario
    }
    const order = await orderModel.update(id, data);
    return order;
};
module.exports = orderCtrl;