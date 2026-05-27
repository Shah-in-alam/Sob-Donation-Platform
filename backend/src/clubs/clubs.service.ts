import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Club } from './club.entity';

const DEFAULT_CLUBS = [
  'Antwerp',
  'Brussels',
  'Ghent',
  'Bruges',
  'Leuven',
  'Liège',
  'Charleroi',
  'Namur',
  'Hasselt',
  'Mechelen',
];

@Injectable()
export class ClubsService implements OnModuleInit {
  constructor(
    @InjectRepository(Club) private readonly clubs: Repository<Club>,
  ) {}

  async onModuleInit(): Promise<void> {
    await this.seedDefaults();
  }

  findAll(): Promise<Club[]> {
    return this.clubs.find({ order: { name: 'ASC' } });
  }

  async findById(id: string): Promise<Club> {
    const club = await this.clubs.findOne({ where: { id } });
    if (!club) {
      throw new NotFoundException('Club not found');
    }
    return club;
  }

  /** Seed a starter set of clubs the first time the app runs. */
  private async seedDefaults(): Promise<void> {
    const count = await this.clubs.count();
    if (count > 0) {
      return;
    }
    await this.clubs.save(
      DEFAULT_CLUBS.map((name) => this.clubs.create({ name })),
    );
  }
}
