import { ValidationPipe, type INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { BannersController } from '../src/banners/banners.controller.js';
import { BannersService } from '../src/banners/banners.service.js';
import { CategoriesController } from '../src/categories/categories.controller.js';
import { CategoriesService } from '../src/categories/categories.service.js';
import { LocationsController } from '../src/locations/locations.controller.js';
import { LocationsService } from '../src/locations/locations.service.js';
import { ProductsController } from '../src/products/products.controller.js';
import { ProductsService } from '../src/products/products.service.js';

describe('Home endpoints (HTTP, mocked services)', () => {
  let app: INestApplication;
  const getTrending = vi
    .fn()
    .mockResolvedValue({ items: [], page: 1, limit: 8, total: 0, hasMore: false });

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [
        CategoriesController,
        BannersController,
        ProductsController,
        LocationsController,
      ],
      providers: [
        {
          provide: CategoriesService,
          useValue: { getTree: async () => [], getPopular: async () => [] },
        },
        { provide: BannersService, useValue: { findAll: async () => [] } },
        { provide: LocationsService, useValue: { findAll: async () => [] } },
        { provide: ProductsService, useValue: { getTrending } },
      ],
    }).compile();
    app = moduleRef.createNestApplication();
    app.setGlobalPrefix('api');
    app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));
    await app.init();
  });

  afterAll(() => app.close());

  it.each(['/api/categories', '/api/categories/popular', '/api/banners', '/api/locations'])(
    'GET %s -> 200',
    async (url) => {
      await request(app.getHttpServer()).get(url).expect(200).expect([]);
    },
  );

  it('GET /api/products/trending uses defaults', async () => {
    await request(app.getHttpServer()).get('/api/products/trending').expect(200);
    expect(getTrending).toHaveBeenLastCalledWith(1, 8);
  });

  it('GET /api/products/trending?page=2&limit=4 passes numbers', async () => {
    await request(app.getHttpServer()).get('/api/products/trending?page=2&limit=4').expect(200);
    expect(getTrending).toHaveBeenLastCalledWith(2, 4);
  });

  it('GET /api/products/trending?limit=999 -> 400', async () => {
    await request(app.getHttpServer()).get('/api/products/trending?limit=999').expect(400);
  });
});
