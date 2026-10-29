import '@testing-library/jest-dom/vitest';
import type { TestingLibraryMatchers } from '@testing-library/jest-dom/matchers';

declare module 'vitest' {
  interface Matchers<R extends void | Promise<void>, T>
    extends TestingLibraryMatchers<unknown, R> {}
}
