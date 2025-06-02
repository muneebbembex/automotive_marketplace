import { User } from '@/user/entities/users.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

export enum ListingStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected',
}

@Entity()
export class VehicleListing {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  make: string;

  @Column()
  model: string;

  @Column()
  year: number;

  @Column('decimal')
  price: number;

  @Column({ type: 'enum', enum: ListingStatus, default: ListingStatus.PENDING })
  status: ListingStatus;

  @ManyToOne(() => User, (user) => user.listings)
  dealer: User;
}
