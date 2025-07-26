<script setup lang="ts">
import { NuxtLink } from '#components';

const app = useAppConfig();
</script>

<template>
  <header :class="$style.header">
    <h1 :class="$style.title" :data-shadow-text="app.title">
      <NuxtLink to="/">
        <image-text :text="app.title" />
      </NuxtLink>
    </h1>
    <btn v-for="link of app.links" :href="link.href" :text="link.title" :icon="link.icon" slide
      :style="{ backgroundColor: link.color }" />
  </header>
  <divider />
  <main>
    <nuxt-page />
  </main>
</template>

<style lang="scss" module>
@use '~/scss/colors' as *;

.header {
  text-align: center;
  padding: 2em;
  background: $second-background;

  .title {
    font-family: Crooked, Courier, monospace;
    text-indent: 8px;
    line-height: 1;
    font-size: 4em;
    font-weight: 400;

    text-shadow: 12px 4px 1px rgba(0, 0, 0, 0.7);
    --text-image: linear-gradient(0deg,
        hsl(30deg 100% 50%) 0%,
        hsl(32deg 100% 51%) 19%,
        hsl(34deg 100% 53%) 33%,
        hsl(36deg 100% 55%) 44%,
        hsl(38deg 100% 58%) 54%,
        hsl(40deg 100% 60%) 62%,
        hsl(42deg 100% 62%) 69%,
        hsl(44deg 100% 64%) 75%,
        hsl(47deg 100% 66%) 80%,
        hsl(49deg 100% 69%) 85%,
        hsl(52deg 100% 71%) 90%,
        hsl(56deg 100% 74%) 94%,
        hsl(60deg 100% 77%) 99%);
  }
}
</style>
