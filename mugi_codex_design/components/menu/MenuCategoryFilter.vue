<template>
  <div class="category-filter" role="group" aria-label="Menu category">
    <button
      v-for="category in categories"
      :key="category"
      type="button"
      :class="{ 'is-active': selectedCategory === category }"
      @click="$emit('change', category)"
    >
      {{ menuCategoryLabels[category] }}
    </button>
  </div>
</template>

<script setup lang="ts">
import type { MenuCategoryFilterValue } from '~/types/menu'
import { menuCategoryLabels } from '~/types/menu'

defineProps<{ selectedCategory: MenuCategoryFilterValue }>()
defineEmits<{ change: [category: MenuCategoryFilterValue] }>()

const categories: MenuCategoryFilterValue[] = ['ALL', 'SHOKUPAN', 'SOZAI', 'KASHI', 'SEASONAL']
</script>
