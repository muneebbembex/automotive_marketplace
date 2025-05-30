import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, UserRole } from './users.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private usersRepo: Repository<User>) { }

  async findAllDealers(): Promise<User[]> {
    return this.usersRepo.find({ where: { role: UserRole.DEALER } });
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.usersRepo.findOne({ where: { email } });
  }

  async findById(id: string): Promise<User | null> {
    return this.usersRepo.findOne({ where: { id } });
  }

  async create(user: Partial<User>): Promise<User> {
    const newUser = this.usersRepo.create(user);
    return this.usersRepo.save(newUser);
  }

  async setDealerStatus(id: string, isActive: boolean): Promise<User> {
    const user = await this.usersRepo.findOne({ where: { id, role: UserRole.DEALER } });
    if (!user) throw new NotFoundException('Dealer not found');
    user.isActive = isActive;
    return this.usersRepo.save(user);
  }
}