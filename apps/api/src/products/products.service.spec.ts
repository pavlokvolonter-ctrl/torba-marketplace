import { ProductsController } from './products.controller.js';
import { ProductsService, toProductSummary } from './products.service.js';

const row = (id: string, oldPrice: number | null = null) => ({
  id,
  slug: `slug-${id}`,
  title: `Title ${id}`,
  image: 'img',
  price: 100,
  oldPrice,
  badge: 'Новинка',
  deliveryType: 'NOVA_POSHTA' as const,
  category: { id: 'c', slug: 'furniture', name: 'Меблі' },
  location: { name: 'Київ' },
});

describe('toProductSummary', () => {
  it('maps prices to Money, flattens city and defaults isFavorite to false', () => {
    expect(toProductSummary(row('1', 150))).toEqual({
      id: '1',
      slug: 'slug-1',
      title: 'Title 1',
      image: 'img',
      price: { amount: 100, currency: 'UAH' },
      oldPrice: { amount: 150, currency: 'UAH' },
      category: { id: 'c', slug: 'furniture', name: 'Меблі' },
      badge: 'Новинка',
      deliveryType: 'NOVA_POSHTA',
      city: 'Київ',
      isFavorite: false,
    });
  });

  it('keeps oldPrice null when there is no discount', () => {
    expect(toProductSummary(row('1')).oldPrice).toBeNull();
  });
});

describe('ProductsService.getTrending', () => {
  const count = vi.fn();
  const findMany = vi.fn();
  const service = new ProductsService({ product: { count, findMany } } as never);

  beforeEach(() => {
    count.mockReset();
    findMany.mockReset();
  });

  it('paginates with skip/take and reports hasMore', async () => {
    count.mockResolvedValue(20);
    findMany.mockResolvedValue([row('1'), row('2')]);

    const result = await service.getTrending(2, 8);

    expect(findMany).toHaveBeenCalledWith(expect.objectContaining({ skip: 8, take: 8 }));
    expect(result).toMatchObject({ page: 2, limit: 8, total: 20, hasMore: true });
    expect(result.items).toHaveLength(2);
  });

  it('hasMore is false on the last page', async () => {
    count.mockResolvedValue(16);
    findMany.mockResolvedValue([]);

    expect((await service.getTrending(2, 8)).hasMore).toBe(false);
  });
});

describe('ProductsController', () => {
  it('passes page and limit from the query', async () => {
    const getTrending = vi.fn().mockResolvedValue({ items: [] });
    const controller = new ProductsController({ getTrending } as never);

    await controller.getTrending({ page: 3, limit: 4 });

    expect(getTrending).toHaveBeenCalledWith(3, 4);
  });
});
