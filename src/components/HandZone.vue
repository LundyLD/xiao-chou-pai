<template>
  <div class="hand-zone">
    <div class="hand-zone-label">手牌 · 8 张</div>
    <div class="hand-cards">
      <TransitionGroup name="deal" tag="div" class="hand-cards-inner">
        <PokerCard
          v-for="(card, index) in hand"
          :key="card.id"
          :card="card"
          :selected="selected.some(s => s.id === card.id)"
          :style="{ '--deal-delay': `${index * 60}ms` }"
          @click="$emit('toggle', card)"
        />
      </TransitionGroup>
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
.hand-cards { display: flex; justify-content: center; }
.hand-cards-inner { display: flex; gap: 10px; justify-content: center; }

/* 发牌动画：从右下方飞入 */
.deal-enter-active {
  animation: deal-in 320ms cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
  animation-delay: var(--deal-delay, 0ms);
}
.deal-leave-active {
  animation: deal-out 200ms ease-in both;
}
.deal-move {
  transition: transform 300ms ease;
}

@keyframes deal-in {
  from {
    opacity: 0;
    transform: translateX(80px) translateY(30px) rotate(12deg) scale(0.7);
  }
  to {
    opacity: 1;
    transform: translateX(0) translateY(0) rotate(0deg) scale(1);
  }
}

@keyframes deal-out {
  from {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
  to {
    opacity: 0;
    transform: translateY(-20px) scale(0.85);
  }
}
</style>
