const mysql = require('mysql2/promise');
const config = require('../configs/db');

const pool = mysql.createPool(config);

const orderModel = {
    async getAll() {
        const conn = await pool.getConnection();
        const [rows, fields] = await conn.query('SELECT * FROM orders');
        conn.release();
        return rows;
    },

    async getById(id) {
        const conn = await pool.getConnection();
        const [rows, fields] = await conn.query('SELECT * FROM orders WHERE order_id = ?', [id]);
        conn.release();
        return rows[0];
    },

    async getCompleteById(id) {
        const conn = await pool.getConnection();
        const [rows, fields] = await conn.query('SELECT o.*, od.*, m.*, g.guarnicion_name as g1name, g2.guarnicion_name as g2name, g3.guarnicion_name as g3name FROM orders o ' +
            'join orders_data od on od.od_order_id = o.order_id ' +
            'join menu m on m.menu_id = od.od_menu_id ' +
            'left join guarniciones g on g.guarnicion_id = od.od_menu_guarnicion1_id ' +
            'left join guarniciones g2 on g2.guarnicion_id = od.od_menu_guarnicion2_id ' +
            'left join guarniciones g3 on g3.guarnicion_id = od.od_menu_guarnicion3_id ' +
            'WHERE o.order_id = ?', [id]);
        conn.release();
        return rows;
    },

    async create(data) {
        const conn = await pool.getConnection();
        const [result, fields] = await conn.query('INSERT INTO orders SET ?', [data]);
        conn.release();
        return result.insertId;
    },

    async update(id, data) {
        const conn = await pool.getConnection();
        const [result, fields] = await conn.query('UPDATE orders SET ? WHERE order_id = ?', [data, id]);
        conn.release();
        return result.affectedRows;
    },

    async delete(id) {
        const conn = await pool.getConnection();
        const [result, fields] = await conn.query('DELETE FROM orders WHERE order_id = ?', [id]);
        conn.release();
        return result.affectedRows;
    },
};

module.exports = orderModel;
