import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Club } from '../clubs/club.entity';

export enum MembershipStatus {
  INACTIVE = 'inactive',
  ACTIVE = 'active',
  CANCELED = 'canceled',
}

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column({ name: 'password_hash' })
  passwordHash: string;

  @Column()
  name: string;

  @ManyToOne(() => Club, (club) => club.supporters, {
    nullable: true,
    eager: true,
  })
  @JoinColumn({ name: 'favorite_club_id' })
  favoriteClub: Club | null;

  @Column({
    type: 'enum',
    enum: MembershipStatus,
    default: MembershipStatus.INACTIVE,
  })
  membershipStatus: MembershipStatus;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
