<template>
  <div>
    <PageHero title="メニュー追加フォーム" lead="メニューの追加ができます" />
    <section class="container narrow-section">
      <ReserveForm v-if="step === 'input'" :form="form" :errors="errors" :menu-items="menuItems" @confirm="confirm" />
      <ReserveConfirm
        v-else-if="step === 'confirm'"
        :form="form"
        :menu-items="menuItems"
        :is-submitting="isSubmitting"
        :submit-error="submitError"
        @back="back"
        @submit="submit"
      />
      <ReserveComplete v-else :id="createdId" />
    </section>
  </div>
</template>

<script setup lang="ts">
const { menuItems } = useMenu()
const { step, form, errors, isSubmitting, submitError, createdId, confirm, back, submit } = useReserveForm()

useSeoMeta({
  title: '取り置き予約 | Boulangerie Mugi no Akari',
  description: '人気商品の取り置き予約はこちらから。',
  ogTitle: '取り置き予約 | Boulangerie Mugi no Akari',
  ogDescription: '受け取り日と商品を選んで予約できます。',
  ogType: 'website',
})
</script>
