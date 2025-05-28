import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
     ConfigModule.forRoot(),
    JwtModule.register({
      secret: process.env.JWT_SECRET, // move this to env variables in production!
      signOptions: { expiresIn: '24h' },
    }),
  ],  // Add this line to include User repository
  providers: [UserService],
  controllers: [UserController]
})
export class UserModule { }
