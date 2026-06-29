<template>
  <FadeInSection>
    <div class="container section-stack">
      <SectionTitle title="おすすめのパン" sub-title="Recommended" />
      <MenuList :items="items" :pending="pending" />
    </div>
  </FadeInSection>
</template>

<script setup lang="ts">
import type { ApiResponse } from '~/types/api'
import type { MenuItem } from '~/types/menu'

const { data, pending } = await useFetch<ApiResponse<MenuItem[]>>('/api/menu/recommended')
const items = computed(() => (data.value?.ok ? data.value.data : []))
</script>
