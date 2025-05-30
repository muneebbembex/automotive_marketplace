import { IsEnum } from 'class-validator';
import { ListingStatus } from '../entities/vehicle-listing.entity';

export class UpdateListingStatusDto {
  @IsEnum(ListingStatus)
  status: ListingStatus;
}
