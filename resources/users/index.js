import Koa from 'koa'
import Router from 'koa-router'
import { ObjectID } from 'mongodb'

import { User } from '../../db'

export const users = new Koa()

const router = new Router()

export const list = async (ctx, next) => {
  const users = await User.find()
  ctx.body = users.map(u => u ? u.json() : null)
  await next()
}

export const find = async (ctx, next) => {
  const { params: { id } } = ctx
  const user = await User.findOne({ _id: new ObjectID(id) })
  ctx.body = user ? await user.json() : null
  await next()
}

router.get('/', list)
router.get('/:id([a-f\\d]{24})', find)

users.use(router.routes())
users.use(router.allowedMethods())

export default users
