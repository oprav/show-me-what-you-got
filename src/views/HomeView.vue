<script setup lang="ts">
import { ref } from 'vue';

import type { Ishow } from 'tvmaze-api-ts';
import ShowList from '../components/ShowList.vue';
import { APP_STORE_KEY } from '@/symbols';
import { injectStrict } from '@/utils/injectStrict';
import { showsApiClient } from '@/http/showsApiClient';

const appContext = injectStrict(APP_STORE_KEY);

const genres = ref<Record<string, Ishow[]> | null>(null);
const result = await showsApiClient.getShowsByGenres();
if (result.data) {
  genres.value = result.data;
  Object.values(result.data).forEach((shows) =>
    // @ts-ignore typo in property name
    shows.sort((a, b) => b.rating?.average - a.rating?.average)
  );
} else if (result.error) {
  appContext.error = result.error;
}
</script>

<template>
  <main>
    <Suspense>
      <div
        id="shows"
        v-if="genres !== null && !appContext.searchResults.length"
      >
        <div
          class="genres"
          v-for="[genre, shows] in Object.entries(genres)"
          v-bind:key="genre"
        >
          <span class="genre-label">{{ genre }}</span>
          <ShowList :shows="shows"></ShowList>
        </div>
      </div>

      <div id="shows" v-else-if="appContext.searchResults.length">
        <ShowList :shows="appContext.searchResults"></ShowList>
      </div>
    </Suspense>
  </main>
</template>

<style scoped>
#shows {
  margin-top: 1rem;
  max-width: 1280px;
}

.genres {
  margin-top: 1rem;
}

.genre-label {
  font-weight: bold;
}

#spinner {
  width: 300px;
  height: 300px;
  background-color: red;
}
</style>
