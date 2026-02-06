//endpointy API
import { Hono } from "hono";
import db from './db.js';

const app = new Hono();

app.get('/api/equipment', (c) => {
    const category = c.req.query('category');
    const status = c.req.query('status');

    let sql = "SELECT * FROM equipment WHERE 1=1";
    const params = [];

    if (category) {
        sql += "AND category = ?";
        params.push(category);
    }
    if(status) {
        sql += "AND status = ?";
        params.push(status);
    }
    const equipment = db.prepare(sql).all(...params)
    return c.json(equipment);
});