import { config } from 'dotenv'
import { resolve } from 'path'

const { NODE_ENV } = process.env
const envPath = resolve(__dirname, `.env${NODE_ENV !== 'production' ? `.${NODE_ENV}` : ''}`)

config({ path: envPath })

const IS_PROD = NODE_ENV === 'production'
const {
  MLAB_USER,
  MLAB_PASSWORD,
  MLAB_ENDPOINT,
  MLAB_DATABASE,
  API_PORT = (IS_PROD ? 80 : 3003)
} = process.env

const { DOMAIN = `${IS_PROD ? 'ingresse-backend-dev.now.sh' : 'localhost'}` } = process.env
const { APP_URL = `https://${DOMAIN}${API_PORT !== 80 ? `:${API_PORT}` : ''}` } = process.env

export {
  API_PORT,
  APP_URL,
  DOMAIN,
  IS_PROD,
  MLAB_USER,
  MLAB_PASSWORD,
  MLAB_ENDPOINT,
  MLAB_DATABASE,
  NODE_ENV
}

export default {
  API_PORT,
  APP_URL,
  DOMAIN,
  IS_PROD,
  MLAB_USER,
  MLAB_PASSWORD,
  MLAB_ENDPOINT,
  MLAB_DATABASE,
  NODE_ENV
}
