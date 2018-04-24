import test from 'ava'
import got from 'got'

import { serve } from './server'

test.beforeEach('Set context', t => {
  t.context.gotOptions = { rejectUnauthorized: false }
})

test('Server production started OK', async t => {
  const port = 3009
  const appUrl = `http://localhost:${port}`
  const server = await serve(true, port, appUrl)
  const res = await got.get(appUrl, t.context.gotOptions)
  t.is(res.body, 'API is running OK')
  await server.close()
})

test('Server not production started OK', async t => {
  const port = 3008
  const appUrl = `https://localhost:${port}`
  const server = await serve(false, port, appUrl)
  const res = await got.get(appUrl, t.context.gotOptions)
  t.is(res.body, 'API is running OK')
  await server.close()
})
