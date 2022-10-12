import { APP_STORE_KEY } from './../../symbols';
import { describe, it, expect } from 'vitest';

import { shallowMount } from '@vue/test-utils';
import ShowList from '../ShowList.vue';

describe('ShowList', () => {
  it('renders properly', () => {
    const wrapper = shallowMount(ShowList, {
      props: { shows: [] },
      global: {
        provide: {
          [APP_STORE_KEY as symbol]: {},
        },
      },
    });
    expect(wrapper.html()).toContain('swiper');
  });
});
