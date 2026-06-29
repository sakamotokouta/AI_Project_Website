<template>
  <section class="page-hero">
    <div class="container page-hero__inner">
      <p class="eyebrow">{{ eyebrow }}</p>
      <h1>{{ title }}</h1>
      <p v-if="lead" class="page-hero__lead">{{ lead }}</p>
    </div>
  </section>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    title: string
    lead?: string
    eyebrow?: string
  }>(),
  {
    eyebrow: 'Boulangerie Mugi no Akari',
  },
)
</script>
