<template>
  <div>
    <p v-if="pending" class="status-text">メニューを読み込んでいます。</p>
    <p v-else-if="items.length === 0" class="status-text">表示できるメニューがありません。</p>
    <div v-else class="menu-grid">
      <MenuCard v-for="item in items" :key="item.id" :item="item" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { MenuItem } from '~/types/menu'

defineProps<{
  items: MenuItem[]
  pending?: boolean
}>()
</script>
