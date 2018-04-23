import { Model } from 'mongorito'

import { cryptFields, json } from '../plugins'

export class User extends Model {
}

User.use(json)
User.use(cryptFields('password'))

export const list = async () => {
  const list = await User.find()
  return list.map(async p => p && p.json())
}

export const find = async ({ username }) => {
  const user = await User.findOne({ username })
  return user && user.json()
}

export const create = async ({ userData }) => {
  const { username, email } = userData
  const userExists = (await User.findOne({ username })) || (await User.findOne({ email }))

  if (userExists) {
    throw new Error('User already exists')
  }

  const user = new User(userData)
  await user.save()
  return user && user.json()
}

export const remove = async ({ username }) => {
  return User.remove({ username })
}

export default User
