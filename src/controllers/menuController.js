const menuCtrl = {};
const menuModel = require('../models/menuModel');

menuCtrl.getMenu = async () => {
    const menu = await menuModel.getAll();
    return menu;
};

menuCtrl.getById = async (id) => {
    const menu = await menuModel.getById(id);
    return menu;
};

menuCtrl.getGuarniciones = async () => {
    const guarniciones = await menuModel.getGuarniciones();
    return guarniciones;
}

menuCtrl.getSelectGuarniciones = async (options) => {
    const selected = await menuModel.getSelectGuarniciones(options);
    return selected;
};
module.exports = menuCtrl;