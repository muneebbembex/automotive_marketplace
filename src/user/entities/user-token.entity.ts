import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  Index,
} from 'typeorm';
import { User } from './users.entity';

@Entity()
export class UserToken {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Index()
  @Column()
  token: string;

  @ManyToOne(() => User, user => user.tokens, { onDelete: 'CASCADE' })
  user: User;

  @CreateDateColumn()
  issuedAt: Date;

  @Column({ nullable: true })
  expiresAt?: Date;

  @Column({ default: false })
  revoked: boolean;
}
