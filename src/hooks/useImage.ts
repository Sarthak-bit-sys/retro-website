import { getActiveImage } from '../imageRegistry';

export function useImage(key: string): string {
  return getActiveImage(key);
}
