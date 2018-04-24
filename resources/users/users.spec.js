import test from 'ava'
import got from 'got'

import { serve } from '../../server'
import { User } from '../../db'
import { IS_PROD, API_PORT, APP_URL } from '../../env'

test.before('Start server', async t => {
  await serve(IS_PROD, API_PORT, APP_URL)
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

test('create method', async t => {
  const res = await got.post(`${APP_URL}/users`, {
    ...t.context.gotOptions,
    json: true,
    body: t.context.ada
  })
  const ada = await User.findOne({ username: t.context.ada.username })
  t.truthy(ada)
  t.deepEqual(res.body, await ada.json())
})

test('delete method', async t => {
  const res = await got.delete(`${APP_URL}/users/${t.context.mattAfter._id}`, {
    ...t.context.gotOptions,
    json: true
  })
  t.is(res.body.ok, 1)
})

test('update method', async t => {
  const alex = await User.findOne({ username: t.context.alex.username })
  const newAlex = {
    ...(await alex.json()),
    email: t.context.alexEmail
  }
  const res = await got.put(`${APP_URL}/users/${alex.get('_id')}`, {
    ...t.context.gotOptions,
    json: true,
    body: newAlex
  })
  t.deepEqual(res.body, {
    ...newAlex,
    updatedAt: res.body.updatedAt
  })
})
