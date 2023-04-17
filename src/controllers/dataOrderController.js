const dataOrderCtrl = {};
const dataOrderModel = require('../models/dataOrderModel');

dataOrderCtrl.create = async (order_id, tipo, option_menu, guarniciones = false) => {
    let precio = 0;
    if(tipo === 'completa'){
        precio = option_menu.menu_price_orden;
    }

    if(tipo === 'media'){
        precio = option_menu.menu_price_media;
    }
    
    const newDataOrder = {
        'od_order_id': order_id,
        'od_menu_id': option_menu.menu_id,
        'od_menu_price': precio
    }
    if(guarniciones){
        for(var i=0; i<guarniciones.length; i++){
            newDataOrder['od_menu_guarnicion'+(i+1)+'_id'] = guarniciones[i].guarnicion_id;
        }
    }
    const data_order_id = await dataOrderModel.create(newDataOrder);
    return data_order_id;
};


module.exports = dataOrderCtrl;