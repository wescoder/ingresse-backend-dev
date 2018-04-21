import { Database } from 'mongorito'
import timestamps from 'mongorito-timestamps'

import User from './User'

import { MLAB_USER, MLAB_PASSWORD, MLAB_ENDPOINT, MLAB_DATABASE } from '../env'

export * from './User'

export const models = {
  User
}

export const db = new Database(`mongodb://${MLAB_USER}:${MLAB_PASSWORD}@${MLAB_ENDPOINT}/${MLAB_DATABASE}`)

Object.values(models)
  .forEach((model) => {
    model.use(timestamps({
      createdAt: 'createdAt',
      updatedAt: 'updatedAt'
    }))
    db.register(model)
  })

export default db
