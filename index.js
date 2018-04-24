require('@babel/register')({ cache: false })
require('@babel/polyfill')
const { IS_PROD, API_PORT, APP_URL } = require('./env')

const { serve } = require('./server')

serve(IS_PROD, API_PORT, APP_URL)
