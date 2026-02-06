//endpointy API
import { Hono } from "hono";
import db from './db.js';

const app = new Hono();

async function getBody(c) {
    try {
      const data = await c.req.json()
      return data
    } catch (err) {
      return null
    }
  }

 //lista sprzętu ze statusem i kategoria
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
app.post('/api/equipment', async (c) => {
    const data = await getBody(c);
})