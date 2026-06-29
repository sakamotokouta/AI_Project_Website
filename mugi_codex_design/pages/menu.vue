<template>
  <div>
    <PageHero title="メニュー" lead="食パン、惣菜パン、菓子パン、季節限定メニューをご覧いただけます。" />
    <section class="container section-stack">
      <MenuCategoryFilter :selected-category="selectedCategory" @change="setCategory" />
      <MenuList :items="menuItems" :pending="pending" />
    </section>
  </div>
</template>

<script setup lang="ts">
const { selectedCategory, menuItems, pending, setCategory } = useMenu()

useSeoMeta({
  title: 'メニュー | Boulangerie Mugi no Akari',
  description: '食パン、惣菜パン、菓子パン、季節限定メニューをご覧いただけます。',
  ogTitle: 'メニュー | Boulangerie Mugi no Akari',
  ogDescription: '焼きたてパンのメニュー一覧です。',
  ogType: 'website',
})
</script>
