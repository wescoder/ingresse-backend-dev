import test from 'ava'

import db, { User } from '../../db'
import { crypt } from '../../db/plugins/cryptFields'
import { list, find } from './'

test.before('Connect DB', async t => {
  await db.connect()
})
test.beforeEach('Test data', async t => {
  t.context.matt = {
    name: 'Mattew Mercer',
    username: 'mattmercer',
    password: 'm477m3rc3r',
    email: 'matt@mercer.dm'
  }
  t.context.alex = {
    name: 'Alexander Stepanov',
    username: 'alexstepanov',
    password: '4l3xs73ph4n0v',
    email: 'alex@stepanov.dev'
  }
  await User.create(t.context.matt)
  await User.create(t.context.alex)
  t.context.mattAfter = (await User.findOne({ username: t.context.matt.username })).get()
})

test.afterEach.always('Empty DB', async t => {
  await User.remove()
})

test.serial('list users', async t => {
  const ctx = { body: '' }
  const userList = await list(ctx, () => {})
  t.is(ctx.body.length, 2)
})

test.serial('find matt user', async t => {
  const ctx = { body: '', params: { id: t.context.mattAfter.id } }
  const user = await find(ctx, () => {})
  t.deepEqual(ctx.body, t.context.mattAfter)
})
