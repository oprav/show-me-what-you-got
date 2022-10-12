<script lang="ts">
import type { Ishow } from 'tvmaze-api-ts';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation } from 'swiper';

import 'swiper/css';
import 'swiper/css/navigation';
import { injectStrict } from '@/utils/injectStrict';
import { APP_STORE_KEY } from '@/symbols';

type ShowMeta = Pick<Ishow, 'name' | 'image' | 'id'>;
interface Props {
  shows: null | ShowMeta[];
}
</script>

<script setup lang="ts">
defineProps<Props>();
const appStore = injectStrict(APP_STORE_KEY);
const SLIDES_PER_VIEW_DESKTOP = 5;
const SLIDES_PER_VIEW_MOBILE = 1;
</script>

<template>
  <swiper :space-between="50"
    :slides-per-view="appStore.isInMobileViewport ? SLIDES_PER_VIEW_MOBILE : SLIDES_PER_VIEW_DESKTOP"
    :modules="[Navigation]" navigation>
    <swiper-slide v-for="show of shows" v-bind:key="show.id">
      <RouterLink class="active" :to="{ name: 'show', params: { showId: show.id } }">
        <img class="show-thumb" v-bind:src="show.image && show.image.medium" rel="preload" />
      </RouterLink>
    </swiper-slide>
  </swiper>
</template>

<style scoped>
.swiper-slide {
  display: flex;
}

.show-thumb {
  border-radius: 3%;
}

.swiper-slide {
  justify-content: center;
}
</style>
