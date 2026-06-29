<template>
  <FadeInSection>
    <section class="store-info">
      <div class="container store-info__grid">
        <div>
          <SectionTitle title="店舗情報" sub-title="Shop" />
          <dl class="info-list">
            <div><dt>住所</dt><dd>{{ storeInfo.address }}</dd></div>
            <div><dt>営業時間</dt><dd>{{ storeInfo.businessHours }}</dd></div>
            <div><dt>定休日</dt><dd>{{ storeInfo.regularHoliday }}</dd></div>
            <div><dt>電話</dt><dd><a :href="`tel:${storeInfo.phone}`">{{ storeInfo.phone }}</a></dd></div>
            <div><dt>アクセス</dt><dd>{{ storeInfo.nearestStation }}</dd></div>
          </dl>
        </div>
        <iframe :src="storeInfo.mapEmbedUrl" title="店舗周辺の地図" loading="lazy"></iframe>
      </div>
    </section>
  </FadeInSection>
</template>

<script setup lang="ts">
import { storeInfo } from '~/constants/storeInfo'
</script>
