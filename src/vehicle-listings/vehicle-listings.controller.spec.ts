import { Test, TestingModule } from '@nestjs/testing';
import { VehicleListingsController } from './vehicle-listings.controller';
import { VehicleListingsService } from './vehicle-listings.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { VehicleListing } from './entities/vehicle-listing.entity';

describe('VehicleListingsController', () => {
  let controller: VehicleListingsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VehicleListingsController],
      providers: [
        VehicleListingsService,
        { provide: getRepositoryToken(VehicleListing), useValue: {} },
      ],
    }).compile();

    controller = module.get<VehicleListingsController>(
      VehicleListingsController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
