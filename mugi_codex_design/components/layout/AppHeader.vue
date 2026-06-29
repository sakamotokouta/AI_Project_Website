<template>
  <header class="site-header">
    <NuxtLink class="site-header__brand" to="/">
      <span>{{ storeInfo.name }}</span>
      <small>{{ storeInfo.nameJa }}</small>
    </NuxtLink>
    <nav class="site-header__nav" aria-label="Global navigation">
      <NuxtLink v-for="item in navItems" :key="item.to" :to="item.to">{{ item.label }}</NuxtLink>
    </nav>
    <SnsLinks class="site-header__sns" />
    <button class="site-header__menu" type="button" :aria-expanded="isOpen" aria-controls="mobile-menu" @click="isOpen = !isOpen">
      <span></span><span></span><span></span>
    </button>
    <MobileMenu :open="isOpen" @close="isOpen = false" />
  </header>
</template>

<script setup lang="ts">
import { storeInfo } from '~/constants/storeInfo'

const isOpen = ref(false)
const navItems = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/menu', label: 'Menu' },
  { to: '/reserve', label: 'Reserve' },
  { to: '/contact', label: 'Contact' },
]
</script>
