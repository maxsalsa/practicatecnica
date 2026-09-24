import { defineConfig } from 'vitest/config';
import path from 'node:path';
export default defineConfig({resolve:{alias:{'@':path.join(import.meta.dirname,'src'),'server-only':path.join(import.meta.dirname,'tests/server-only.ts')}},test:{include:['tests/**/*.test.ts'],maxWorkers:2,testTimeout:30000,hookTimeout:60000}});
