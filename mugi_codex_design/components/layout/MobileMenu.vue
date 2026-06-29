<template>
  <div id="mobile-menu" class="mobile-menu" :class="{ 'is-open': open }">
    <NuxtLink v-for="item in navItems" :key="item.to" :to="item.to" @click="$emit('close')">{{ item.label }}</NuxtLink>
    <SnsLinks />
  </div>
</template>

<script setup lang="ts">
defineProps<{ open: boolean }>()
defineEmits<{ close: [] }>()

const navItems = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/menu', label: 'Menu' },
  { to: '/reserve', label: 'Reserve' },
  { to: '/contact', label: 'Contact' },
]
</script>
