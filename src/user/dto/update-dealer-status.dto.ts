import { IsBoolean } from 'class-validator';

export class UpdateDealerStatusDto {
  @IsBoolean()
  isActive: boolean;
}
