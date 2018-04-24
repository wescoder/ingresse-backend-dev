import bodyparser from 'koa-bodyparser'
import cert from 'openssl-self-signed-certificate'
import cors from '@koa/cors'
import http from 'http'
import https from 'https'
import mount from 'koa-mount'
import Koa from 'koa'
import Router from 'koa-router'

import connect from './db'
import { users } from './resources'

const app = new Koa()

app.use(cors())
app.use(bodyparser())

const router = new Router()

router.get('/', async (ctx, next) => {
  ctx.body = 'API is running OK'
  await next()
})

app.use(router.routes())
app.use(router.allowedMethods())

app.use(mount('/users', users))

export const serve = async (isProd, port, appUrl) => {
  const db = await connect()

  let server
  if (isProd) {
    server = await http.createServer(app.callback())
  } else {
    server = await https.createServer(cert, app.callback())
  }
  await server.listen(port, () =>
    console.log(`API running on port ${port} ${appUrl}`)
  )

  const close = async () => {
    await server.close()
    await db.disconnect()

    console.log('Server stopped sucessfully')
    process.exit(0)
  }

  process.on('exit', () => console.log('Bye!'))
  process.on('SIGINT', close)
  process.on('SIGTERM', close)
  process.on('SIGUSR1', close)
  process.on('SIGUSR2', close)
  process.on('uncaughtException', close)

  return server
}

export default serve
