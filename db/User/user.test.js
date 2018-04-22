import test from 'ava'

import connect from '../'
import { crypt } from '../plugins/cryptFields'
import { User, list, find, create, remove } from './'

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
  await User.create(t.context.matt)
  await User.create(t.context.alex)
  const matt = await User.findOne({ username: t.context.matt.username })
  t.context.mattAfter = await matt.json()
})

test.afterEach.always('Empty DB', async t => {
  await User.remove()
})

test('list has 2 items', async t => {
  const userList = await list()
  t.is(userList.length, 2)
})

test('add ada and check data', async t => {
  const ada = await create({ userData: t.context.ada })
  const { _id, createdAt, updatedAt } = ada
  t.deepEqual(ada, {
    ...t.context.ada,
    password: crypt(t.context.ada.password),
    createdAt,
    updatedAt,
    _id
  })
})

test('find matt and check data', async t => {
  const { username } = t.context.matt
  const matt = await find({ username })
  const { _id, createdAt, updatedAt } = matt
  t.deepEqual(matt, {
    ...t.context.matt,
    _id,
    createdAt,
    updatedAt,
    password: crypt(t.context.matt.password)
  })
})

test('update alex email', async t => {
  const { username } = t.context.alex
  const alex = await User.findOne({ username })
  alex.set('email', t.context.alexEmail)
  alex.save()
  const { _id, createdAt, updatedAt, password } = alex.get()
  t.deepEqual(alex.get(), {
    ...t.context.alex,
    email: t.context.alexEmail,
    _id,
    createdAt,
    updatedAt,
    password
  })
})

test('delete alex', async t => {
  await remove({ username: t.context.alex.username })
  const count = await User.count()
  t.is(count, 1)
})
