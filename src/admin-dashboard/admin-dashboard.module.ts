import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminDashboardService } from './admin-dashboard.service';
import { AdminDashboardController } from './admin-dashboard.controller';
import { User } from 'src/user/entities/users.entity';
import { VehicleListing } from 'src/vehicle-listings/entities/vehicle-listing.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, VehicleListing])],
  providers: [AdminDashboardService],
  controllers: [AdminDashboardController],
})
export class AdminDashboardModule {}
