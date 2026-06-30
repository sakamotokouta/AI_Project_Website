<template>
  <section class="hero hero--fade-in">
    <div class="container hero__inner">
      <div class="hero__copy">
        <p class="eyebrow">Morning bread, gentle light</p>
        <h1>Boulangerie Mugi no Akari</h1>
        <p>国産小麦と天然酵母で焼き上げる、住宅街の小さなベーカリー。朝食の食卓に、やさしい灯りを届けます。</p>
        <div class="actions">
          <BaseButton to="/reserve" label="取り置き予約" />
          <BaseButton to="/menu" label="メニューを見る" variant="outline" />
        </div>
      </div>
      <img :src="heroImage" alt="焼きたてパンが並ぶベーカリーのカウンター" />
    </div>
  </section>
</template>

<script setup lang="ts">
const heroImage = '/images/hero/bakery-hero.png'
</script>
