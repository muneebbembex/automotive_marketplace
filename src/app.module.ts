import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    ConfigModule.forRoot(),
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
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
