<template>
  <div class="hand-zone">
    <div class="hand-zone-label">手牌 · 8 张</div>
    <div class="hand-cards">
      <PokerCard
        v-for="card in hand"
        :key="card.id"
        :card="card"
        :selected="selected.some(s => s.id === card.id)"
        @click="$emit('toggle', card)"
      />
    </div>
  </div>
</template>

<script setup>
import PokerCard from './PokerCard.vue'

defineProps({
  hand: { type: Array, required: true },
  selected: { type: Array, required: true },
})
defineEmits(['toggle'])
</script>

<style scoped>
.hand-zone {
  padding: 12px 24px 8px;
  background: rgba(0,0,0,.2);
  border-top: 1px solid rgba(255,255,255,.06);
  flex-shrink: 0;
}
.hand-zone-label {
  font-size: 10px;
  color: rgba(255,255,255,.4);
  letter-spacing: 1px;
  text-transform: uppercase;
  margin-bottom: 10px;
}
.hand-cards { display: flex; gap: 10px; justify-content: center; }
</style>
