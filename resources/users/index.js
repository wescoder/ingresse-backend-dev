import Koa from 'koa'
import Router from 'koa-router'
import { ObjectID } from 'mongodb'

import { User } from '../../db'

export const users = new Koa()

const router = new Router()

export const list = async (ctx, next) => {
  const users = await User.find()
  ctx.body = await Promise.all(users.map(async u => u.json()))
  await next()
}

export const find = async (ctx, next) => {
  const { params: { id } } = ctx
  const user = await User.findById(new ObjectID(id))
  ctx.body = user && await user.json()
  await next()
}

export const create = async (ctx, next) => {
  const { request: { body: userData } } = ctx
  const user = new User(userData)
  await user.save()
  ctx.body = await user.json()
}

export const remove = async (ctx, next) => {
  const { id } = ctx.params
  const { result } = await User.remove({ _id: id })
  ctx.body = result
}

export const update = async (ctx, next) => {
  const { request: { body: userData }, params: { id } } = ctx
  const user = await User.findById(new ObjectID(id))
  Object.keys(userData)
    .forEach(async k => {
      await user.set(k, userData[k])
    })
  await user.save()
  ctx.body = await user.json()
}

router.get('/', list)
router.post('/', create)
router.get('/:id([a-f\\d]{24})', find)
router.delete('/:id([a-f\\d]{24})', remove)
router.put('/:id([a-f\\d]{24})', update)

users.use(router.routes())
users.use(router.allowedMethods())

export default users
