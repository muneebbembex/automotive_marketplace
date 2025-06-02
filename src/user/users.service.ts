import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, UserRole } from './entities/users.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private usersRepo: Repository<User>) { }


  // All
  async findAll(): Promise<User[]> {
    return this.usersRepo.find();
  }
  async findAllDealers(): Promise<User[]> {
    return this.usersRepo.find({ where: { role: UserRole.DEALER } });
  }
  async findAllUsers(): Promise<User[]> {
    return this.usersRepo.find({ where: { role: UserRole.ADMIN } });
  }


  // By Id or Email
  async findByEmail(email: string): Promise<User | null> {
    return this.usersRepo.findOne({ where: { email }});
  }
  async findById(id: string): Promise<User | null> {
    return this.usersRepo.findOne({ where: { id } });
  }
  async findDealerById(id: string, role: UserRole.DEALER): Promise<User | null> {
    return this.usersRepo.findOne({ where: { id, role } });
  }
  async findUserById(id: string, role: UserRole.ADMIN): Promise<User | null> {
    return this.usersRepo.findOne({ where: { id, role } });
  }

  // Create
  async create(user: Partial<User>): Promise<User> {
    const newUser = this.usersRepo.create(user);
    return this.usersRepo.save(newUser);
  }

  // Update
  async setDealerStatus(id: string, isActive: boolean): Promise<User> {
    const user = await this.usersRepo.findOne({ where: { id, role: UserRole.DEALER } });
    if (!user) throw new NotFoundException('Dealer not found');
    user.isActive = isActive;
    return this.usersRepo.save(user);
  }
  async updateUser(id: string, userData: Partial<User>): Promise<User> {
    const user = await this.usersRepo.findOne({ where: { id } });
    if (!user) throw new NotFoundException('User not found');
    Object.assign(user, userData);
    return this.usersRepo.save(user);
  }

  // Delete
  async DeleteUser(id: string): Promise<void> {
    const user = await this.usersRepo.findOne({ where: { id } });
    if (!user) throw new NotFoundException('User not found');
    await this.usersRepo.remove(user);
  }
}