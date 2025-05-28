import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,   // inject JwtService
  ) {}

  // Create User
  // async create(createUserDto: CreateUserDto): Promise<User> {
  //   const user = this.userRepository.create(createUserDto);
  //   return this.userRepository.save(user);
  // }
   async create(createUserDto: CreateUserDto): Promise<{ user: User; token: string }> {
    const user = this.userRepository.create(createUserDto);
    await this.userRepository.save(user);

    // Prepare payload for JWT
    const payload = { username: user.username, sub: user.id };

    // Generate token
    const token = this.jwtService.sign(payload);

    // Return user data along with JWT token
    return { user, token };
  }

  // Get All Users
  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  // Get User by ID
  async findOne(id): Promise<User> {
    const user = await this.userRepository.findOne(id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  // Update User
  async update(id, updateUserDto: CreateUserDto): Promise<User> {
    const user = await this.userRepository.findOne(id);

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    await this.userRepository.update(id, updateUserDto);

    // Find the updated user
    const updatedUser = await this.userRepository.findOne(id);
    if (!updatedUser) {
      throw new NotFoundException(`User with ID ${id} not found after update`);
    }

    return updatedUser;
  }

  // Delete User
  async remove(id: number): Promise<void> {
    const result = await this.userRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
  }
}
