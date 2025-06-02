import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare, hash } from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/users.entity';
import { UsersService } from 'src/user/users.service';
import { RegisterAuthDto } from './dto/auth.dto';
import { UserToken } from '@/user/entities/user-token.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    @InjectRepository(UserToken)
    private userTokenRepository: Repository<UserToken>, // <--- Inject repo
  ) {}

  async validateUser(email: string, pass: string) {
    const user = await this.usersService.findByEmail(email);
    if (user && user.isActive && (await compare(pass, user.passwordHash))) {
      return user;
    }
    return null;
  }

  async login(user: User) {
    const payload = { email: user.email, sub: user.id, role: user.role };
    const token = this.jwtService.sign(payload);

    // Store the token in the DB
    await this.userTokenRepository.save({
      token,
      user,
      issuedAt: new Date(),
      expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 8), // 8 hours expiry (adjust if needed)
    });

    return {
      access_token: token,
    };
  }

  async register(body: RegisterAuthDto) {
    const role = body.role;
    const passwordHash = await hash(body.password, 10);
    return this.usersService.create({
      email: body.email,
      passwordHash,
      role,
      isActive: true,
    });
  }
}
