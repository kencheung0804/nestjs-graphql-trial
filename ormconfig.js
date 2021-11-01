module.exports = {
  entities:
    process.env.NODE_ENV === 'development'
      ? ['**/*.entity.js']
      : ['**/*.entity.ts'],
  synchronize: process.env.NODE_ENV === 'development' || 'test',
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'nestjs_test',
  migrations: ['dist/db/migrations/*.js'],
  migrationsRun: true,
  cli: {
    migrationsDir: 'src/db/migrations',
  },
};
