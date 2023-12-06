import * as dotenv from 'dotenv';
import * as fs from 'fs';
import { join } from 'path';
import { DataSource, DataSourceOptions } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';

const entitiesPath = join(__dirname, '..', 'modules/**/*.entity{.ts,.js}');
const environment =
  (process.env.NODE_ENV !== 'test' && process.env.NODE_ENV) || 'development';
let dataEnv: any = null;
if (fs.existsSync(`.${environment}.env`)) {
  dataEnv = dotenv.parse(fs.readFileSync(`.${environment}.env`));
}
export const dataSourceOptions: DataSourceOptions & SeederOptions = {
  charset: 'utf8mb4_bin',
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
  migrations: ['dist/database/migrations/*{.ts,.js}'],
  seeds: ['src/database/seeds/**/main.seed{.ts,.js}'],
  factories: ['src/database/factories/**/main.seed{.ts,.js}'],
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
