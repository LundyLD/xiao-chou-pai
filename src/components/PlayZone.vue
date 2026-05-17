<template>
  <div class="play-zone">
    <div class="hand-type-badge" :class="{ hidden: !handInfo }">
      {{ handInfo ? handInfo.name : '' }}
    </div>
    <div class="play-cards">
      <template v-if="selected.length === 0">
        <div v-for="i in 5" :key="i" class="play-placeholder">+</div>
      </template>
      <template v-else>
        <PokerCard
          v-for="card in selected"
          :key="card.id"
          :card="card"
          :in-play-zone="true"
        />
        <div
          v-for="i in (5 - selected.length)"
          :key="'ph' + i"
          class="play-placeholder"
        >+</div>
      </template>
    </div>
    <div class="zone-hint">
      {{ selected.length > 0 && handInfo ? `得分预览：${previewScore} 分` : '选中 1–5 张牌后点击「出牌」' }}
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import PokerCard from './PokerCard.vue'
import { identifyHand, calcScore } from '../useGame.js'

const props = defineProps({
  selected: { type: Array, required: true },
})

const handInfo = computed(() => identifyHand(props.selected))
const previewScore = computed(() => calcScore(props.selected))
</script>

<style scoped>
.play-zone {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: rgba(0,0,0,.15);
  border-bottom: 1px solid rgba(255,255,255,.06);
  gap: 12px;
}
.hand-type-badge {
  background: rgba(232,104,42,.85);
  color: #fff;
  font-size: 13px;
  font-weight: 700;
  padding: 5px 18px;
  border-radius: var(--radius-btn);
  letter-spacing: .5px;
  box-shadow: 0 2px 8px rgba(232,104,42,.4);
  min-width: 80px;
  text-align: center;
}
.hand-type-badge.hidden { visibility: hidden; }
.play-cards { display: flex; gap: 12px; align-items: center; }
.play-placeholder {
  width: 88px;
  height: 128px;
  border-radius: var(--radius-card);
  border: 2px dashed rgba(255,255,255,.18);
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(255,255,255,.25);
  font-size: 24px;
}
.zone-hint {
  font-size: 12px;
  color: rgba(255,255,255,.35);
  letter-spacing: .5px;
}
</style>
