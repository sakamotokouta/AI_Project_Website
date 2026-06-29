<template>
  <div class="section-title">
    <p v-if="subTitle" class="section-title__sub">{{ subTitle }}</p>
    <h2>{{ title }}</h2>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string
  subTitle?: string
}>()
</script>
