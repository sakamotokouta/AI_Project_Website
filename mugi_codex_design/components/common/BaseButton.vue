<template>
  <NuxtLink v-if="to" :to="to" class="button" :class="`button--${variant}`">
    <slot>{{ label }}</slot>
  </NuxtLink>
  <button v-else class="button" :class="`button--${variant}`" :type="type" :disabled="disabled">
    <slot>{{ label }}</slot>
  </button>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    label?: string
    to?: string
    type?: 'button' | 'submit'
    variant?: 'primary' | 'secondary' | 'outline'
    disabled?: boolean
  }>(),
  {
    type: 'button',
    variant: 'primary',
    disabled: false,
  },
)
</script>
