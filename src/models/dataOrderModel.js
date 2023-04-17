const mysql = require('mysql2/promise');
const config = require('../configs/db');

const pool = mysql.createPool(config);

const dataOrderModel = {
    async getAll(order_id) {
        const conn = await pool.getConnection();
        const [rows, fields] = await conn.query('SELECT * FROM orders_data where od_order_id = ?', [order_id]);
        conn.release();
        return rows;
    },

    async getById(id, order_id) {
        const conn = await pool.getConnection();
        const [rows, fields] = await conn.query('SELECT * FROM orders_data WHERE od_id = ? and od_order_id = ?', [id, order_id]);
        conn.release();
        return rows[0];
    },

    async create(data) {
        const conn = await pool.getConnection();
        const [result, fields] = await conn.query('INSERT INTO orders_data SET ?', [data]);
        conn.release();
        return result.insertId;
    },

    async update(id, data, order_id) {
        const conn = await pool.getConnection();
        const [result, fields] = await conn.query('UPDATE orders_data SET ? WHERE od_id = ? and od_order_id = ?', [data, id, order_id]);
        conn.release();
        return result.affectedRows;
    },

    async delete(id, order_id) {
        const conn = await pool.getConnection();
        const [result, fields] = await conn.query('DELETE FROM orders_data WHERE od_id = ? and od_order_id = ? = ?', [id, order_id]);
        conn.release();
        return result.affectedRows;
    },
};

module.exports = dataOrderModel;
