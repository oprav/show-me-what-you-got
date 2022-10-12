import type { Ishow } from 'tvmaze-api-ts';

export declare interface AppStore {
  searchResults: Ishow[];
  error: unknown;
  isInMobileViewport: boolean;
}
