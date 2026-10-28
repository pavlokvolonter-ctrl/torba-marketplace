import { Injectable } from '@nestjs/common';
import type { Location } from '@torba/shared';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class LocationsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<Location[]> {
    const rows = await this.prisma.location.findMany({
      orderBy: [{ region: { sort: 'asc', nulls: 'first' } }, { name: 'asc' }],
    });
    return rows.map(({ id, name, region }) => ({ id, name, region }));
  }
}
