<template>
  <ul class="sns-links" aria-label="SNS links">
    <li v-for="link in snsLinks" :key="link.type">
      <a :href="link.url" target="_blank" rel="noopener noreferrer">
        <img
          class="sns-links__icon"
          :src="link.icon"
          :alt="link.label"
        />
        <span>{{ link.label }}</span>
      </a>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { snsLinks } from '~/constants/snsLinks'
</script>
<style scoped>
.sns-links__icon {
  width: 24px;
  height: 24px;
  object-fit: contain;
}
</style>