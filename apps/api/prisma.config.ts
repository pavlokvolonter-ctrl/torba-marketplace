import { defineConfig } from 'prisma/config';

try {
  process.loadEnvFile('../../.env');
} catch {}

export default defineConfig({
  schema: 'prisma/schema.prisma',
  migrations: {
    path: 'prisma/migrations',
    seed: 'bun prisma/seed.ts',
  },
  datasource: {
    url: process.env.DATABASE_URL ?? 'postgresql://torba:torba@localhost:5432/torba?schema=public',
  },
});
