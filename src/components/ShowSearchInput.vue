<script setup lang="ts">
import { ref, watchEffect } from 'vue';
import SearchInput from 'vue-search-input';
import { showsApiClient } from '@/http/showsApiClient';
import { APP_STORE_KEY } from '@/symbols';
import { injectStrict } from '@/utils/injectStrict';

import 'vue-search-input/dist/styles.css';
const query = ref('');
const appStore = injectStrict(APP_STORE_KEY);

const MINIMAL_SEARCH_LENGTH = 3;

watchEffect(async () => {
  if (query.value.length > MINIMAL_SEARCH_LENGTH) {
    const response = await showsApiClient.searchShows(query.value);

    if (response.data && response.data.length) {
      appStore.searchResults = response.data;
    } else if (response.error) {
      appStore.error = response.error;
    }
  } else if (query.value.length === 0) {
    appStore.searchResults = [];
  }
});
</script>
<template>
  <SearchInput v-model="query" />
</template>
