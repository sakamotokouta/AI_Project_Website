<template>
  <form class="form-panel" @submit.prevent="$emit('submit')">
    <div class="form-grid">
      <label>
        お名前
        <input v-model="form.name" :aria-invalid="Boolean(errors.name)" aria-describedby="name-error" />
        <small id="name-error">{{ errors.name }}</small>
      </label>
      <label>
        メールアドレス
        <input v-model="form.email" type="email" :aria-invalid="Boolean(errors.email)" aria-describedby="contact-email-error" />
        <small id="contact-email-error">{{ errors.email }}</small>
      </label>
      <label class="form-grid__wide">
        種別
        <select v-model="form.category" :aria-invalid="Boolean(errors.category)" aria-describedby="category-error">
          <option value="">選択してください</option>
          <option v-for="(label, value) in contactCategoryLabels" :key="value" :value="value">{{ label }}</option>
        </select>
        <small id="category-error">{{ errors.category }}</small>
      </label>
      <label class="form-grid__wide">
        内容
        <textarea v-model="form.message" rows="7" :aria-invalid="Boolean(errors.message)" aria-describedby="message-error"></textarea>
        <small id="message-error">{{ errors.message }}</small>
      </label>
    </div>
    <p v-if="submitError" class="form-error">{{ submitError }}</p>
    <BaseButton type="submit" :disabled="isSubmitting" label="送信する" />
  </form>
</template>

<script setup lang="ts">
import type { ContactFormState } from '~/types/contact'
import { contactCategoryLabels } from '~/types/contact'

defineProps<{
  form: ContactFormState
  errors: Record<string, string>
  isSubmitting: boolean
  submitError: string
}>()
defineEmits<{ submit: [] }>()
</script>
