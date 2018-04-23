import test from 'ava'
import got from 'got'

import { serve } from '../../server'
import { User } from '../../db'
import { APP_URL } from '../../env'

test.before('Start server', async t => {
  await serve()
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
  await (new User(t.context.matt)).save()
  await (new User(t.context.alex)).save()
  const matt = await User.findOne({ username: t.context.matt.username })
  t.context.mattAfter = matt && await matt.json()
  t.context.gotOptions = { rejectUnauthorized: false }
})

test.afterEach.always('Empty DB', async t => {
  await User.remove()
})

test('list has 2 items', async t => {
  const res = await got.get(`${APP_URL}/users`, t.context.gotOptions)
  const users = await JSON.parse(res.body)
  t.true(Array.isArray(users))
  t.is(users.length, 2)
})

test('find method', async t => {
  const res = await got.get(`${APP_URL}/users/${t.context.mattAfter._id}`, t.context.gotOptions)
  const matt = JSON.parse(res.body)
  t.deepEqual(matt, t.context.mattAfter)
})

test.todo('create method')

test.todo('delete method')

test.todo('update method')
