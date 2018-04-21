import { ActionTypes } from 'mongorito'
import { genSaltSync, hashSync } from 'bcryptjs'

const salt = genSaltSync()
const { SAVE, REFRESHED } = ActionTypes

export const crypt = x => hashSync(x, salt)

export const cryptFields = (...fieldsToCrypt) => () => ({ dispatch, getState }) => next => action => {
  const { type, fields } = action
  if (type === SAVE) {
    if (!getState().fields._id) {
      Object.keys(fields)
        .map((k) => {
          if (fieldsToCrypt.includes(k)) {
            fields[k] = crypt(fields[k])
          }
        })
      dispatch({ type: REFRESHED, fields })
    }
    return next(action)
  }
  return next(action)
}

export default cryptFields
