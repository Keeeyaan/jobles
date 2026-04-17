import { defineConfig } from 'drizzle-kit';
import { config } from 'dotenv';

config({ path: '.env' });

export default defineConfig({
  schema: './src/database/schemas/index.ts',
  dialect: 'postgresql',
  out: './drizzle/migrations',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
