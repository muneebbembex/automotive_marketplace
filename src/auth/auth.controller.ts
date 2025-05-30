import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginAuthDto, RegisterAuthDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() body: LoginAuthDto) {
    const user = await this.authService.validateUser(body.email, body.password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return this.authService.login(user);
  }
  @Post('register')
  async register(@Body() body: RegisterAuthDto) {
    const user = await this.authService.register(body);
    if (!user) {
      throw new UnauthorizedException('Registration failed');
    }
    return { message: 'User registered successfully', user };
  }
}
