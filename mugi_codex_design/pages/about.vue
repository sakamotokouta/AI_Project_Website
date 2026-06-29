<template>
  <div>
    <PageHero title="お店について" lead="素材と時間を急がず、毎日の食卓に寄り添うパンを焼いています。" />
    <section class="container split-section">
      <SectionTitle title="麦の灯りのこだわり" sub-title="About" />
      <div>
        <p>国産小麦、天然酵母、季節の素材を中心に、食べ飽きない味を目指しています。朝食向けの食パンから、昼食に選びやすい惣菜パンまで、店内で丁寧に焼き上げます。</p>
        <p>小さな店だからこそ、焼き上がりの時間や数に合わせて無理なく提供します。</p>
      </div>
    </section>
    <section class="container values-grid" aria-label="Commitment">
      <article><h2>素材</h2><p>小麦の香りと酵母の余韻が残る配合を選びます。</p></article>
      <article><h2>焼き上げ</h2><p>朝7時から、商品ごとの一番よい時間に焼きます。</p></article>
      <article><h2>地域</h2><p>通勤前、週末の散歩、家族の朝食に寄り添います。</p></article>
    </section>
    <StoreInfoSection />
  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'お店について | Boulangerie Mugi no Akari',
  description: '麦の灯りのこだわり、店舗情報、アクセスをご紹介します。',
  ogTitle: 'お店について | Boulangerie Mugi no Akari',
  ogDescription: '素材と時間を急がず、毎日の食卓に寄り添うパンを焼いています。',
  ogType: 'website',
})
</script>
