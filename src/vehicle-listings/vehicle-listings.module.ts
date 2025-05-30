import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VehicleListing} from './entities/vehicle-listing.entity';
import { VehicleListingsService } from './vehicle-listings.service';
import { VehicleListingsController } from './vehicle-listings.controller';

@Module({
  imports: [TypeOrmModule.forFeature([VehicleListing])],
  providers: [VehicleListingsService],
  controllers: [VehicleListingsController],
  exports: [VehicleListingsService],
})
export class VehicleListingsModule {}
