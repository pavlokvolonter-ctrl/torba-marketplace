import { BannersController } from './banners.controller.js';
import { BannersService } from './banners.service.js';

const dbRow = {
  id: '1',
  title: 'Holiday',
  text: null,
  imageUrl: 'img',
  ctaLabel: 'Go',
  href: '/x',
  order: 1,
  isFeatured: true,
  isActive: true,
};

describe('BannersService', () => {
  it('returns active banners ordered by order, without internal fields', async () => {
    const findMany = vi.fn().mockResolvedValue([dbRow]);
    const service = new BannersService({ banner: { findMany } } as never);

    const result = await service.findAll();

    expect(findMany).toHaveBeenCalledWith({ where: { isActive: true }, orderBy: { order: 'asc' } });
    expect(result[0]).not.toHaveProperty('isActive');
    expect(result[0]).toMatchObject({ id: '1', title: 'Holiday', isFeatured: true, order: 1 });
  });

  it('controller delegates to the service', async () => {
    const service = { findAll: vi.fn().mockResolvedValue([]) };
    expect(await new BannersController(service as never).findAll()).toEqual([]);
  });
});
