//endpointy API
import { Hono } from "hono";
import db from './db.js';

const app = new Hono();

app.get('/api/equipment', (c) => {
    return c.json({ messege: 'endpoint działa'});
});