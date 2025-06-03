import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './user/users.module';
import { VehicleListingsModule } from './vehicle-listings/vehicle-listings.module';
import { AdminDashboardModule } from './admin-dashboard/admin-dashboard.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        url: config.get<string>('DATABASE_URL'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: config.get<string>('NODE_ENV') !== 'production', // Only sync in dev!
      }),
    }),
    UsersModule,
    VehicleListingsModule,
    AdminDashboardModule,
    AuthModule,
  ],
})
export class AppModule {}
