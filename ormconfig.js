module.exports = {
  entities:
    process.env.NODE_ENV === 'development'
      ? ['**/*.entity.js']
      : ['**/*.entity.ts'],
  synchronize: process.env.NODE_ENV === 'development' || 'test',
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'username',
  password: 'password',
  database: 'nestjs_test',
  migrations: ['dist/db/migrations/*.js'],
  migrationsRun: true,
  cli: {
    migrationsDir: 'src/db/migrations',
  },
};
