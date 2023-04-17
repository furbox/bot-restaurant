const mysql = require('mysql2/promise');
const config = require('../configs/db');

const pool = mysql.createPool(config);

const menuModel = {
    async getAll() {
        const conn = await pool.getConnection();
        const [rows, fields] = await conn.query('SELECT * FROM menu WHERE menu_activo = 1');
        conn.release();
        return rows;
    },

    async getById(id) {
        const conn = await pool.getConnection();
        const [rows, fields] = await conn.query('SELECT * FROM menu WHERE menu_id = ? AND menu_activo = 1', [id]);
        conn.release();
        return rows[0];
    },

    async create(data) {
        const conn = await pool.getConnection();
        const [result, fields] = await conn.query('INSERT INTO menu SET ?', [data]);
        conn.release();
        return result.insertId;
    },

    async update(id, data) {
        const conn = await pool.getConnection();
        const [result, fields] = await conn.query('UPDATE menu SET ? WHERE menu_id = ?', [data, id]);
        conn.release();
        return result.affectedRows;
    },

    async delete(id) {
        const conn = await pool.getConnection();
        const [result, fields] = await conn.query('DELETE FROM menu WHERE menu_id = ?', [id]);
        conn.release();
        return result.affectedRows;
    },

    async getGuarniciones() {
        const conn = await pool.getConnection();
        const [rows, fields] = await conn.query('SELECT * FROM guarniciones WHERE guarnicion_activo = 1');
        conn.release();
        return rows;
    },

    async getSelectGuarniciones(opciones) {
        if (opciones[0] !== 0 || opciones[1] !== 0 || opciones[2] !== 0) {
            if(opciones.length === 1){
                opciones[1] = 0;
                opciones[2] = 0;
            }
            if(opciones.length === 2){
                opciones[2] = 0;
            }
            const conn = await pool.getConnection();
            // Realizar la búsqueda en la base de datos
            const query = `SELECT * FROM guarniciones WHERE guarnicion_id = ? OR guarnicion_id = ? OR guarnicion_id = ?`;
            const [rows, fields] = await conn.query(query, opciones);
            conn.release();
            return rows;
        }
        return [];
    }
};

module.exports = menuModel;
