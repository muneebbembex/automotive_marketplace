import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateVehicleListingDto {
  @IsNotEmpty()
  make: string;

  @IsNotEmpty()
  model: string;

  @IsNumber()
  year: number;

  @IsNumber()
  price: number;
}
