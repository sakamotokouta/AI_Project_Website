<template>
  <ul class="sns-links" aria-label="SNS links">
    <li v-for="link in snsLinks" :key="link.type">
      <a :href="link.url" target="_blank" rel="noopener noreferrer">
        <span aria-hidden="true">{{ link.label.slice(0, 1) }}</span>
        <span>{{ link.label }}</span>
      </a>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { snsLinks } from '~/constants/snsLinks'
</script>
