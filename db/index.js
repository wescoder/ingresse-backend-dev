import { Database } from 'mongorito'
import timestamps from 'mongorito-timestamps'

import User from './User'

import { MLAB_USER, MLAB_PASSWORD, MLAB_ENDPOINT, MLAB_DATABASE } from '../env'

export const models = {
  User
}

export const connect = async (dbName = MLAB_DATABASE) => {
  const db = new Database(`mongodb://${MLAB_USER}:${MLAB_PASSWORD}@${MLAB_ENDPOINT}/${dbName}`)
  Object.values(models)
    .forEach((model) => {
      model.use(timestamps({
        createdAt: 'createdAt',
        updatedAt: 'updatedAt'
      }))
      db.register(model)
    })
  await db.connect()
  return db
}

export default connect
