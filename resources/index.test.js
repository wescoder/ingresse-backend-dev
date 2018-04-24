import test from 'ava'

import * as resources from './'
import { users, list, find, create, remove, update } from './users'

test('Exports correctly', t => {
  t.deepEqual(resources, {
    default: { users },
    users,
    list,
    find,
    create,
    remove,
    update
  })
})
