import { Injectable } from '@nestjs/common';
import type { DeliveryType, Paginated, ProductSummary } from '@torba/shared';
import { PrismaService } from '../prisma/prisma.service.js';

type ProductRow = {
  id: string;
  slug: string;
  title: string;
  image: string;
  price: number;
  oldPrice: number | null;
  badge: string | null;
  deliveryType: DeliveryType;
  category: { id: string; slug: string; name: string };
  location: { name: string };
};

export function toProductSummary(row: ProductRow): ProductSummary {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    image: row.image,
    price: { amount: row.price, currency: 'UAH' },
    oldPrice: row.oldPrice === null ? null : { amount: row.oldPrice, currency: 'UAH' },
    category: { id: row.category.id, slug: row.category.slug, name: row.category.name },
    badge: row.badge,
    deliveryType: row.deliveryType,
    city: row.location.name,
    // No user accounts yet — favorites are always false.
    isFavorite: false,
  };
}

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) {}

  async getTrending(page: number, limit: number): Promise<Paginated<ProductSummary>> {
    const where = { isTrending: true };
    const [total, rows] = await Promise.all([
      this.prisma.product.count({ where }),
      this.prisma.product.findMany({
        where,
        orderBy: [{ trendScore: 'desc' }, { createdAt: 'desc' }, { id: 'asc' }],
        skip: (page - 1) * limit,
        take: limit,
        include: {
          category: { select: { id: true, slug: true, name: true } },
          location: { select: { name: true } },
        },
      }),
    ]);

    return {
      items: rows.map(toProductSummary),
      page,
      limit,
      total,
      hasMore: page * limit < total,
    };
  }
}
