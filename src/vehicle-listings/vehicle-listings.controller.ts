import { Controller, Get, Patch, Param, Body, UseGuards } from '@nestjs/common';
import { VehicleListingsService } from './vehicle-listings.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { UserRole } from 'src/user/users.entity';
import { ListingStatus } from './entities/vehicle-listing.entity';

@Controller('admin/listings')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.ADMIN)
export class VehicleListingsController {
  constructor(private listingsService: VehicleListingsService) {}

  @Get('pending')
  async getPendingListings() {
    return this.listingsService.findPendingListings();
  }

  @Get()
  async getAllListings() {
    return this.listingsService.findAll();
  }

  @Patch(':id/status')
  async updateStatus(
    @Param('id') id: string,
    @Body('status') status: ListingStatus,
  ) {
    return this.listingsService.updateListingStatus(id, status);
  }
}
