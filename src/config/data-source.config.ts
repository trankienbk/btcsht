import * as dotenv from 'dotenv';
import * as fs from 'fs';
import { join } from 'path';
import { DataSource, DataSourceOptions } from 'typeorm';
import {
  MARIA_DB_CONNECTION,
  MONGO_DB_CONNECTION,
} from '../common/constants/db.constants';

const entitiesPath = join(
  __dirname,
  '..',
  'modules/sys',
  '/**/*.entity{.ts,.js}',
);
const entitiesPathMongo = join(
  __dirname,
  '..',
  '/modules/log',
  '/**/*.entity{.ts,.js}',
);

const environment =
  (process.env.NODE_ENV !== 'test' && process.env.NODE_ENV) || 'development';
let dataEnv: any = null;
if (fs.existsSync(`.${environment}.env`)) {
  dataEnv = dotenv.parse(fs.readFileSync(`.${environment}.env`));
}
export const dataSourceOptions: DataSourceOptions = {
  name: MARIA_DB_CONNECTION,
  charset: 'utf8mb4_unicode_ci',
  type: dataEnv?.DATABASE_TYPE || process.env.DATABASE_TYPE,
  host: dataEnv?.DATABASE_HOST || process.env.DATABASE_HOST,
  port:
    parseInt(dataEnv?.DATABASE_PORT, 10) || parseInt(process.env.DATABASE_PORT),
  username: dataEnv?.DATABASE_USER || process.env.DATABASE_USER,
  password: dataEnv?.DATABASE_PASSWORD || process.env.DATABASE_PASSWORD,
  database: dataEnv?.DATABASE_NAME || process.env.DATABASE_NAME,
  entities: [entitiesPath],
  synchronize: false,
  logging: ['error'],
  migrations: ['dist/migrations/*{.ts,.js}'],
};

export const mongodbDataSourceOptions: DataSourceOptions = {
  name: MONGO_DB_CONNECTION,
  type: dataEnv?.DATABASE2_TYPE || process.env.DATABASE2_TYPE,
  port:
    parseInt(dataEnv?.DATABASE2_PORT, 10) ||
    parseInt(process.env.DATABASE2_PORT),
  database: dataEnv?.DATABASE2_NAME || process.env.DATABASE2_NAME,
  url: dataEnv.URL_STRING_MONGO_DB || process.env.URL_STRING_MONGO_DB,
  entities: [entitiesPathMongo],
  synchronize: true,
};

export const dataSource = new DataSource(dataSourceOptions);
