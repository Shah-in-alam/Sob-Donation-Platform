import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Club } from '../clubs/club.entity';
import { MembershipStatus, User } from './user.entity';

interface CreateUserInput {
  email: string;
  passwordHash: string;
  name: string;
  favoriteClub: Club | null;
}

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly users: Repository<User>,
  ) {}

  findByEmail(email: string): Promise<User | null> {
    return this.users.findOne({ where: { email } });
  }

  findById(id: string): Promise<User | null> {
    return this.users.findOne({ where: { id } });
  }

  create(input: CreateUserInput): Promise<User> {
    const user = this.users.create(input);
    return this.users.save(user);
  }

  async updateMembershipStatus(
    userId: string,
    status: MembershipStatus,
  ): Promise<User> {
    const user = await this.findById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    user.membershipStatus = status;
    return this.users.save(user);
  }
}
