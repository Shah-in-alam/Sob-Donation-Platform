import { Controller, Get, Param, ParseUUIDPipe } from '@nestjs/common';
import { ClubsService } from './clubs.service';

@Controller('clubs')
export class ClubsController {
  constructor(private readonly clubs: ClubsService) {}

  @Get()
  findAll() {
    return this.clubs.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.clubs.findById(id);
  }
}
