import { IsNotEmpty, IsNumber, IsEnum } from 'class-validator';
import { ListingStatus } from '../entities/vehicle-listing.entity';

export class CreateVehicleListingDto {
  @IsNotEmpty()
  make: string;

  @IsNotEmpty()
  model: string;

  @IsNumber()
  year: number;

  @IsNumber()
  price: number;

  @IsEnum(ListingStatus)
  status?: ListingStatus; // optional, defaults to pending
}
