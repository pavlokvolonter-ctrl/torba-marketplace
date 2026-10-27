import { Injectable } from '@nestjs/common';
import type { Category, PopularCategory } from '@torba/shared';
import { PrismaService } from '../prisma/prisma.service.js';

type CategoryRow = {
  id: string;
  slug: string;
  name: string;
  icon: string | null;
  parentId: string | null;
};

/** Builds the category tree from a flat, pre-sorted list. */
export function buildCategoryTree(rows: CategoryRow[]): Category[] {
  const nodes = new Map<string, Category>(
    rows.map((r) => [r.id, { id: r.id, slug: r.slug, name: r.name, icon: r.icon, children: [] }]),
  );
  const roots: Category[] = [];
  for (const row of rows) {
    const node = nodes.get(row.id)!;
    const parent = row.parentId ? nodes.get(row.parentId) : undefined;
    (parent ? parent.children : roots).push(node);
  }
  return roots;
}

@Injectable()
export class CategoriesService {
  constructor(private readonly prisma: PrismaService) {}

  async getTree(): Promise<Category[]> {
    const rows = await this.prisma.category.findMany({
      orderBy: [{ order: 'asc' }, { name: 'asc' }],
    });
    return buildCategoryTree(rows);
  }

  async getPopular(): Promise<PopularCategory[]> {
    const rows = await this.prisma.category.findMany({
      where: { isPopular: true },
      orderBy: [{ order: 'asc' }, { name: 'asc' }],
    });
    return rows.map(({ id, slug, name, icon }) => ({ id, slug, name, icon }));
  }
}
