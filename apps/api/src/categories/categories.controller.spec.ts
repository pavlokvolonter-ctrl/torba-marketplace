import { CategoriesController } from './categories.controller.js';

describe('CategoriesController', () => {
  it('delegates to the service', async () => {
    const service = {
      getTree: vi.fn().mockResolvedValue([{ id: 't' }]),
      getPopular: vi.fn().mockResolvedValue([{ id: 'p' }]),
    };
    const controller = new CategoriesController(service as never);

    expect(await controller.getTree()).toEqual([{ id: 't' }]);
    expect(await controller.getPopular()).toEqual([{ id: 'p' }]);
  });
});
