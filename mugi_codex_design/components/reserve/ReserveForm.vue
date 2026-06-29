<template>
  <form class="form-panel" @submit.prevent="$emit('confirm')">
    <div class="form-grid">
      <label>
        お名前
        <input v-model="form.customerName" :aria-invalid="Boolean(errors.customerName)" aria-describedby="customerName-error" />
        <small id="customerName-error">{{ errors.customerName }}</small>
      </label>
      <label>
        電話番号
        <input v-model="form.phone" :aria-invalid="Boolean(errors.phone)" aria-describedby="phone-error" />
        <small id="phone-error">{{ errors.phone }}</small>
      </label>
      <label>
        メールアドレス 任意
        <input v-model="form.email" type="email" :aria-invalid="Boolean(errors.email)" aria-describedby="email-error" />
        <small id="email-error">{{ errors.email }}</small>
      </label>
      <label>
        受け取り日
        <input v-model="form.pickupDate" type="date" :min="todayInputValue()" :aria-invalid="Boolean(errors.pickupDate)" aria-describedby="pickupDate-error" />
        <small id="pickupDate-error">{{ errors.pickupDate }}</small>
      </label>
      <label>
        受け取り時間
        <select v-model="form.pickupTime" :aria-invalid="Boolean(errors.pickupTime)" aria-describedby="pickupTime-error">
          <option value="">選択してください</option>
          <option v-for="time in pickupTimes" :key="time" :value="time">{{ time }}</option>
        </select>
        <small id="pickupTime-error">{{ errors.pickupTime }}</small>
      </label>
      <label>
        商品
        <select v-model="form.menuItemId" :aria-invalid="Boolean(errors.menuItemId)" aria-describedby="menuItemId-error">
          <option value="">選択してください</option>
          <option v-for="item in menuItems" :key="item.id" :value="item.id">{{ item.name }} / {{ formatPrice(item.price) }}</option>
        </select>
        <small id="menuItemId-error">{{ errors.menuItemId }}</small>
      </label>
      <label>
        数量
        <input v-model.number="form.quantity" type="number" min="1" :aria-invalid="Boolean(errors.quantity)" aria-describedby="quantity-error" />
        <small id="quantity-error">{{ errors.quantity }}</small>
      </label>
      <label class="form-grid__wide">
        備考 任意
        <textarea v-model="form.note" rows="4" :aria-invalid="Boolean(errors.note)" aria-describedby="note-error"></textarea>
        <small id="note-error">{{ errors.note }}</small>
      </label>
    </div>
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
  form: ReservationFormState
  errors: Record<string, string>
  menuItems: MenuItem[]
}>()
defineEmits<{ confirm: [] }>()
</script>
