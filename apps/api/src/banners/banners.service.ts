import { Injectable } from '@nestjs/common';
import type { Banner } from '@torba/shared';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class BannersService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<Banner[]> {
    const rows = await this.prisma.banner.findMany({
      where: { isActive: true },
      orderBy: { order: 'asc' },
    });
    return rows.map((b) => ({
      id: b.id,
      title: b.title,
      text: b.text,
      imageUrl: b.imageUrl,
      ctaLabel: b.ctaLabel,
      href: b.href,
      order: b.order,
      isFeatured: b.isFeatured,
    }));
  }
}
