/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare, hash } from 'bcrypt';
import { User } from 'src/user/users.entity';
import { UsersService } from 'src/user/users.service';
import { RegisterAuthDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string) {
    const user = await this.usersService.findByEmail(email);
    if (user && user.isActive && (await compare(pass, user.passwordHash))) {
      return user;
    }
    return null;
  }

  login(user: User) {
    const payload = { email: user.email, sub: user.id, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(body: RegisterAuthDto) {
    // Default role for self-registration
    const role = body.role;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const passwordHash = await hash(body.password, 10);
    return this.usersService.create({
      email: body.email,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      passwordHash,
      role,
      isActive: true,
    });
  }
}
