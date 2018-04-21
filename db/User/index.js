import { Model } from 'mongorito'

import { cryptFields, create } from '../plugins'

export class User extends Model {
}

User.use(create)
User.use(cryptFields('password'))

export const players = async () => (await User.find()).map(p => p.get())

export const addPlayer = async ({ playerData }) => {
  const { username, email } = playerData
  const playerExists = (await User.findOne({ username })) || (await User.findOne({ email }))

  if (playerExists) {
    throw new Error('User already exists')
  }

  return User.create(playerData)
}

export default User
