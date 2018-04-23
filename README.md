# Ingresse Backend Dev Test

> Backend dev test for [Ingresse](https://www.ingresse.com/)

## Installing

## System dependencies

In order to install and run locally the project you'll need to have the following dependencies installed on your machine:

- [MongoDB](https://www.mongodb.com/) version `3.4.1` or latest
- [NodeJS](https://nodejs.org/en/) version `9.9.0` or latest

Optionally you can have:

- [Yarn](https://yarnpkg.com/en/) version `1.5.1` or latest
  - allows for faster/better dependencies installation/management

### Project dependencies

To install the project dependencies you have to run the command:

> If you have just installed `Node` without `Yarn`
```sh
$ npm install
```

> Or if you have installed `yarn`
```sh
$ yarn
```

### Database configuration

You'll have to configure the apropriate [databases and users](https://docs.mongodb.com/manual/reference/method/db.createUser/#create-user-with-roles) for the environment which you intent to use.
Ensure the users have at least `"readWrite"` permissions.

As well as securely setting the environment variables within the `.env.*` files as indicated below.

Example:
```sh
$ mongo
> use <DB_NAME>

> db.createUser({ user: "<DB_USER>", pwd: "<DB_PASSWORD>", roles: ["readWrite"] })
```

### Local environment configuration

Before running your project your environment should have some variables set in order to run.

The variables are listed below, and we recommend you to have a `.env` file in the project root folder that will be loaded automatically.

You may have other `.env.<NODE_ENV>` files in the project root where `<NODE_ENV>` is the same as the value for `NODE_ENV` environment variable, like `production`, `test` or `development`. This will tell the project which environment you want to run.

Example `.env.production`:
```sh
MLAB_USER='<DB_USER>'
MLAB_PASSWORD='<DB_PASSWORD>'
MLAB_ENDPOINT='ingresse.lvh.me'
MLAB_DATABASE='ingresse-prod'
API_PORT=3000
```

Example `.env.development`:
```sh
MLAB_USER='<DB_USER>'
MLAB_PASSWORD='<DB_PASSWORD>'
MLAB_ENDPOINT='localhost'
MLAB_DATABASE='ingresse-dev'
API_PORT=3001
```

Example `.env.test`:
```sh
MLAB_USER='<DB_USER>'
MLAB_PASSWORD='<DB_PASSWORD>'
MLAB_ENDPOINT='localhost'
MLAB_DATABASE='ingresse-test'
API_PORT=3002
```

## SSL error on localhost

This project uses a Self-signed certificate to run over https locally and your browser will probably complain and not trust it as secure.
You may ignore the warning and allow the access over your local development machine.

But while on production you should set up your server with your own certificate possibly behind a proxy server and/or load balancer properly configured.

## Publishing

### Via DOCKER
> WIP <!-- TODO: make DOCKERFILE and write instructions -->

### Via [NOW](https://zeit.co/now)

To publish via the [NOW](https://zeit.co/now) service you may use this button [![Deploy to now](https://deploy.now.sh/static/button.svg)](https://deploy.now.sh/?repo=https://github.com/wescoder/ingresse-backend-dev).

Or if you prefer you can publish it manually via [`now-cli`](https://zeit.co/docs/features/now-cli)

#### Production environment configuration

Before publishing via NOW you'll have to set up the environment variables for production as instructed [above](#Local_environment_configuration).
If you already have a `.env.production` config file, it will be uploaded with the `now` build, if not you will have to create one.

## License

> This project is licensed under the [MIT](https://opensource.org/licenses/MIT) license
