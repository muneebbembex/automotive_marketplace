import { IsNotEmpty, IsNumber, IsString, IsUUID, Length, Matches, Max, Min } from 'class-validator';

export class VehicleListingDto {
  @IsUUID()
  id: string;

  @IsNotEmpty()
  @IsString()
  @Length(2, 50)
  make: string;

  @IsNotEmpty()
  @IsString()
  @Matches(/^[A-Za-z0-9\s-]+$/, { message: 'Model contains invalid characters' })
  model: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Max(1000000)
  price: number;

  @IsUUID('4')
  dealerId: string;
}
