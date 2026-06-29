<template>
  <article class="menu-card">
    <img :src="item.imageUrl" :alt="`${item.name}の写真`" loading="lazy" />
    <div class="menu-card__body">
      <div class="menu-card__meta">
        <span>{{ menuCategoryLabels[item.category] }}</span>
        <strong v-if="item.isRecommended">おすすめ</strong>
        <strong v-if="item.isSeasonal">季節限定</strong>
      </div>
      <h3>{{ item.name }}</h3>
      <p>{{ item.description }}</p>
      <div class="menu-card__bottom">
        <b>{{ formatPrice(item.price) }}</b>
        <small>アレルギー: {{ item.allergies.join('・') }}</small>
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">
import type { MenuItem } from '~/types/menu'
import { menuCategoryLabels } from '~/types/menu'
import { formatPrice } from '~/utils/formatPrice'

defineProps<{ item: MenuItem }>()
</script>
