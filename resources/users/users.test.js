import test from 'ava'

import connect, { User } from '../../db'
import { list, find, create } from './'

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
  t.context.alexEmail = 'alexander@stepanov.dev'
  t.context.ada = {
    name: 'Ada Lovelace',
    username: 'adalovelace',
    password: '4d4l0v3l4c3',
    email: 'ada@lovelace.math'
  }
  await (new User(t.context.matt)).save()
  await (new User(t.context.alex)).save()
  const matt = await User.findOne({ username: t.context.matt.username })
  t.context.mattAfter = matt && await matt.json()
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
  const ctx = { body: '', params: { id: t.context.mattAfter._id } }
  await find(ctx, () => {})
  t.deepEqual(ctx.body, t.context.mattAfter)
})

test('create method', async t => {
  const ctx = { body: '', params: { userData: t.context.ada } }
  await create(ctx, () => {})
  const ada = await User.findOne({ username: t.context.ada.username })

  t.truthy(ada)
  t.deepEqual(ctx.body, await ada.json())
})

test.todo('delete method')

test.todo('update method')
