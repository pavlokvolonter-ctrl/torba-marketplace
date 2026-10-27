import { LocationsController } from './locations.controller.js';
import { LocationsService } from './locations.service.js';

describe('LocationsService', () => {
  it('maps rows to the Location contract', async () => {
    const findMany = vi
      .fn()
      .mockResolvedValue([{ id: '1', name: 'Київ', region: 'Київська область' }]);
    const service = new LocationsService({ location: { findMany } } as never);

    expect(await service.findAll()).toEqual([
      { id: '1', name: 'Київ', region: 'Київська область' },
    ]);
  });

  it('controller delegates to the service', async () => {
    const service = { findAll: vi.fn().mockResolvedValue([]) };
    expect(await new LocationsController(service as never).findAll()).toEqual([]);
  });
});
