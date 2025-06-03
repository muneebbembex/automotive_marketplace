import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VehicleListing } from './entities/vehicle-listing.entity';
import { VehicleListingDto } from '@/vehicle-listings/dto/vehicle-listings.dto';

@Injectable()
export class VehicleListingsService {
  constructor(
    @InjectRepository(VehicleListing)
    private listingsRepo: Repository<VehicleListing>,
  ) {}

  async findAll(): Promise<VehicleListingDto[]> {
    const listings = await this.listingsRepo.find({ relations: ['dealer'] });
    if (!listings || listings.length === 0) {
      throw new NotFoundException('No vehicle listings found');
    }

    return listings.map(this.toDto);
  }

  async findOne(id: string): Promise<VehicleListingDto> {
    const listing = await this.listingsRepo.findOne({
      where: { id },
      relations: ['dealer'],
    });

    if (!listing) {
      throw new NotFoundException(`Vehicle with ID ${id} not found`);
    }

    return this.toDto(listing);
  }

  async create(listing: VehicleListing): Promise<VehicleListingDto> {
    const newListing = this.listingsRepo.create(listing);
    const savedListing = await this.listingsRepo.save(newListing);
    return this.toDto(savedListing);
  }
  async update(id: string, listing: Partial<VehicleListing>): Promise<VehicleListingDto> {
    const existingListing = await this.listingsRepo.findOne({ where: { id } });
    if (!existingListing) {
      throw new NotFoundException(`Vehicle with ID ${id} not found`);
    }
    const updatedListing = Object.assign(existingListing, listing);
    const savedListing = await this.listingsRepo.save(updatedListing);
    return this.toDto(savedListing);
  }

  private toDto = (listing: VehicleListing): VehicleListingDto => ({
    id: listing.id,
    make: listing.make,
    model: listing.model,
    price: listing.price,
    dealerId: listing.dealer.id,
  });
}
