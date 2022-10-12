import type { InjectionKey } from 'vue';
import type { AppStore } from './types/AppStore';

export const APP_STORE_KEY: InjectionKey<AppStore> = Symbol('app.store');
