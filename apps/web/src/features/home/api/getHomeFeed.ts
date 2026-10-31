import { homeMock } from '@/features/home/mocks/home';
import type { HomeFeed } from '@/features/home/types';

/**
 * Home page data source.
 * Swap the mock for `fetch(`${API}/home`)` when the backend is ready.
 */
export async function getHomeFeed(): Promise<HomeFeed> {
  return homeMock;
}
