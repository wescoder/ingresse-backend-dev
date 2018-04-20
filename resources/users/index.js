import Koa from 'koa'
import Router from 'koa-router'

export const users = new Koa()

const router = new Router()

router.get('/', async (ctx, next) => {
  ctx.body = 'users route ok'
  await next()
})

users.use(router.routes())
users.use(router.allowedMethods())

export default users
