import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { User } from '../users/user.entity';

export enum StepSource {
  MANUAL = 'manual',
  APPLE_HEALTH = 'apple_health',
  GOOGLE_FIT = 'google_fit',
}

@Entity('step_entries')
@Unique(['user', 'date'])
export class StepEntry {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  /** Calendar day this entry covers (YYYY-MM-DD). */
  @Column({ type: 'date' })
  date: string;

  @Column({ type: 'int' })
  steps: number;

  @Column({ type: 'enum', enum: StepSource, default: StepSource.MANUAL })
  source: StepSource;

  @CreateDateColumn()
  createdAt: Date;
}
