import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from 'src/user/users.module';
import { AdminDashboardModule } from './admin-dashboard/admin-dashboard.module';
import { AuthModule } from './auth/auth.module';
import { VehicleListingsModule } from './vehicle-listings/vehicle-listings.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // makes ConfigModule available across the app without re-import
    }),
    TypeOrmModule.forRoot({
      type: process.env.DATABASE as 'postgres' | 'mongodb', // specify your DB type
      host: process.env.DB_HOST, // use your DB host
      port: Number(process.env.DB_PORT), // use your DB port
      username: process.env.DB_USER, // use your DB credentials
      password: process.env.DB_PASSWORD, // use your DB credentials
      database: process.env.DB_NAME, // the name of your database
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true, // set to false for production
    }),
    UsersModule,
    VehicleListingsModule,
    AdminDashboardModule,
    AuthModule,
  ],
})
export class AppModule { }
