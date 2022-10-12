<script setup lang="ts">
import { showsApiClient } from '@/http/showsApiClient';
import { APP_STORE_KEY } from '@/symbols';
import type { ShowDetails } from '@/types/ShowDetails';
import { injectStrict } from '@/utils/injectStrict';
import { ref } from 'vue';
import { useRoute } from 'vue-router';

const appContext = injectStrict(APP_STORE_KEY);
const showDetails = ref<ShowDetails | null>(null);
const route = useRoute();
const result = await showsApiClient.getShow(route.params.showId as string);
if (result.data) {
  showDetails.value = result.data;
} else if (result.error) {
  appContext.error = result.error;
}
</script>

<template>
  <nav class="back-link">
    <RouterLink :to="'/'">Back to Shows</RouterLink>
  </nav>
  <div id="show-details-container">
    <img class="show-poster" v-bind:src="showDetails?.show.image.original" />
    <div>
      <div class="show-stats">
        Genres:
        <div class="horizontal-list">
          <span class="show-stat-item" v-for="genre of showDetails?.show.genres" v-bind:key="genre">
            {{ genre }}
          </span>
        </div>
      </div>
      <div class="show-stats">
        Language:
        <div class="horizontal-list">
          <span class="show-stat-item"></span> {{ showDetails?.show.language }}
        </div>
      </div>
      <div class="show-stats">
        Rating:
        <div class="horizontal-list">
          <span class="show-stat-item"></span>
          {{
          /* @ts-ignore property name typo */
          showDetails?.show.rating.average
          }}
        </div>
      </div>
      <br />
      <p v-html="showDetails?.show.summary"></p>
    </div>
  </div>
</template>

<style scoped>
#show-details-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.horizontal-list {
  display: flex;
}

.show-poster {
  width: 250px;
  border-radius: 3%;
}

.show-stats {
  display: flex;
  font-weight: bold;
}

.show-stat-item {
  margin-left: 5px;
}

.back-link {
  height: 2rem;
  width: 7rem;
}
</style>
