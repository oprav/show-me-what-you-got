<script setup lang="ts">
import { provide, reactive, ref, watch } from 'vue';
import { RouterView, useRoute } from 'vue-router';
import ShowSearchInput from './components/ShowSearchInput.vue';
import { APP_STORE_KEY } from './symbols';
import useWindowResize from './composables/onWindowResize';
import VueSimpleSpinner from './components/Spinner.vue';

const TABLET_BREAKPOINT = 767;
const { width } = useWindowResize();
let isInMobileViewport = ref(width.value <= TABLET_BREAKPOINT);

const store = reactive({ searchResults: [], error: null, isInMobileViewport });
provide(APP_STORE_KEY, store);

watch(
  width,
  (_, newV) => (isInMobileViewport.value = newV <= TABLET_BREAKPOINT)
);

const route = useRoute();
</script>

<template>
  <header>
    <div class="wrapper"></div>
    <div class="wrapper">
      <img alt="Binge Watch" class="logo" src="@/assets/logo.png" width="125" height="125" />
    </div>
    <div class="wrapper">
      <Suspense v-if="!route.path.includes('show')">
        <ShowSearchInput />
      </Suspense>
    </div>
  </header>

  <router-view v-slot="{ Component }">
    <suspense timeout="0">
      <template #default>
        <component :is="Component" :key="$route.path"></component>
      </template>
      <template #fallback>
        <div id="spinner-container">
          <VueSimpleSpinner size="massive" />
        </div>
      </template>
    </suspense>
  </router-view>
  <div id="footer">Binge Watch 2022</div>
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

#footer {
  margin: 15px auto;
  padding-bottom: 15px;
  text-align: center;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    width: 1280px;
    place-items: center;
    /* padding-right: calc(var(--section-gap) / 2); */
    justify-content: center;
  }

  .logo {
    margin: 0 0 0 0;
  }

  header .wrapper {
    display: flex;
    flex-basis: 33%;
    place-items: flex-start;
    flex-wrap: wrap;
    justify-content: center;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }


}
</style>
