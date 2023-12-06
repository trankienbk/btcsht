import { TypeOrmModuleOptions } from '@nestjs/typeorm';

const databaseConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '12345678',
  database: 'giaothongv3',
  entities: ['dist/**/*.entity{.ts,.js}', 'src/**/*.entity{.ts,.js}'],
  migrations: [
    'src/database/migrations/*.ts',
    'dist/database/migrations/*{.ts,.js}',
  ],
  synchronize: false,
};
export = databaseConfig;
