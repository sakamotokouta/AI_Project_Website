<template>
  <section class="complete-panel">
    <p class="eyebrow">Reservation complete</p>
    <h2>ご予約を受け付けました</h2>
    <p>受け取り日時に店頭でお名前をお伝えください。予約番号: {{ id }}</p>
    <div class="actions">
      <BaseButton to="/" label="トップへ" variant="secondary" />
      <BaseButton to="/menu" label="メニューを見る" variant="outline" />
    </div>
  </section>
</template>

<script setup lang="ts">
defineProps<{ id: number | null }>()
</script>
