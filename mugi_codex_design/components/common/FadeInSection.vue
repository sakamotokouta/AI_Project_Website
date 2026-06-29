<template>
  <section ref="target" class="fade-section" :class="{ 'is-visible': isVisible }">
    <slot />
  </section>
</template>

<script setup lang="ts">
const { target, isVisible } = useScrollAnimation()
</script>
