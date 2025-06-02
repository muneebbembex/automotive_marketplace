import { DataSource } from 'typeorm';
import { config } from 'dotenv';
import * as path from 'path';

config(); // Loads .env

export const AppDataSource = new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL,
  entities: [path.join(__dirname, '/**/*.entity.{ts,js}')],
  migrations: [path.join(__dirname, '/migrations/*.{ts,js}')],
  synchronize: process.env.NODE_ENV !== 'production', // Optional, keep in sync with app.module
});

