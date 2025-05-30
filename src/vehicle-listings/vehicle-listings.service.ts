import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VehicleListing, ListingStatus } from './entities/vehicle-listing.entity';

@Injectable()
export class VehicleListingsService {
  constructor(
    @InjectRepository(VehicleListing)
    private listingsRepo: Repository<VehicleListing>,
  ) { }

  async findPendingListings() {
    return this.listingsRepo.find({ where: { status: ListingStatus.PENDING }, relations: ['dealer'] });
  }

  async updateListingStatus(id: string, status: ListingStatus) {
    const listing = await this.listingsRepo.findOne({ where: { id } });
    if (!listing) throw new NotFoundException('Listing not found');
    listing.status = status;
    return this.listingsRepo.save(listing);
  }

  async findAll() {
    return this.listingsRepo.find({ relations: ['dealer'] });
  }
}
