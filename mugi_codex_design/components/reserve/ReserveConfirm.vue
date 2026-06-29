<template>
  <section class="confirm-panel">
    <h2>予約内容の確認</h2>
    <dl>
      <div><dt>お名前</dt><dd>{{ form.customerName }}</dd></div>
      <div><dt>電話番号</dt><dd>{{ form.phone }}</dd></div>
      <div><dt>メール</dt><dd>{{ form.email || '未入力' }}</dd></div>
      <div><dt>受け取り</dt><dd>{{ form.pickupDate }} {{ form.pickupTime }}</dd></div>
      <div><dt>商品</dt><dd>{{ selectedItem?.name }} x {{ form.quantity }}</dd></div>
      <div><dt>備考</dt><dd>{{ form.note || 'なし' }}</dd></div>
    </dl>
    <p v-if="submitError" class="form-error">{{ submitError }}</p>
    <div class="actions">
      <BaseButton label="戻る" variant="outline" :disabled="isSubmitting" @click="$emit('back')" />
      <BaseButton label="予約する" :disabled="isSubmitting" @click="$emit('submit')" />
    </div>
  </section>
</template>

<script setup lang="ts">
import type { MenuItem } from '~/types/menu'
import type { ReservationFormState } from '~/types/reservation'

const props = defineProps<{
  form: ReservationFormState
  menuItems: MenuItem[]
  isSubmitting: boolean
  submitError?: string
}>()
defineEmits<{ back: []; submit: [] }>()

const selectedItem = computed(() => props.menuItems.find((item) => item.id === Number(props.form.menuItemId)))
</script>
