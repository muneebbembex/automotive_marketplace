import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User, UserRole } from 'src/user/entities/users.entity';
import { VehicleListing } from 'src/vehicle-listings/entities/vehicle-listing.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AdminDashboardService {
  constructor(
    @InjectRepository(User) private usersRepo: Repository<User>,
    @InjectRepository(VehicleListing) private listingsRepo: Repository<VehicleListing>,
  ) {}

  async getSummary() {
    const totalDealers = await this.usersRepo.count({ where: { role: UserRole.DEALER } });
    const totalListings = await this.listingsRepo.count();

    return {
      totalDealers,
      totalListings,
    };
  }
}
