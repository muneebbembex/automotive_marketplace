import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { UserToken } from './user-token.entity';
import { VehicleListing } from '@/vehicle-listings/entities/vehicle-listing.entity';

export enum UserRole {
  ADMIN = 'admin',
  DEALER = 'dealer',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column({ default: '' })
  passwordHash: string;

  @Column({ type: 'enum', enum: UserRole })
  role: UserRole;

  @Column({ default: true })
  isActive: boolean;

  @OneToMany(() => VehicleListing, (listing) => listing.dealer)
  listings: VehicleListing[];


  @OneToMany(() => UserToken, token => token.user)
tokens: UserToken[];

}
