import test from 'ava'

import * as plugins from './'
import { crypt, cryptFields } from './cryptFields'
import { json } from './json'

test('Exports correctly', t => {
  t.deepEqual(plugins, {
    crypt,
    cryptFields,
    json,
    default: {
      cryptFields,
      json
    }
  })
})
