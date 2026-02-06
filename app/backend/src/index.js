import { Hono } from 'hono'
import { serve } from '@hono/node-server'
import server from './server.js'

const app = new Hono()

app.route('/', server)

serve({
  fetch: app.fetch,
  port: 3000
})

