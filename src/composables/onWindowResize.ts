import { onMounted, onUnmounted, ref } from 'vue';

export default function useWindowResize() {
  const height = ref(window.innerHeight);
  const width = ref(window.innerWidth);

  function resize() {
    height.value = window.innerHeight;
    width.value = window.innerWidth;
  }

  onMounted(() => {
    resize();
    window.addEventListener('resize', resize);
  });

  onUnmounted(() => {
    window.removeEventListener('resize', resize);
  });

  return { height, width };
}
