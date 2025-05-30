import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  ListingStatus,
  VehicleListing,
} from './entities/vehicle-listing.entity';
import { VehicleListingsService } from './vehicle-listings.service';

const mockListingRepository = () => ({
  find: jest.fn(),
  findOne: jest.fn(),
  save: jest.fn(),
  count: jest.fn(),
});

describe('VehicleListingsService', () => {
  let service: VehicleListingsService;
  let repo: Repository<VehicleListing>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        VehicleListingsService,
        {
          provide: getRepositoryToken(VehicleListing),
          useFactory: mockListingRepository,
        },
      ],
    }).compile();

    service = module.get<VehicleListingsService>(VehicleListingsService);
    repo = module.get<Repository<VehicleListing>>(
      getRepositoryToken(VehicleListing),
    );
  });

  it('should find pending listings', async () => {
    const listings = [{ id: '1', status: ListingStatus.PENDING }];
    jest.spyOn(repo, 'find').mockResolvedValue(listings as any);
    expect(await service.findPendingListings()).toEqual(listings);
  });

  it('should update listing status', async () => {
    const listing = { id: '1', status: ListingStatus.PENDING };
    jest.spyOn(repo, 'findOne').mockResolvedValue(listing);
    jest.spyOn(repo, 'save').mockImplementation((l) => Promise.resolve(l));

    const updated = await service.updateListingStatus(
      '1',
      ListingStatus.APPROVED,
    );
    expect(updated.status).toBe(ListingStatus.APPROVED);
  });

  it('should throw if listing not found in updateListingStatus', async () => {
    jest.spyOn(repo, 'findOne').mockResolvedValue(null);
    await expect(
      service.updateListingStatus('nonexistent', ListingStatus.APPROVED),
    ).rejects.toThrow();
  });
});
