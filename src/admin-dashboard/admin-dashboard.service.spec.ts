import { Test, TestingModule } from '@nestjs/testing';
import { AdminDashboardService } from './admin-dashboard.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from 'src/user/entities/users.entity';
import { VehicleListing } from 'src/vehicle-listings/entities/vehicle-listing.entity';

describe('AdminDashboardService', () => {
  let service: AdminDashboardService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AdminDashboardService,
        { provide: getRepositoryToken(User), useValue: {} },
        { provide: getRepositoryToken(VehicleListing), useValue: {} },
      ],
    }).compile();

    service = module.get<AdminDashboardService>(AdminDashboardService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
