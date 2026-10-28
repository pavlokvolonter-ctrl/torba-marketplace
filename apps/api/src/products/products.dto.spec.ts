import { plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';
import { TrendingQueryDto } from './products.dto.js';

const validate = (input: object) => validateSync(plainToInstance(TrendingQueryDto, input));

describe('TrendingQueryDto', () => {
  it('applies defaults', () => {
    expect(plainToInstance(TrendingQueryDto, {})).toMatchObject({ page: 1, limit: 8 });
    expect(validate({})).toHaveLength(0);
  });

  it('coerces numeric strings from the query string', () => {
    expect(plainToInstance(TrendingQueryDto, { page: '2', limit: '4' })).toMatchObject({
      page: 2,
      limit: 4,
    });
  });

  it.each([{ page: 0 }, { page: 'abc' }, { limit: 0 }, { limit: 51 }, { limit: 1.5 }])(
    'rejects %o',
    (input) => expect(validate(input).length).toBeGreaterThan(0),
  );
});
