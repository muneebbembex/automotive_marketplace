import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { VehicleListingsService } from './vehicle-listings.service';
import { UserRole } from '@/user/entities/users.entity';
import { JwtAuthGuard } from '@/auth/jwt-auth.guard';
import { RolesGuard } from '@/auth/roles.guard';
import { Roles } from '@/auth/roles.decorator';
import { VehicleListingDto } from '@/vehicle-listings/dto/vehicle-listings.dto';

@Controller('admin/listings')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.ADMIN)
export class VehicleListingsController {
  constructor(private listingsService: VehicleListingsService) {}

  @Get()
  async getAll(): Promise<VehicleListingDto[]> {
    return this.listingsService.findAll();
  }
  @Get(':id')
  async getOne(@Param('id') id: string): Promise<VehicleListingDto> {
    return this.listingsService.findOne(id);
  }
}
