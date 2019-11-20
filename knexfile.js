// Update with your config settings.

module.exports = {

  development: {
    client: 'pg',
    connection: 'postgres://localhost/forecast',
    migrations: {
      directory: './db/migrations'
    },
    seeds: {
      directory: './db/seeds/dev'
    },
    useNullAsDefault: true
  },
  test: {
    client: 'pg',
    connection: 'postgres://localhost/forecast_test',
    migrations: {
      directory: './db/migrations'
    },
    useNullAsDefault: true
  },
  production: {
    client: 'pg',
    connection: 'https://express-weather-forecast.herokuapp.com/',
    migrations: {
      directory: './db/migrations'
    },
    useNullAsDefault: true
  }
};
