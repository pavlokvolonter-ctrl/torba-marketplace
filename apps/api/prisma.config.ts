import { defineConfig } from 'prisma/config';
import { getDatabaseUrl } from './src/prisma/database-url.js';

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
    url: getDatabaseUrl(),
  },
});
