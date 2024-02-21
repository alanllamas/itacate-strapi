
module.exports = ({ env }) => {
  // console.group('database1 :');
  // console.log('DATABASE_HOST_PRODUCTION: ', env('DATABASE_HOST_PRODUCTION'));
  // console.log('DATABASE_PORT_PRODUCTION: ', env('DATABASE_PORT_PRODUCTION'));
  // console.log('DATABASE_NAME: ', env('DATABASE_NAME'));
  // console.log('DATABASE_USER_PRODUCTION: ', env('DATABASE_USER_PRODUCTION'));
  // console.log('DATABASE_PASS_PRODUCTION: ', env('DATABASE_PASS_PRODUCTION'));
  // console.log('DATABASE_SSL: ', env('DATABASE_SSL') === 'true');
  // console.groupEnd();
  return ({
    connection: {
      client: 'postgres',
      connection: {
        host: env('DATABASE_HOST_PRODUCTION'),
        port: env('DATABASE_PORT_PRODUCTION'),
        database: env('DATABASE_NAME'),
        user: env('DATABASE_USER_PRODUCTION'),
        password: env('DATABASE_PASS_PRODUCTION'),
        ssl: env('DATABASE_SSL') === 'true'
      },
    },
  })
};