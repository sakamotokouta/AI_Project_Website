<template>
  <form class="form-panel" @submit.prevent="$emit('confirm')">
    <div class="form-grid">
      <label>
        パンの名前
        <input v-model="form.name" :aria-invalid="Boolean(errors.customerName)" aria-describedby="customerName-error" />
        <small id="customerName-error">{{ errors.customerName }}</small>
      </label>
      <label>
        値段
        <input v-model="form.price" :aria-invalid="Boolean(errors.phone)" aria-describedby="phone-error" />
        <small id="phone-error">{{ errors.phone }}</small>
      </label>
      <label>
        パンの種類
        <input v-model="form.category" type="email" :aria-invalid="Boolean(errors.email)" aria-describedby="email-error" />
        <small id="email-error">{{ errors.email }}</small>
      </label>
      <label>
        おすすめ商品フラグ
        <input v-model="form.isRecommended" type="date" :min="todayInputValue()" :aria-invalid="Boolean(errors.pickupDate)" aria-describedby="pickupDate-error" />
        <small id="pickupDate-error">{{ errors.pickupDate }}</small>
      </label>
      <label>
        アレルギー表示
        <select v-model="form.allergies" :aria-invalid="Boolean(errors.pickupTime)" aria-describedby="pickupTime-error">
          <option value="">選択してください</option>
          <option v-for="time in pickupTimes" :key="time" :value="time">{{ time }}</option>
        </select>
        <small id="pickupTime-error">{{ errors.pickupTime }}</small>
      </label>
      <label>
        パンの画像URL
        <select v-model="form.imageUrl" :aria-invalid="Boolean(errors.menuItemId)" aria-describedby="menuItemId-error">
          <option value="">選択してください</option>
          <option v-for="item in menuItems" :key="item.id" :value="item.id">{{ item.name }} / {{ formatPrice(item.price) }}</option>
        </select>
        <small id="menuItemId-error">{{ errors.menuItemId }}</small>
      </label>
      <label>
    <BaseButton type="submit" label="確認へ進む" />
  </form>
</template>

<script setup lang="ts">
import { pickupTimes } from '~/constants/pickupTimes'
import type { MenuItem } from '~/types/menu'
import type { ReservationFormState } from '~/types/reservation'
import { todayInputValue } from '~/utils/date'
import { formatPrice } from '~/utils/formatPrice'

defineProps<{
  form: MenuItem
  errors: Record<string, string>
  menuItems: MenuItem[]
}>()
defineEmits<{ confirm: [] }>()
</script>
