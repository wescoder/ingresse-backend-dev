import { Model } from 'mongorito'

import { cryptFields, create as createPlugin } from '../plugins'

export class User extends Model {
}

User.use(createPlugin)
User.use(cryptFields('password'))

export const list = async () => {
  const list = await User.find()
  return list.map(p => p.get())
}

export const find = async ({ username }) => {
  const user = await User.findOne({ username })
  return user.get()
}

export const create = async ({ userData }) => {
  const { username, email } = userData
  const userExists = (await User.findOne({ username })) || (await User.findOne({ email }))

  if (userExists) {
    throw new Error('User already exists')
  }

  return User.create(userData)
}

export default User
