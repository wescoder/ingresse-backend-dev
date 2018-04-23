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
import { IS_PROD, API_PORT, APP_URL } from './env'

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

export const serve = async () => {
  await connect()
  let server
  if (IS_PROD) {
    server = http.createServer(app.callback())
  } else {
    server = https.createServer(cert, app.callback())
  }
  server.listen(API_PORT, () =>
    console.log(`API running on port ${API_PORT} ${APP_URL}`)
  )
}

export default serve
