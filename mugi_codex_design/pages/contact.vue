<template>
  <div>
    <PageHero title="お問い合わせ" lead="商品、アレルギー、大口注文、取材やイベント出店のご相談はこちらから。" />
    <section class="container narrow-section">
      <ContactForm
        v-if="step === 'input'"
        :form="form"
        :errors="errors"
        :is-submitting="isSubmitting"
        :submit-error="submitError"
        @submit="submit"
      />
      <ContactComplete v-else />
    </section>
  </div>
</template>

<script setup lang="ts">
const { step, form, errors, isSubmitting, submitError, submit } = useContactForm()

useSeoMeta({
  title: 'お問い合わせ | Boulangerie Mugi no Akari',
  description: '商品、アレルギー、大口注文、取材やイベント出店についてのお問い合わせはこちら。',
  ogTitle: 'お問い合わせ | Boulangerie Mugi no Akari',
  ogDescription: '麦の灯りへのお問い合わせフォームです。',
  ogType: 'website',
})
</script>
