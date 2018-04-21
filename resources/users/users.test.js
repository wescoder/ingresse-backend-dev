import test from 'ava'

import connect, { User } from '../../db'
import { list, find } from './'

test.before('Connect DB', async t => {
  await connect()
})

test.beforeEach('Populate DB', async t => {
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

test('list has 2 items', async t => {
  const ctx = { body: '' }
  await list(ctx, () => {})
  t.is(ctx.body.length, 2)
})

test('find matt and check data', async t => {
  const { id } = t.context.mattAfter
  const ctx = { body: '', params: { id } }
  await find(ctx, () => {})
  t.deepEqual(ctx.body, t.context.mattAfter)
})

test.todo('create method')

test.todo('delete method')

test.todo('update method')
