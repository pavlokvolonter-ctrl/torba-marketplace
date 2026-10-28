import { getDatabaseUrl } from './database-url.js';

describe('getDatabaseUrl', () => {
  const previous = process.env.DATABASE_URL;

  afterEach(() => {
    if (previous === undefined) delete process.env.DATABASE_URL;
    else process.env.DATABASE_URL = previous;
  });

  it('returns DATABASE_URL', () => {
    process.env.DATABASE_URL = 'postgresql://example/torba';
    expect(getDatabaseUrl()).toBe('postgresql://example/torba');
  });

  it('throws when DATABASE_URL is missing', () => {
    delete process.env.DATABASE_URL;
    expect(() => getDatabaseUrl()).toThrow(/DATABASE_URL is not set/);
  });
});
