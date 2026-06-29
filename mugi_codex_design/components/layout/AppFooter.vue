<template>
  <footer class="site-footer">
    <div class="container site-footer__grid">
      <div>
        <p class="site-footer__brand">{{ storeInfo.name }}</p>
        <p>{{ storeInfo.nameJa }}</p>
        <SnsLinks />
      </div>
      <address>
        <p>{{ storeInfo.address }}</p>
        <p>{{ storeInfo.businessHours }} / {{ storeInfo.regularHoliday }}</p>
        <p><a :href="`tel:${storeInfo.phone}`">{{ storeInfo.phone }}</a></p>
      </address>
    </div>
    <p class="site-footer__copy">&copy; 2026 Boulangerie Mugi no Akari</p>
  </footer>
</template>

<script setup lang="ts">
import { storeInfo } from '~/constants/storeInfo'
</script>
