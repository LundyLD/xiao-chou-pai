<template>
  <div
    class="poker-card"
    :class="[isRed ? 'red-card' : 'black-card', { selected, 'in-play-zone': inPlayZone }]"
    @click="!inPlayZone && $emit('click')"
  >
    <div class="corner tl">
      <span class="rank">{{ card.rank }}</span>
      <span class="suit">{{ card.suit }}</span>
    </div>
    <div class="center-suit">{{ card.suit }}</div>
    <div class="corner br">
      <span class="rank">{{ card.rank }}</span>
      <span class="suit">{{ card.suit }}</span>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  card: { type: Object, required: true },
  selected: { type: Boolean, default: false },
  inPlayZone: { type: Boolean, default: false },
})
defineEmits(['click'])

const isRed = computed(() => props.card.suit === '♥' || props.card.suit === '♦')
</script>

<style scoped>
.poker-card {
  width: 82px;
  height: 118px;
  background: var(--color-card-bg);
  border-radius: var(--radius-card);
  position: relative;
  box-shadow: 0 2px 8px rgba(0,0,0,.18), 0 0 0 1px rgba(0,0,0,.08);
  transition: transform 200ms ease, box-shadow 200ms ease;
  cursor: pointer;
  user-select: none;
  flex-shrink: 0;
}
.poker-card.in-play-zone {
  width: 88px;
  height: 128px;
  cursor: default;
}
.corner {
  position: absolute;
  line-height: 1;
  font-weight: 700;
}
.corner.tl { top: 5px; left: 6px; text-align: left; }
.corner.br { bottom: 5px; right: 6px; text-align: right; transform: rotate(180deg); }
.corner .rank { font-size: 14px; display: block; }
.corner .suit { font-size: 11px; display: block; }
.in-play-zone .corner .rank { font-size: 16px; }
.in-play-zone .corner .suit { font-size: 13px; }
.in-play-zone .corner.tl { top: 6px; left: 8px; }
.in-play-zone .corner.br { bottom: 6px; right: 8px; }
.center-suit {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 40px;
  line-height: 1;
}
.in-play-zone .center-suit { font-size: 48px; }

.red-card .corner,
.red-card .center-suit { color: var(--color-card-red); }
.black-card .corner,
.black-card .center-suit { color: #1a1a1a; }

.poker-card:hover:not(.selected):not(.in-play-zone) {
  transform: translateY(-4px);
  box-shadow: 0 6px 16px rgba(0,0,0,.22);
}
.poker-card.selected {
  transform: translateY(-12px);
  box-shadow: 0 0 0 2.5px var(--color-accent), 0 8px 20px rgba(232,104,42,.35);
}
</style>
