module.exports = {
  apps: [
    {
      name: 'ingresse-backend-dev',
      script: './index.js',
      env: {
        NODE_ENV: 'development',
        BABEL_DISABLE_CACHE: 1
      },
      node_args: [
        '--inspect'
      ],
      watch: [
        './db',
        './server',
        './*.js'
      ]
    }
  ]
}
