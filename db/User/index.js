import { Model } from 'mongorito'

import { cryptFields, json, create as createPlugin } from '../plugins'

export class User extends Model {
}

User.use(json)
User.use(createPlugin)
User.use(cryptFields('password'))

export const list = async () => {
  const list = await User.find()
  return list.map(async p => p.json())
}

export const find = async ({ username }) => {
  const user = await User.findOne({ username })
  return user.json()
}

export const create = async ({ userData }) => {
  const { username, email } = userData
  const userExists = (await User.findOne({ username })) || (await User.findOne({ email }))

  if (userExists) {
    throw new Error('User already exists')
  }

  return User.create(userData)
}

export const remove = async ({ username }) => {
  return User.remove({ username })
}

export default User
