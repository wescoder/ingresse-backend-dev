import bodyparser from 'koa-bodyparser'
import cert from 'openssl-self-signed-certificate'
import cors from '@koa/cors'
import http from 'http'
import https from 'https'
import mount from 'koa-mount'
import Koa from 'koa'

import db from './db'
import { IS_PROD, API_PORT, APP_URL } from './env'

const app = new Koa()

app.use(cors())
app.use(bodyparser())

db.connect()
  .then(() => {
    let server
    if (IS_PROD) {
      server = http.createServer(app.callback())
    } else {
      server = https.createServer(cert, app.callback())
    }
    server.listen(API_PORT, () =>
      console.log(`API running on port ${API_PORT} ${APP_URL}`)
    )
  })
  .catch(err => console.error('DB connection Failed!', err))

export default app
