require('@babel/register')({ cache: false })
require('@babel/polyfill')

const { serve } = require('./server')

serve()
