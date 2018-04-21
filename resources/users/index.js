import Koa from 'koa'
import Router from 'koa-router'

import { User } from '../../db'

export const users = new Koa()

const router = new Router()

export const list = async (ctx, next) => {
  const users = await User.find()
  ctx.body = users.map(u => u.get())
  await next()
}

export const find = async (ctx, next) => {
  const { params: { id } } = ctx
  const user = await User.findOne({ id })
  ctx.body = user.get()
  await next()
}

router.get('/', list)
router.get('/:id', find)

users.use(router.routes())
users.use(router.allowedMethods())

export default users
